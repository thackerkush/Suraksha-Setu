# Suraksha Setu (सुरक्षा सेतु) — Financial Safety for Rural India
**Submission for the Maverick Effect AI Challenge 2026**

> **"Financial Safety for Rural India"** — A demo-ready, full-stack AI web application helping first-time digital-banking users detect scam calls, fake UPI payment requests, phishing messages, and fraudulent loan offers, with plain-language explanations in English, Hindi (हिंदी), and Gujarati (ગુજરાતી).

---

## 🌟 Problem Statement & Solution Overview

As digital banking and UPI penetration expand rapidly across rural India, first-time financial users become vulnerable targets for cybercriminals. Common threats include fake UPI "collect" requests disguised as payments, SMS messages claiming bank KYC has expired, predatory loan apps, digital arrest threats, and lottery scams.

**Suraksha Setu** (*"Bridge of Safety"*) acts as a calm, trustworthy financial fraud assistant. When a user pastes a suspicious message, SMS, WhatsApp forward, or email, Suraksha Setu:
1. **Classifies** the threat level (Scam / Suspicious / Likely Legitimate) with a clear confidence score.
2. **Categorizes** the specific Indian fraud archetype (e.g., Fake UPI Collect Request, Bank KYC Impersonation, Loan App Harassment, Parcel/Courier Scam).
3. **Explains WHY** in simple, non-technical plain language across **English, Hindi, and Gujarati**.
4. **Provides an Action Checklist** telling the user exactly what to do next (e.g., "Do not share OTP", "Report to 1930 / cybercrime.gov.in").
5. **Logs Anonymized Patterns** to a live community feed, demonstrating real-world scalability and collective defense.

---

## 🛠️ Tech Stack & Zero-Budget Architecture

This project strictly adheres to a **Zero-Budget** architecture using 100% free-tier services and open-source frameworks:

* **Frontend:** **React (Vite) + Tailwind CSS**
  * Lightweight, responsive web app optimized for both laptop browsers and mobile phones.
  * Designed with calming, accessible aesthetics (avoiding alarmist siren/red designs to reduce user anxiety).
* **Backend:** **Python + FastAPI**
  * Asynchronous REST API with automatic OpenAPI documentation.
  * Native **Pydantic schema validation** to enforce strict structured JSON output from the LLM.
  * **Rate Limiting (`slowapi`)** to prevent API abuse and protect free-tier quotas.
* **AI / LLM Engine:** **Google Gemini API (Free Tier via Google AI Studio)**
  * Powered by `Gemini 2.0 Flash` / `Gemini 2.5 Flash`.
  * **Why Gemini:** Exceptionally strong native performance in Hindi and Gujarati without external translation APIs.
  * **Zero-Latency Multilingual Architecture:** A single API call generates explanations in all three languages simultaneously, allowing instant language toggling in the UI without re-querying the backend.
  * **Offline Demo Fallback Mode:** To guarantee 100% reliability during live hackathon judging (even with poor Wi-Fi or API rate limits), the backend includes pre-computed analyses for 8–10 realistic Indian scam test cases.

---

## 🚀 Setup & Local Run Instructions

### Prerequisites
* **Node.js** (v18 or higher) & **npm**
* **Python** (v3.10 or higher) & **pip**
* A free Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 1. Backend Setup (`/server`)
```bash
# Navigate to project root
cd project

# Create and activate a Python virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install backend dependencies
pip install -r server/requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and paste your GEMINI_API_KEY

# Start the FastAPI server (runs on http://localhost:8000)
uvicorn server.main:app --reload --port 8000
```

### 2. Frontend Setup (`/client`)
Open a **new terminal window**:
```bash
# Navigate to frontend directory
cd project/client

# Install dependencies
npm install

# Start the Vite development server (runs on http://localhost:5173)
npm run dev
```

Open your browser to `http://localhost:5173` to experience Suraksha Setu!

---

## 🏆 Mapping to Hackathon Judging Criteria

This project is specifically engineered to excel across all six judging criteria of the **Maverick Effect AI Challenge 2026**:

| Criteria | How Suraksha Setu Fulfills It |
| :--- | :--- |
| **1. Relevance** | Directly addresses India's pressing financial inclusion challenge: safeguarding vulnerable, first-time rural banking users against sophisticated social engineering and UPI fraud. |
| **2. Innovation** | Replaces generic spam filters with **context-aware AI explanations** and actionable checklists rendered natively in regional Indian languages (Hindi & Gujarati), tailored to local reading levels. |
| **3. Technical Accuracy** | Utilizes advanced prompt engineering with few-shot Indian scam archetypes, server-side Pydantic schema enforcement (`responseMimeType: "application/json"`), and structured error recovery. |
| **4. Implementation** | Delivers an end-to-end working full-stack web app with responsive mobile/desktop layouts, graceful loading states, robust rate-limiting, and an offline fallback architecture. |
| **5. Scalability** | Features a stateless backend design and an anonymized **"Recently Seen Scam Patterns"** community feed that visualizes collective fraud intelligence and learning across regions. |
| **6. Presentation** | Built with a demo-first mindset: includes clickable sample pills on the landing page for instant 0ms evaluations, a calming trustworthy UI design, and comprehensive documentation. |

---

## 📁 Repository Structure
```text
project/
├── client/                 # React + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/     # LandingPage, ResultCard, LanguageSelector, RecentScamsFeed
│   │   ├── App.jsx         # Main application state and layout
│   │   └── index.css       # Tailwind design tokens and accessible styles
│   ├── package.json
│   └── vite.config.js
├── server/                 # Python + FastAPI Backend
│   ├── data/
│   │   └── test_scams.json # Curated Indian scam test suite & offline fallback data
│   ├── services/
│   │   └── llm_service.py  # Gemini API integration, prompt engineering, schema validation
│   ├── config.py           # Environment variable management
│   ├── main.py             # FastAPI endpoints, CORS, rate-limiting
│   └── requirements.txt    # Python backend dependencies
├── .env.example
├── .gitignore
└── README.md
```

---
*Built with ❤️ for rural financial empowerment.*
