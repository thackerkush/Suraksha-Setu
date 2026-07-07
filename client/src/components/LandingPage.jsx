import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Sparkles, MessageSquareWarning, ShieldAlert, CheckCircle, HelpCircle, Mic, MicOff } from 'lucide-react';

export default function LandingPage({ onAnalyze, loading, language, onEarnXP }) {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is supported in Google Chrome, Microsoft Edge, and Android browsers.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : (language === 'gu' ? 'gu-IN' : 'en-IN');
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setText(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error("Failed to start recognition:", e);
      setIsListening(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !loading) {
      if (isListening) setIsListening(false);
      onAnalyze(text.trim());
    }
  };

  const handlePillClick = (exampleText) => {
    setText(exampleText);
    if (onEarnXP) onEarnXP(10, "Demo Pill Explored");
    onAnalyze(exampleText);
  };

  const labels = {
    badge: {
      en: "AI Financial Fraud Defense for Rural India",
      hi: "ग्रामीण भारत के लिए एआई वित्तीय सुरक्षा",
      gu: "ગ્રામીણ ભારત માટે AI નાણાકીય સુરક્ષા"
    },
    heroTitle1: {
      en: "Received a suspicious SMS, WhatsApp, or call?",
      hi: "कोई संदिग्ध एसएमएस, व्हाट्सएप या कॉल आया है?",
      gu: "કોઈ શંકાસ્પદ SMS, WhatsApp કે કૉલ આવ્યો છે?"
    },
    heroTitle2: {
      en: "Let AI verify if it's safe before you pay.",
      hi: "पैसे भेजने से पहले एआई से जांच लें कि यह सुरक्षित है या नहीं।",
      gu: "પૈસા મોકલતા પહેલા AI થી તપાસો કે તે સુરક્ષિત છે કે નહીં."
    },
    heroSubtitle: {
      en: "Suraksha Setu protects first-time digital banking users and rural citizens from UPI scams, phishing links, fake lottery wins, and predatory loan apps in plain language.",
      hi: "सुरक्षा सेतु पहली बार डिजिटल बैंकिंग का उपयोग करने वालों और ग्रामीण नागरिकों को सरल भाषा में यूपीआई स्कैम, फिशिंग लिंक, और फर्जी लॉटरी से बचाता है।",
      gu: "સુરક્ષા સેતુ પ્રથમ વખત ડિજિટલ બેંકિંગનો ઉપયોગ કરનારા અને ગ્રામીણ નાગરિકોને સરળ ભાષામાં UPI સ્કેમ, ફિશિંગ લિંક્સ અને નકલી લોટરીથી બચાવે છે."
    },
    inputPlaceholder: {
      en: "Paste the SMS, WhatsApp message, or describe what the caller said here...",
      hi: "एसएमएस, व्हाट्सएप संदेश यहाँ पेस्ट करें, या कॉल करने वाले ने क्या कहा यहाँ लिखें...",
      gu: "SMS, WhatsApp સંદેશ અહીં પેસ્ટ કરો, અથવા કૉલ કરનારે શું કહ્યું તે અહીં લખો..."
    },
    voiceBtn: {
      en: "Speak Message",
      hi: "बोलकर दर्ज करें",
      gu: "બોલીને લખો"
    },
    listeningText: {
      en: "🔴 Listening... Speak clearly now",
      hi: "🔴 सुन रहा है... स्पष्ट बोलें",
      gu: "🔴 સાંભળી રહ્યા છીએ... સ્પષ્ટ બોલો"
    },
    analyzeBtn: {
      en: "Verify Safety Now",
      hi: "अभी सुरक्षा की जाँच करें",
      gu: "હમણાં સુરક્ષા તપાસો"
    },
    analyzingBtn: {
      en: "Analyzing with AI...",
      hi: "एआई द्वारा जाँच की जा रही है...",
      gu: "AI દ્વારા તપાસ થઈ રહી છે..."
    },
    tryDemo: {
      en: "Try a 0ms Instant Demo Example (Earn XP):",
      hi: "तुरंत 0ms डेमो उदाहरण आजमाएं (अंक कमाएं):",
      gu: "તુરંત 0ms ડેમો ઉદાહરણ અજમાવો (પોઈન્ટ મેળવો):"
    },
    howItWorks: {
      en: "How Suraksha Setu Protects You",
      hi: "सुरक्षा सेतु आपकी रक्षा कैसे करता है",
      gu: "સુરક્ષા સેતુ તમારું રક્ષણ કેવી રીતે કરે છે"
    },
    step1Title: {
      en: "1. Instant AI Scan",
      hi: "1. तुरंत एआई जाँच",
      gu: "1. તુરંત AI તપાસ"
    },
    step1Desc: {
      en: "Analyzes message text, links, and UPI IDs against Indian cybercrime patterns.",
      hi: "भारतीय साइबर अपराध पैटर्न के खिलाफ संदेश, लिंक और यूपीआई आईडी का विश्लेषण करता है।",
      gu: "ભારતીય સાયબર ક્રાઇમ પેટર્ન સામે સંદેશ, લિંક્સ અને UPI ID નું વિશ્લેષણ કરે છે."
    },
    step2Title: {
      en: "2. Plain Language Explanation",
      hi: "2. सरल भाषा में स्पष्टीकरण",
      gu: "2. સરળ ભાષામાં સમજૂતી"
    },
    step2Desc: {
      en: "No complex technical jargon or alarmist sirens. Just calm, reassuring guidance in your language.",
      hi: "कोई कठिन तकनीकी शब्द नहीं। केवल आपकी भाषा में शांत और स्पष्ट मार्गदर्शन।",
      gu: "કોઈ અઘરા તકનીકી શબ્દો નહીં. ફક્ત તમારી ભાષામાં શાંત અને સ્પષ્ટ માર્ગદર્શન."
    },
    step3Title: {
      en: "3. Clear Action Steps",
      hi: "3. स्पष्ट सुरक्षा कदम",
      gu: "3. સ્પષ્ટ સુરક્ષા પગલાં"
    },
    step3Desc: {
      en: "Provides an easy numbered checklist (e.g. 'Do not enter PIN', 'Call 1930') to keep your money safe.",
      hi: "आपके पैसे सुरक्षित रखने के लिए आसान चेकलिस्ट (जैसे 'पिन दर्ज न करें', '1930 पर कॉल करें') प्रदान करता है।",
      gu: "તમારા પૈસા સુરક્ષિત રાખવા માટે સરળ ચેકલિસ્ટ (જેમ કે 'PIN દાખલ ન કરો', '1930 પર કૉલ કરો') પ્રદાન કરે છે."
    }
  };

  const demoExamples = [
    {
      label: "🎉 PhonePe Cashback Trap",
      text: "Congratulations! You have won Rs 5,000 cashback from PhonePe. Please enter your UPI PIN on the collect request to transfer money into your SBI account immediately."
    },
    {
      label: "⚠️ SBI PAN KYC Threat",
      text: "Dear SBI User, your account PAN KYC is expired today. Your NetBanking will be blocked in 2 hours. Update immediately here: http://sbi-kyc-update-net.in"
    },
    {
      label: "💸 Instant Loan Harassment",
      text: "URGENT: Your Instant Rupee Loan EMI is overdue by 1 day. Pay Rs 8,500 in 2 hours or we will send legal notice and call all your WhatsApp contacts."
    },
    {
      label: "⚡ Electricity Bill Cut-off",
      text: "URGENT from Electricity Dept: Your power supply will be disconnected tonight at 9:30 PM due to unpaid bill. Call officer Ramesh immediately at 9876543210 to pay."
    },
    {
      label: "📦 Customs Parcel Scam",
      text: "India Post / Customs: Your international parcel #IND8821 is held at airport customs due to illegal contents. Pay Rs 15,000 customs penalty or police arrest warrant will be issued."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-10 pb-12 animate-fadeIn">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-trust-50 dark:bg-trust-900/40 border border-trust-200 dark:border-trust-800 text-trust-800 dark:text-trust-300 text-xs sm:text-sm font-bold shadow-sm">
          <ShieldCheck className="w-4 h-4 text-trust-600 dark:text-trust-400" />
          <span>{labels.badge[language]}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {labels.heroTitle1[language]} <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-trust-600 via-trust-700 to-amber-600 dark:from-trust-400 dark:via-trust-500 dark:to-amber-400">
            {labels.heroTitle2[language]}
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {labels.heroSubtitle[language]}
        </p>
      </div>

      {/* Input Box & Voice Button */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 mb-8 transition-all hover:shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={labels.inputPlaceholder[language]}
              rows={4}
              disabled={loading}
              className={`w-full p-4 pb-12 rounded-xl border-2 transition-colors text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm sm:text-base focus:outline-none resize-none ${
                isListening 
                  ? 'border-rose-500 bg-rose-50/30 dark:bg-rose-950/30' 
                  : 'border-slate-200 dark:border-slate-700 focus:border-trust-600 dark:focus:border-trust-500 focus:bg-slate-50/50 dark:focus:bg-slate-800/50 bg-white dark:bg-slate-800/40'
              }`}
            />

            {/* Voice Input Microphone Button inside bottom-right of textarea */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              {isListening && (
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 animate-pulse bg-rose-100 dark:bg-rose-900/60 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-800 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-600 dark:bg-rose-400 animate-ping" />
                  {labels.listeningText[language]}
                </span>
              )}
              {speechSupported && (
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  disabled={loading}
                  title={labels.voiceBtn[language]}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm ${
                    isListening
                      ? 'bg-rose-600 text-white animate-bounce'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                  <span>{labels.voiceBtn[language]}</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>100% Free & Private • Powered by Google Gemini AI</span>
            </div>

            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-trust-600 to-trust-800 hover:from-trust-700 hover:to-trust-900 text-white font-bold text-sm sm:text-base shadow-lg shadow-trust-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{labels.analyzingBtn[language]}</span>
                </>
              ) : (
                <>
                  <span>{labels.analyzeBtn[language]}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* 0ms Instant Demo Pills */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{labels.tryDemo[language]}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {demoExamples.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePillClick(ex.text)}
                disabled={loading}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-trust-50 dark:hover:bg-trust-900/40 hover:text-trust-800 dark:hover:text-trust-300 hover:border-trust-300 dark:hover:border-trust-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all text-left truncate max-w-full sm:max-w-[240px]"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-12">
        <h2 className="text-center text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
          {labels.howItWorks[language]}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-trust-50 dark:bg-trust-900/40 text-trust-600 dark:text-trust-400 flex items-center justify-center font-bold text-lg mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white text-base">{labels.step1Title[language]}</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{labels.step1Desc[language]}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg mb-3">
              <MessageSquareWarning className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white text-base">{labels.step2Title[language]}</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{labels.step2Desc[language]}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg mb-3">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white text-base">{labels.step3Title[language]}</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{labels.step3Desc[language]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
