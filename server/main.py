from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
import time
from datetime import datetime
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from server.config import settings
from server.services.llm_service import analyze_message, TEST_SCAMS

# Initialize Rate Limiter
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(
    title="Suraksha Setu API",
    description="Backend AI Engine for Financial Safety in Rural India (Maverick Effect AI Challenge 2026)",
    version="1.0.0"
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Configure CORS for local development and demo hosting
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CLIENT_URL, "http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database for Recently Seen Scam Patterns (session/demo based)
# Pre-populated with 3 initial anonymized patterns to demonstrate community learning on first load
RECENT_SCAMS_DB: List[dict] = [
    {
        "id": "init-1",
        "category": "Fake UPI Collect Request",
        "verdict": "Scam",
        "timestamp": datetime.now().strftime("%I:%M %p"),
        "snippet": "Rs 5,000 cashback approved from PhonePe. Enter PIN on collect request..."
    },
    {
        "id": "init-2",
        "category": "Bank KYC Phishing / Impersonation",
        "verdict": "Scam",
        "timestamp": datetime.now().strftime("%I:%M %p"),
        "snippet": "Dear SBI User, your account PAN KYC is expired today. Your NetBanking..."
    },
    {
        "id": "init-3",
        "category": "Predatory Loan App Harassment",
        "verdict": "Scam",
        "timestamp": datetime.now().strftime("%I:%M %p"),
        "snippet": "URGENT: Your Instant Rupee Loan EMI is overdue by 1 day. Pay in 2 hours..."
    }
]

class AnalyzeRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000, description="Suspicious text or call transcript to analyze")

class ReportScamRequest(BaseModel):
    category: str
    snippet: str
    verdict: str = "Scam"

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Suraksha Setu API", "model": settings.GEMINI_MODEL_NAME}

@app.get("/api/test-scams")
def get_test_scams():
    """Returns the curated test suite of Indian scam and legitimate messages for demo pills."""
    return {"test_scams": TEST_SCAMS}

@app.get("/api/recent-scams")
def get_recent_scams():
    """Returns the anonymized public feed of recently detected scam patterns."""
    return {"recent_scams": RECENT_SCAMS_DB[:20]}  # Return latest 20

@app.post("/api/analyze")
@limiter.limit(settings.RATE_LIMIT_RPM)
def analyze_endpoint(request: Request, body: AnalyzeRequest):
    """Main AI classification and explanation endpoint."""
    text = body.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Input text cannot be empty.")
    
    # Run analysis (checks offline fallback first, then Gemini API)
    result = analyze_message(text)
    
    # If it's classified as a Scam or Suspicious, append an anonymized entry to the Recently Seen feed!
    verdict = result.get("verdict", "")
    if verdict in ["Scam", "Suspicious"]:
        category = result.get("category", "Unknown Scam Pattern")
        # Create a short 60-char anonymized snippet
        snippet = (text[:60] + "...") if len(text) > 60 else text
        
        # Avoid exact duplicates at the top of the feed
        if not RECENT_SCAMS_DB or RECENT_SCAMS_DB[0].get("snippet") != snippet:
            RECENT_SCAMS_DB.insert(0, {
                "id": f"scam-{int(time.time()*1000)}",
                "category": category,
                "verdict": verdict,
                "timestamp": datetime.now().strftime("%I:%M %p"),
                "snippet": snippet
            })
            
    return result

@app.post("/api/report-scam")
@limiter.limit("5/minute")
def report_scam_endpoint(request: Request, body: ReportScamRequest):
    """Community reporting endpoint to let users flag new scam patterns."""
    snippet = (body.snippet[:60] + "...") if len(body.snippet) > 60 else body.snippet
    RECENT_SCAMS_DB.insert(0, {
        "id": f"report-{int(time.time()*1000)}",
        "category": body.category,
        "verdict": body.verdict,
        "timestamp": datetime.now().strftime("%I:%M %p"),
        "snippet": snippet
    })
    return {"status": "success", "message": "Scam pattern reported and added to community feed."}
