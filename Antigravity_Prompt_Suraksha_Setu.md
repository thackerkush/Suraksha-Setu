# Build Prompt for Antigravity — "Suraksha Setu" (Financial Safety for Rural India)

Copy everything below the line into Antigravity as your project prompt.

---

## Project Context

I'm building a submission for the **Maverick Effect AI Challenge 2026** (a student AI hackathon in Gujarat, India, judged on Relevance, Innovation, Technical Accuracy, Implementation, Scalability, and Presentation). My chosen problem statement is:

> **"Financial Safety for Rural India"** — Help first-time digital-banking users detect scam calls, fake UPI payment requests, phishing messages, and fraudulent loan offers, with explanations in their own language.

I need a **working, demo-ready, full-stack web application** built end-to-end. I have a hard deadline of **July 31, 2026**, so prioritize a genuinely working MVP over an exhaustive feature list — get the core loop rock solid first, then layer in stretch features only if time allows.

**Hard constraints — do not violate these:**
- **Zero budget.** Use only free-tier services: free-tier LLM APIs, free-tier hosting, free-tier databases. No paid infrastructure, no paid datasets, no paid APIs of any kind.
- **Web-only.** No native mobile app, no Android/iOS build, no Flutter/React Native. A responsive web app (works well on both desktop and mobile browsers) is the target platform.
- **No hardware, no IoT, no sensors.** This is a pure software/AI product.
- I'm comfortable with HTML/CSS/JavaScript, general web development, and AI-assisted full-stack work, but I'm still learning backend architecture — favor clear, well-commented, conventional code over clever abstractions, and explain non-obvious architectural decisions as you go.

---

## Product Concept: "Suraksha Setu" ("bridge of safety")

A web app where a user pastes or uploads a suspicious SMS, WhatsApp message, email, or (stretch goal) a call transcript, and the app:

1. **Classifies** it as Scam / Suspicious / Likely Legitimate, with a confidence indicator.
2. **Categorizes** the scam type if applicable (e.g., fake UPI payment request, fake KYC update, loan-app scam, lottery/prize scam, phishing link, impersonation of a bank/government official).
3. **Explains why**, in plain language, in the user's chosen language (start with English + Hindi + Gujarati).
4. **Gives a clear, short "what to do now" action list** (e.g., "Do not click this link," "Do not share your OTP," "Report to cybercrime.gov.in," "Block and report this number").
5. Logs anonymized examples (no personally identifiable info) to a simple in-app "recently seen scam patterns" feed, to visually demonstrate the "Scalability / community learning" angle to judges.

Design it to feel trustworthy, calm, and clear — this is for financially anxious, potentially non-tech-savvy users, not a flashy consumer app. Avoid alarming red/siren aesthetics; aim for clarity and reassurance.

---

## Functional Requirements (in priority order)

### Must-have (Core MVP)
1. **Landing page** — one-line explanation of what the tool does, a large clear input box ("Paste the message here"), and a "Check this message" button. Include 2–3 example messages a user can click to auto-fill and try instantly (for demo purposes).
2. **Analysis engine** — backend endpoint that takes the input text and:
   - Calls an LLM API with a carefully engineered prompt to classify + categorize + explain (see "AI/Prompt Design" below).
   - Returns structured JSON: `{ verdict, confidence, category, explanation, language, action_steps[] }`.
3. **Results view** — clean card-based UI showing verdict (color-coded but not alarmist), category, plain-language explanation, and a numbered action-steps list.
4. **Language selector** — English / Hindi / Gujarati toggle that re-renders the explanation and action steps in the selected language (via the LLM, not hardcoded translation strings, so it generalizes to any input).
5. **"Recently seen scam patterns" feed** — a simple public list of anonymized, de-identified example scam categories detected so far in the session/demo (no real user data storage requirement — mock or session-based is fine for MVP).
6. **Responsive layout** — must look clean on both a laptop browser and a phone browser, since judges may view it either way.

### Nice-to-have (only after the above is fully working and tested)
7. **Voice/call-transcript mode** — user pastes a transcript of a suspicious phone call (or, stretch-stretch: uploads short audio, transcribed via a free-tier speech-to-text API) and gets the same analysis.
8. **"Report a scam" community button** — lets a user flag a new scam pattern, appended to the "recently seen" feed.
9. **Shareable result card** — a simple export/share view of the verdict (e.g., for sharing with a family member), styled cleanly.
10. **Basic analytics dashboard** — counts of scam categories detected, for the "Scalability / real-world impact" story in the pitch.

Do not start on any "nice-to-have" item until every "must-have" item works end-to-end and has been manually tested with at least 5 real-world example scam messages and 5 legitimate messages.

---

## AI / Prompt Design Requirements

- Use a single well-structured system prompt for the LLM that:
  - Instructs it to act as a financial-fraud detection assistant for Indian users, aware of common Indian scam patterns (fake UPI collect requests, "KYC will expire" SMS, fake loan-app harassment, OTP-sharing scams, fake government-scheme messages, courier/parcel scams, digital-arrest scams, investment/Ponzi scheme messages).
  - Requires structured JSON output (verdict, confidence 0–100, category, explanation, action_steps as an array of short strings) — validate/parse this server-side, and handle malformed responses gracefully (retry once, then fall back to a safe default "unable to classify, please be cautious" response rather than crashing).
  - Explicitly instructs the model to write the explanation in the requested language (English/Hindi/Gujarati) at a reading level appropriate for someone with limited digital literacy — short sentences, no jargon.
  - Includes a few hand-written few-shot examples (2–3 clear scam examples, 1–2 clearly legitimate examples) in the prompt to anchor output quality and format consistency.
- Never expose the LLM API key in frontend code — all LLM calls happen server-side.
- Add basic rate-limiting or input-length limits on the analysis endpoint to avoid runaway API costs on the free tier.
- Include a visible, permanent disclaimer in the UI: this tool assists judgment, it does not guarantee detection of all scams and is not a substitute for reporting to official cybercrime authorities.

---

## Recommended Tech Stack (adjust if you have a strong reason, but explain why)

- **Frontend:** React (Vite), plain CSS or Tailwind — keep it lightweight, no heavy component libraries needed.
- **Backend:** Node.js + Express, or Python + FastAPI — your choice, but keep the LLM call server-side only.
- **LLM API:** Use a free-tier LLM API (e.g., a free tier of an available provider — check what's actually free/available at build time and confirm rate limits before relying on it for the live demo).
- **Database (optional, only if needed for the "recently seen scams" feed persistence):** Firebase Firestore free tier or Supabase free tier — pick whichever is faster for you to set up; a simple in-memory/session store is also acceptable for MVP if persistence isn't critical for the demo.
- **Hosting:** Frontend on Vercel or Netlify (free tier); backend on Render/Railway free tier or as serverless functions on the same platform as the frontend if simpler.
- **Version control:** Git repo from the very first commit, with clear, incremental commit messages — I want a clean commit history I can show if asked about my development process.

---

## Non-Functional Requirements

- **Performance:** Analysis should return in a few seconds max for a live demo — if the LLM call is slow, show a clear loading state ("Analyzing message...") rather than a frozen UI.
- **Error handling:** Handle empty input, extremely long input, API timeouts, and API failures gracefully with user-friendly messages — never show a raw stack trace or raw API error to the end user.
- **Accessibility:** Reasonable color contrast, readable font sizes, and simple navigation — this is for users who may not be highly tech-literate.
- **Code quality:** Clear folder structure (`/frontend`, `/backend` or `/client`, `/server`), environment variables for all API keys (never hardcoded, provide a `.env.example`), and a top-level `README.md` explaining setup, the problem being solved, the tech stack, and how to run it locally.

---

## Deliverables I need from you

1. A working full-stack repo with the must-have features implemented and manually testable locally.
2. A `README.md` that includes: problem statement summary, solution overview, tech stack, setup/run instructions, and a short "how this maps to the judging criteria" section (Relevance, Innovation, Technical Accuracy, Implementation, Scalability, Presentation) I can lift directly into my submission write-up.
3. A short list of 8–10 realistic example scam messages (Indian context — UPI, KYC, loan-app, courier, digital arrest, lottery, etc.) and 4–5 example legitimate messages, saved in a test-data file, so I can reliably demo the app live without hunting for examples on the spot.
4. Clear notes on any assumption you made or any place the free-tier API/service you chose might hit a rate limit during a live demo, so I know what to watch out for.

---

## How I'd like you to work

- Start by proposing the folder structure and confirming the exact LLM provider/free tier you'll use (check current free-tier availability and limits rather than assuming), then build incrementally: backend classification endpoint first (test with curl/Postman-style calls), then frontend wired to it, then language switching, then the "recently seen" feed, then polish.
- After each major milestone, tell me clearly what's working, what's not yet done, and what you recommend I test manually before we move to the next piece.
- Flag anything in this prompt that seems technically unrealistic within a ~2 week build window so we can descope early rather than late.
