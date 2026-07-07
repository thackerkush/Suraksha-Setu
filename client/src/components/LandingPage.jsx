import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, Send, MessageSquareAlert, PhoneCall } from 'lucide-react';

export default function LandingPage({ onAnalyze, loading, language }) {
  const [text, setText] = useState('');
  const [demoPills, setDemoPills] = useState([
    {
      id: "scam-upi-1",
      title: "Fake UPI Collect Request",
      title_hi: "फर्जी UPI कलेक्ट रिक्वेस्ट",
      title_gu: "નકલી UPI કલેક્ટ રિક્વેસ્ટ",
      text: "Dear Customer, Rs 5,000 cashback is approved from PhonePe. Enter PIN on collect request to receive money into your bank account immediately."
    },
    {
      id: "scam-kyc-1",
      title: "Bank KYC Block Threat",
      title_hi: "बैंक KYC ब्लॉक करने की धमकी",
      title_gu: "બેંક KYC બ્લોક કરવાની ધમકી",
      text: "Dear SBI User, your account PAN KYC is expired today. Your NetBanking will be blocked tonight. Update immediately at http://sbi-kyc-update-net.in or call 9876543210."
    },
    {
      id: "legit-bank-1",
      title: "Legitimate Bank SMS",
      title_hi: "असली बैंक का संदेश",
      title_gu: "અસલી બેંકનો સંદેશ",
      text: "Dear Customer, A/c XX1234 is credited with Rs 15,000.00 on 06-Jul-26 by NEFT-INDB0000001-SALARY. Total Bal: Rs 42,350.50. - ICICI Bank"
    }
  ]);

  // Fetch dynamic demo pills from backend if available
  useEffect(() => {
    fetch('/api/test-scams')
      .then(res => res.json())
      .then(data => {
        if (data.test_scams && data.test_scams.length > 0) {
          const pills = data.test_scams.filter(item => item.is_demo_pill);
          if (pills.length > 0) {
            setDemoPills(pills);
          }
        }
      })
      .catch(err => console.log("Using default fallback demo pills.", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !loading) {
      onAnalyze(text.trim());
    }
  };

  const handlePillClick = (pillText) => {
    setText(pillText);
    onAnalyze(pillText);
  };

  const titles = {
    en: "Financial Safety for Rural India",
    hi: "ग्रामीण भारत के लिए वित्तीय सुरक्षा",
    gu: "ગ્રામીણ ભારત માટે નાણાકીય સુરક્ષા"
  };

  const subtitles = {
    en: "Help first-time digital-banking users detect scam calls, fake UPI payment requests, phishing messages, and fraudulent loan offers in plain language.",
    hi: "पहली बार डिजिटल बैंकिंग का उपयोग करने वालों को फर्जी यूपीआई अनुरोधों, स्कैम कॉल और फिशिंग संदेशों से अपनी भाषा में बचाएं।",
    gu: "પ્રથમ વખત ડિજિટલ બેંકિંગનો ઉપયોગ કરનારાઓને નકલી UPI વિનંતીઓ, સ્કેમ કૉલ્સ અને ફિશિંગ સંદેશાઓથી પોતાની ભાષામાં બચાવો."
  };

  const inputPlaceholders = {
    en: "Paste a suspicious SMS, WhatsApp forward, email, or call transcript here...",
    hi: "कोई भी संदिग्ध एसएमएस, व्हाट्सएप संदेश, ईमेल या कॉल विवरण यहाँ पेस्ट करें...",
    gu: "કોઈપણ શંકાસ્પદ SMS, WhatsApp સંદેશ, ઈમેલ અથવા કૉલ વિગત અહીં પેસ્ટ કરો..."
  };

  const buttonTexts = {
    en: "Check this message",
    hi: "इस संदेश की जाँच करें",
    gu: "આ સંદેશ તપાસો"
  };

  const tryExamplesTexts = {
    en: "Try an example message instantly (0ms Demo Mode):",
    hi: "तुरंत एक उदाहरण संदेश आज़माएं (0ms डेमो मोड):",
    gu: "તરત જ એક ઉદાહરણ સંદેશ અજમાવો (0ms ડેમો મોડ):"
  };

  return (
    <div className="max-w-4xl mx-auto w-full pt-8 pb-12 px-4 sm:px-6">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-trust-50 border border-trust-200 text-trust-700 text-xs font-semibold uppercase tracking-wider mb-4 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Maverick Effect AI Challenge 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Suraksha Setu <span className="text-trust-600">(सुरक्षा सेतु)</span>
        </h1>
        <p className="text-base sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto mb-2">
          {titles[language]}
        </p>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
          {subtitles[language]}
        </p>
      </div>

      {/* Main Input Box Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-5 sm:p-8 transition-all duration-300 hover:shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={inputPlaceholders[language]}
              rows={5}
              className="w-full rounded-xl border border-slate-300 p-4 text-slate-800 placeholder-slate-400 focus:border-trust-500 focus:ring-2 focus:ring-trust-200 focus:outline-none transition-all text-sm sm:text-base resize-none shadow-inner bg-slate-50/50"
              disabled={loading}
            />
            {text && !loading && (
              <button
                type="button"
                onClick={() => setText('')}
                className="absolute top-3 right-3 text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-200/60 hover:bg-slate-200 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <PhoneCall className="w-4 h-4 text-trust-500 flex-shrink-0" />
              <span>Works with SMS, WhatsApp, Emails, and Call Transcripts!</span>
            </div>

            <button
              type="submit"
              disabled={!text.trim() || loading}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white shadow-md flex items-center justify-center gap-2.5 transition-all duration-200 ${
                !text.trim() || loading
                  ? 'bg-slate-300 cursor-not-allowed shadow-none'
                  : 'bg-trust-600 hover:bg-trust-700 hover:shadow-lg active:scale-[0.99]'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing Safety...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>{buttonTexts[language]}</span>
                  <Send className="w-4 h-4 ml-0.5 opacity-80" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Clickable Demo Pills Section */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
            <MessageSquareAlert className="w-4 h-4 text-amber-500" />
            <span>{tryExamplesTexts[language]}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {demoPills.map((pill) => {
              const pillTitle = language === 'hi' && pill.title_hi ? pill.title_hi : (language === 'gu' && pill.title_gu ? pill.title_gu : pill.title);
              const isLegit = pill.id.includes('legit');
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => handlePillClick(pill.text)}
                  disabled={loading}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                    isLegit
                      ? 'bg-safety-50/60 border-safety-200 hover:bg-safety-100/80 hover:border-safety-300'
                      : 'bg-amber-50/60 border-amber-200 hover:bg-amber-100/80 hover:border-amber-300'
                  }`}
                >
                  <span className={`text-xs font-bold mb-1 flex items-center justify-between ${
                    isLegit ? 'text-safety-700' : 'text-amber-800'
                  }`}>
                    <span>{pillTitle}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-semibold underline">
                      Try ->
                    </span>
                  </span>
                  <span className="text-[11px] text-slate-600 line-clamp-2 leading-snug">
                    {pill.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
