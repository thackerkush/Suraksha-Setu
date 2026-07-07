import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    PORT: int = int(os.getenv("PORT", 8000))
    CLIENT_URL: str = os.getenv("CLIENT_URL", "http://localhost:5173")
    RATE_LIMIT_RPM: str = os.getenv("RATE_LIMIT_RPM", "10/minute")
    
    # Model configuration
    # We use Gemini 2.0 Flash (or 2.5 Flash) for high multilingual speed and generous free-tier limits
    GEMINI_MODEL_NAME: str = os.getenv("GEMINI_MODEL_NAME", "gemini-2.0-flash")

settings = Config()
