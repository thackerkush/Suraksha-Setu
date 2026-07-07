import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, ArrowLeft, Share2, Copy, Check } from 'lucide-react';

export default function ResultCard({ result, onReset, language }) {
  const [copied, setCopied] = React.useState(false);

  if (!result) return null;

  const { verdict, confidence, category, explanation, action_steps, is_fallback } = result;

  // Calming color theme based on verdict (avoiding alarmist sirens!)
  const getTheme = () => {
    if (verdict === 'Scam') {
      return {
        bg: 'bg-rose-50/90',
        border: 'border-rose-200',
        text: 'text-rose-800',
        badgeBg: 'bg-rose-100',
        badgeText: 'text-rose-700',
        icon: <ShieldAlert className="w-8 h-8 text-rose-600" />,
        headerBg: 'bg-gradient-to-r from-rose-500 to-rose-600',
        cardBorder: 'border-rose-300'
      };
    }
    if (verdict === 'Suspicious') {
      return {
        bg: 'bg-amber-50/90',
        border: 'border-amber-200',
        text: 'text-amber-800',
        badgeBg: 'bg-amber-100',
        badgeText: 'text-amber-700',
        icon: <AlertTriangle className="w-8 h-8 text-amber-600" />,
        headerBg: 'bg-gradient-to-r from-amber-500 to-amber-600',
        cardBorder: 'border-amber-300'
      };
    }
    return {
      bg: 'bg-emerald-50/90',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-700',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      headerBg: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      cardBorder: 'border-emerald-300'
    };
  };

  const theme = getTheme();

  // Multilingual labels
  const labels = {
    verdict: {
      en: "Safety Verdict",
      hi: "सुरक्षा परिणाम (Verdict)",
      gu: "સુરક્ષા પરિણામ (Verdict)"
    },
    confidence: {
      en: "AI Confidence Score:",
      hi: "एआई विश्वास स्कोर:",
      gu: "AI વિશ્વાસ સ્કોર:"
    },
    category: {
      en: "Detected Pattern Category:",
      hi: "पहचाना गया श्रेणी पैटर्न:",
      gu: "ઓળખાયેલ શ્રેણી પેટર્ન:"
    },
    explanationTitle: {
      en: "Why is this message classified as such?",
      hi: "इस संदेश को ऐसा क्यों माना गया है?",
      gu: "આ સંદેશને આવો કેમ માનવામાં આવ્યો છે?"
    },
    actionTitle: {
      en: "What You Should Do Now (Action Checklist)",
      hi: "अब आपको क्या करना चाहिए (सुरक्षा कदम)",
      gu: "હવે તમારે શું કરવું જોઈએ (સુરક્ષા પગલાં)"
    },
    checkAnother: {
      en: "Check Another Message",
      hi: "दूसरा संदेश जांचें",
      gu: "બીજો સંદેશ તપાસો"
    },
    shareResult: {
      en: "Share Alert",
      hi: "अलर्ट शेयर करें",
      gu: "એલર્ટ શેર કરો"
    },
    offlineNote: {
      en: "⚡ Instant 0ms Evaluation (Offline Demo Mode)",
      hi: "⚡ त्वरित 0ms मूल्यांकन (डेमो मोड)",
      gu: "⚡ ત્વરિત 0ms મૂલ્યાંકન (ડેમો મોડ)"
    }
  };

  const currentExplanation = explanation?.[language] || explanation?.en || "No explanation provided.";
  const currentActions = action_steps?.[language] || action_steps?.en || [];

  const handleShare = () => {
    const shareText = `🚨 Suraksha Setu Safety Alert!\nVerdict: ${verdict} (${category})\nWhy: ${currentExplanation}\n\nStay safe! Check messages at Suraksha Setu.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-4 pb-12 animate-fadeIn">
      {/* Back Button */}
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-200/60"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{labels.checkAnother[language]}</span>
      </button>

      {/* Main Result Card */}
      <div className={`bg-white rounded-2xl shadow-xl border-2 ${theme.cardBorder} overflow-hidden transition-all duration-300`}>
        {/* Top Banner */}
        <div className={`${theme.headerBg} px-6 py-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-white">
              {theme.icon}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-bold opacity-90">
                {labels.verdict[language]}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {verdict}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:text-right">
            <div className="px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold">
              {labels.confidence[language]} <span className="font-bold text-sm ml-1">{confidence}%</span>
            </div>
            {is_fallback && (
              <div className="px-2.5 py-1 rounded-md bg-amber-400 text-slate-900 text-[11px] font-bold shadow-sm">
                {labels.offlineNote[language]}
              </div>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Category Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {labels.category[language]}
            </span>
            <span className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold ${theme.badgeBg} ${theme.badgeText} border ${theme.border}`}>
              {category}
            </span>
          </div>

          {/* Plain Language Explanation */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-trust-600 inline-block" />
              <span>{labels.explanationTitle[language]}</span>
            </h3>
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
              {currentExplanation}
            </div>
          </div>

          {/* Action Checklist */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-safety-600 inline-block" />
              <span>{labels.actionTitle[language]}</span>
            </h3>
            <div className="bg-safety-50/40 rounded-xl border border-safety-200/70 p-4 sm:p-5">
              <ul className="space-y-3">
                {currentActions.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-safety-500 text-white flex items-center justify-center text-xs font-bold mt-0.5 shadow-sm">
                      {index + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Share & Reset Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleShare}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied Alert to Clipboard!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-slate-500" />
                  <span>{labels.shareResult[language]}</span>
                </>
              )}
            </button>

            <button
              onClick={onReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99]"
            >
              <span>{labels.checkAnother[language]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
