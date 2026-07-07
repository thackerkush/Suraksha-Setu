import json
import logging
import os
from pathlib import Path
from typing import List, Dict, Optional
from pydantic import BaseModel, Field
from server.config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SurakshaSetu-LLM")

# Load test cases into memory for Offline Demo Fallback Mode
TEST_SCAMS_PATH = Path(__file__).parent.parent / "data" / "test_scams.json"
TEST_SCAMS: List[dict] = []
try:
    if TEST_SCAMS_PATH.exists():
        with open(TEST_SCAMS_PATH, "r", encoding="utf-8") as f:
            TEST_SCAMS = json.load(f)
        logger.info(f"Loaded {len(TEST_SCAMS)} test scam cases for Offline Fallback Mode.")
except Exception as e:
    logger.error(f"Failed to load test scams: {e}")

try:
    from google import genai
    from google.genai import types
    GENAI_AVAILABLE = True
except ImportError:
    GENAI_AVAILABLE = False
    logger.warning("google-genai SDK not installed or available.")

class MultilingualText(BaseModel):
    en: str = Field(description="English text")
    hi: str = Field(description="Hindi (हिंदी) text")
    gu: str = Field(description="Gujarati (ગુજરાતી) text")

class MultilingualList(BaseModel):
    en: List[str] = Field(description="List of action strings in English")
    hi: List[str] = Field(description="List of action strings in Hindi")
    gu: List[str] = Field(description="List of action strings in Gujarati")

class AnalysisResponse(BaseModel):
    verdict: str = Field(description="Must be exactly one of: 'Scam', 'Suspicious', or 'Likely Legitimate'")
    confidence: int = Field(description="Confidence score from 0 to 100")
    category: str = Field(description="Scam or message category")
    explanation: MultilingualText = Field(description="Plain-language explanation in English, Hindi, and Gujarati")
    action_steps: MultilingualList = Field(description="Short, clear numbered action steps in English, Hindi, and Gujarati")
    is_fallback: bool = Field(default=False, description="Whether this response was generated from offline fallback/cache")

def analyze_message(text: str) -> dict:
    cleaned_text = text.strip()
    if not cleaned_text:
        return get_safe_fallback_response("Empty input")
    
    # 1. Check Offline Demo Fallback Mode (exact or close match with test cases)
    for test_case in TEST_SCAMS:
        test_text = test_case.get("text", "").strip()
        if test_text and (cleaned_text.lower() == test_text.lower() or (len(cleaned_text) > 30 and (cleaned_text.lower() in test_text.lower() or test_text.lower() in cleaned_text.lower()))):
            logger.info(f"Offline Fallback match found for ID: {test_case.get('id')}")
            res = test_case.get("precomputed_result", {}).copy()
            res["is_fallback"] = True
            return res

    # 2. Check if API Key is configured
    if not settings.GEMINI_API_KEY or settings.GEMINI_API_KEY == "your_api_key_here":
        logger.warning("GEMINI_API_KEY is not set. Returning safe fallback response.")
        return get_safe_fallback_response(cleaned_text)

    # 3. Call Google Gemini API with Structured JSON Output
    if not GENAI_AVAILABLE:
        logger.error("google-genai SDK not available.")
        return get_safe_fallback_response(cleaned_text)

    try:
        client = genai.Client(api_key=settings.GEMINI_API_KEY)
        
        system_instruction = """You are Suraksha Setu (सुरक्षा सेतु), an expert financial fraud detection assistant specifically engineered to protect rural and first-time digital banking users in India.
Your mission is to analyze SMS messages, WhatsApp forwards, emails, or call transcripts and protect users from financial scams.

You are acutely aware of common Indian fraud patterns:
1. Fake UPI Collect Requests (disguised as cashback or money receipt on PhonePe/GPay/Paytm).
2. Bank KYC Expiration / Account Block Phishing (fake SBI, HDFC, ICICI alerts with malicious short links).
3. Predatory Instant Loan App Harassment (threats to morph photos or call contacts over fake EMI defaults).
4. Digital Arrest / Police & CBI Impersonation (fake calls from Customs, CBI, or Cyber Crime demanding immediate money).
5. Customs / Courier Parcel Scams (fake India Post or FedEx alerts claiming illegal items or customs duty).
6. Lottery / Prize Scams (fake KBC or WhatsApp lucky draws asking for processing tax/fees).
7. Investment / Ponzi Schemes (fake Telegram work-from-home or rating jobs promising guaranteed high returns).
8. Bank Official OTP Impersonation (scammers posing as bank security asking for OTP to stop a fake transaction).
9. Fake Government Schemes (PM Jan Dhan Yojana or DBT lures to steal Aadhaar and bank details).

GUIDELINES FOR EXPLANATIONS:
- Write at a reading level appropriate for someone with limited digital literacy in rural India.
- Keep sentences short, calm, and reassuring. Avoid technical jargon or alarmist tone.
- Explain clearly WHY the message is suspicious (e.g., "Real banks never ask for PIN to receive money", "Government officials never ask for money over WhatsApp").
- You MUST provide the explanation and action steps in THREE languages simultaneously: English (en), Hindi (hi), and Gujarati (gu).
- Action steps must be short, actionable commands (e.g., "Do not share your OTP", "Do not click the link", "Report to 1930").

Analyze the user's input text and respond ONLY with structured JSON adhering to the requested schema."""

        prompt = f"Please analyze the following suspicious message/text from an Indian financial user:\n\n\"\"\"{cleaned_text}\"\"\""
        
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL_NAME,
            contents=[
                types.Content(role="user", parts=[types.Part.from_text(text=prompt)])
            ],
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
                response_schema=AnalysisResponse,
                temperature=0.2,
            ),
        )
        
        if response.text:
            data = json.loads(response.text)
            data["is_fallback"] = False
            return data
        else:
            logger.warning("Empty response from Gemini API.")
            return get_safe_fallback_response(cleaned_text)
            
    except Exception as e:
        logger.error(f"Error calling Gemini API: {e}. Attempting 1 retry...")
        # Simple retry once (as requested in line 63: "retry once, then fall back to a safe default")
        try:
            response = client.models.generate_content(
                model=settings.GEMINI_MODEL_NAME,
                contents=[types.Content(role="user", parts=[types.Part.from_text(text=prompt)])],
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    response_mime_type="application/json",
                    response_schema=AnalysisResponse,
                    temperature=0.2,
                ),
            )
            if response.text:
                data = json.loads(response.text)
                data["is_fallback"] = False
                return data
        except Exception as retry_err:
            logger.error(f"Retry failed: {retry_err}")
            
        return get_safe_fallback_response(cleaned_text)

def get_safe_fallback_response(text: str) -> dict:
    return {
        "verdict": "Suspicious",
        "confidence": 50,
        "category": "Unverified Message / System Offline",
        "explanation": {
            "en": "We are currently unable to reach our AI analysis servers or verify this message automatically. Please treat any unsolicited request for money, OTPs, or personal details with extreme caution.",
            "hi": "हम वर्तमान में हमारे एआई सर्वर से संपर्क करने में असमर्थ हैं। कृपया पैसे, ओटीपी या व्यक्तिगत जानकारी के किसी भी अनचाहे अनुरोध से बेहद सावधान रहें।",
            "gu": "અમે હાલમાં અમારા AI સર્વરનો સંપર્ક કરવામાં અસમર્થ છીએ. કૃપા કરીને નાણાં, OTP અથવા વ્યક્તિગત માહિતીની કોઈપણ વિનંતીથી ખૂબ સાવધ રહો."
        },
        "action_steps": {
            "en": [
                "Do not click on any suspicious links in the message.",
                "Do not share your OTP, PIN, or bank password with anyone.",
                "If in doubt, contact your bank directly through their official phone number or branch.",
                "Report cybercrime to the national helpline at 1930 or cybercrime.gov.in."
            ],
            "hi": [
                "संदेश में दिए गए किसी भी संदिग्ध लिंक पर क्लिक न करें।",
                "अपना ओटीपी, पिन या बैंक पासवर्ड किसी के साथ साझा न करें।",
                "यदि कोई संदेह हो, तो सीधे अपने बैंक के आधिकारिक फोन नंबर या शाखा से संपर्क करें।",
                "राष्ट्रीय हेल्पलाइन 1930 या cybercrime.gov.in पर साइबर अपराध की रिपोर्ट करें।"
            ],
            "gu": [
                "સંદેશમાં કોઈપણ શંકાસ્પદ લિંક પર ક્લિક કરશો નહીં.",
                "તમારો OTP, PIN અથવા બેંક પાસવર્ડ કોઈની સાથે શેર કરશો નહીં.",
                "જો શંકા હોય, તો તમારા બેંકના સત્તાવાર ફોન નંબર અથવા શાખા દ્વારા સીધો સંપર્ક કરો.",
                "રાષ્ટ્રીય હેલ્પલાઇન 1930 અથવા cybercrime.gov.in પર સાયબર ક્રાઇમની જાણ કરો."
            ]
        },
        "is_fallback": True
    }
