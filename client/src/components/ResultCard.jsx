import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, HelpCircle, ArrowLeft, Share2, Check, Copy, Volume2, VolumeX } from 'lucide-react';

export default function ResultCard({ result, onReset, language }) {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!result) return null;

  const { verdict, explanation, action_checklist, risk_score } = result;

  const getTheme = (v) => {
    switch (v?.toLowerCase()) {
      case 'scam':
        return {
          bg: 'bg-rose-50/90 dark:bg-rose-950/80',
          border: 'border-rose-300 dark:border-rose-800',
          text: 'text-rose-900 dark:text-rose-100',
          badgeBg: 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800',
          icon: <ShieldAlert className="w-8 h-8 text-rose-600 dark:text-rose-400 flex-shrink-0 animate-pulse" />,
          title: language === 'hi' ? '🚨 चेतावनी: यह एक स्कैम (धोखाधड़ी) है!' : (language === 'gu' ? '🚨 ચેતવણી: આ એક સ્કેમ (છેતરપિંડી) છે!' : '🚨 WARNING: High Scam Probability!'),
          color: 'rose'
        };
      case 'suspicious':
        return {
          bg: 'bg-amber-50/90 dark:bg-amber-950/80',
          border: 'border-amber-300 dark:border-amber-800',
          text: 'text-amber-900 dark:text-amber-100',
          badgeBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800',
          icon: <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400 flex-shrink-0" />,
          title: language === 'hi' ? '⚠️ सावधान: यह संदिग्ध लग रहा है' : (language === 'gu' ? '⚠️ સાવધાન: આ શંકાસ્પદ લાગે છે' : '⚠️ CAUTION: Suspicious Message'),
          color: 'amber'
        };
      case 'safe':
        return {
          bg: 'bg-emerald-50/90 dark:bg-emerald-950/80',
          border: 'border-emerald-300 dark:border-emerald-800',
          text: 'text-emerald-900 dark:text-emerald-100',
          badgeBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800',
          icon: <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />,
          title: language === 'hi' ? '✅ सुरक्षित: कोई खतरा नहीं दिख रहा है' : (language === 'gu' ? '✅ સુરક્ષિત: કોઈ જોખમ દેખાતું નથી' : '✅ SAFE: Seems Legitimate'),
          color: 'emerald'
        };
      default:
        return {
          bg: 'bg-slate-50/90 dark:bg-slate-900/80',
          border: 'border-slate-300 dark:border-slate-800',
          text: 'text-slate-900 dark:text-slate-100',
          badgeBg: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700',
          icon: <HelpCircle className="w-8 h-8 text-slate-600 dark:text-slate-400 flex-shrink-0" />,
          title: language === 'hi' ? '🔍 विश्लेषण परिणाम' : (language === 'gu' ? '🔍 વિશ્લેષણ પરિણામ' : '🔍 Analysis Result'),
          color: 'slate'
        };
    }
  };

  const theme = getTheme(verdict);

  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const titleText = theme.title;
    const explanationText = explanation;
    const stepsText = action_checklist ? action_checklist.map((item, idx) => `Step ${idx + 1}: ${item.step}.`).join(' ') : '';
    const fullSpeech = `${titleText}. ${explanationText} ${stepsText}`;

    const utterance = new SpeechSynthesisUtterance(fullSpeech);
    utterance.lang = language === 'hi' ? 'hi-IN' : (language === 'gu' ? 'gu-IN' : 'en-IN');
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    const checklistText = action_checklist ? action_checklist.map(item => `• ${item.step}`).join('\n') : '';
    const fullText = `${theme.title}\n\n${explanation}\n\nSafety Steps:\n${checklistText}\n\n— Checked via Suraksha Setu AI`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const checklistText = action_checklist ? action_checklist.map(item => `• ${item.step}`).join('\n') : '';
    const shareText = encodeURIComponent(`*${theme.title}*\n\n${explanation}\n\n*Safety Steps:*\n${checklistText}\n\n— Verified via Suraksha Setu (AI Fraud Guard)`);
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const labels = {
    backBtn: {
      en: "← Check Another Message",
      hi: "← दूसरा संदेश जाँचें",
      gu: "← બીજો સંદેશ તપાસો"
    },
    readAloud: {
      en: "🔊 Read Advice Aloud",
      hi: "🔊 सलाह सुनकर जानें",
      gu: "🔊 સલાહ સાંભળીને જાણો"
    },
    stopReading: {
      en: "⏸️ Stop Reading",
      hi: "⏸️ बोलना रोकें",
      gu: "⏸️ બોલવાનું અટકાવો"
    },
    explanationTitle: {
      en: "Why is this flagged?",
      hi: "इसे क्यों चिह्नित किया गया है?",
      gu: "આને શા માટે ચિહ્નિત કરવામાં આવ્યું છે?"
    },
    checklistTitle: {
      en: "Your Safety Checklist (Do This Immediately):",
      hi: "आपकी सुरक्षा चेकलिस्ट (तुरंत यह करें):",
      gu: "તમારી સુરક્ષા ચેકલિસ્ટ (તુરંત આ કરો):"
    },
    shareBtn: {
      en: "Share Warning on WhatsApp",
      hi: "व्हाट्सएप पर चेतावनी शेयर करें",
      gu: "WhatsApp પર ચેતવણી શેર કરો"
    },
    copyBtn: {
      en: "Copy Advice",
      hi: "सलाह कॉपी करें",
      gu: "સલાહ કૉપિ કરો"
    },
    copiedBtn: {
      en: "Copied!",
      hi: "कॉपी हो गया!",
      gu: "કૉપિ થઈ ગયું!"
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-6 pb-12 animate-fadeIn">
      {/* Back Button & Read Aloud Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <button
          onClick={() => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            onReset();
          }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{labels.backBtn[language]}</span>
        </button>

        <button
          type="button"
          onClick={handleReadAloud}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
            isSpeaking
              ? 'bg-rose-600 text-white animate-pulse shadow-md'
              : 'bg-white dark:bg-slate-900 hover:bg-trust-50 dark:hover:bg-trust-900/40 text-trust-700 dark:text-trust-300 border border-trust-200 dark:border-trust-800'
          }`}
        >
          {isSpeaking ? <VolumeX className="w-4 h-4 animate-bounce" /> : <Volume2 className="w-4 h-4 text-trust-600 dark:text-trust-400" />}
          <span>{isSpeaking ? labels.stopReading[language] : labels.readAloud[language]}</span>
        </button>
      </div>

      {/* Main Verdict Card */}
      <div className={`rounded-2xl border-2 ${theme.border} ${theme.bg} p-6 sm:p-8 shadow-lg transition-all`}>
        {/* Header Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3.5">
            {theme.icon}
            <div>
              <h2 className={`text-lg sm:text-2xl font-extrabold ${theme.text} leading-snug`}>
                {theme.title}
              </h2>
              <span className="text-xs font-semibold opacity-75">
                AI Confidence Analysis • Calming Plain-Language Guide
              </span>
            </div>
          </div>

          {risk_score !== undefined && (
            <div className={`px-3 py-1 rounded-xl text-xs font-bold border ${theme.badgeBg}`}>
              Risk Score: {risk_score}/100
            </div>
          )}
        </div>

        {/* Plain Language Explanation */}
        <div className="mt-6 space-y-2">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-75">
            {labels.explanationTitle[language]}
          </h3>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium text-slate-800 dark:text-slate-100 bg-white/60 dark:bg-slate-900/60 p-4 sm:p-5 rounded-xl border border-black/5 dark:border-white/5 shadow-inner">
            {explanation}
          </p>
        </div>

        {/* Action Checklist */}
        {action_checklist && action_checklist.length > 0 && (
          <div className="mt-8 space-y-3">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-75">
              {labels.checklistTitle[language]}
            </h3>
            <div className="space-y-2.5">
              {action_checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-white/80 dark:bg-slate-900/80 p-3.5 sm:p-4 rounded-xl border border-black/5 dark:border-white/5 shadow-sm hover:bg-white dark:hover:bg-slate-900 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                    {item.step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share & Copy Actions */}
        <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleShareWhatsApp}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <Share2 className="w-4 h-4" />
            <span>{labels.shareBtn[language]}</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
            <span>{copied ? labels.copiedBtn[language] : labels.copyBtn[language]}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
