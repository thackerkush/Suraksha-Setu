import React, { useState } from 'react';
import { ShieldAlert, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

export default function Disclaimer({ language }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const content = {
    title: {
      en: "Important AI Safety & Emergency Disclaimer",
      hi: "महत्वपूर्ण एआई सुरक्षा और आपातकालीन अस्वीकरण (Disclaimer)",
      gu: "મહત્વપૂર્ણ AI સુરક્ષા અને કટોકટી અસ્વીકરણ (Disclaimer)"
    },
    shortText: {
      en: "Suraksha Setu is an AI-assisted financial fraud awareness tool built for education and preventive guidance. It does not replace official bank verification or law enforcement investigations.",
      hi: "सुरक्षा सेतु शिक्षा और सुरक्षा मार्गदर्शन के लिए बनाया गया एक एआई उपकरण है। यह आधिकारिक बैंक सत्यापन या पुलिस जांच का विकल्प नहीं है।",
      gu: "સુરક્ષા સેતુ શિક્ષણ અને સુરક્ષા માર્ગદર્શન માટે બનાવેલ એક AI સાધન છે. આ સત્તાવાર બેંક ચકાસણી કે પોલીસ તપાસનો વિકલ્પ નથી."
    },
    bullet1: {
      en: "AI Limitations: While powered by advanced Gemini AI and curated Indian scam patterns, artificial intelligence can occasionally make mistakes. Always double-check critical financial transactions with your bank.",
      hi: "एआई की सीमाएं: उन्नत जेमिनी एआई द्वारा संचालित होने के बावजूद, एआई कभी-कभी गलती कर सकता है। महत्वपूर्ण वित्तीय लेनदेन की हमेशा अपने बैंक से जांच करें।",
      gu: "AI ની મર્યાદાઓ: અદ્યતન જેમિની AI દ્વારા સંચાલિત હોવા છતાં, AI ક્યારેક ભૂલ કરી શકે છે. મહત્વપૂર્ણ નાણાકીય લેવડદેવડની હંમેશા તમારી બેંક સાથે તપાસ કરો."
    },
    bullet2: {
      en: "Emergency Action: If you have already transferred money to a scammer or disclosed your UPI PIN/OTP, do not wait! Immediately call the National Cyber Crime Helpline at 1930 within the Golden Hour.",
      hi: "आपातकालीन कार्रवाई: यदि आपने पहले ही किसी ठग को पैसे भेज दिए हैं या अपना यूपीआई पिन/ओटीपी साझा कर दिया है, तो प्रतीक्षा न करें! तुरंत 1930 पर कॉल करें।",
      gu: "કટોકટીની કાર્યવાહી: જો તમે પહેલાથી જ કોઈ ઠગને પૈસા મોકલી દીધા છે અથવા તમારો UPI PIN/OTP શેર કર્યો છે, તો રાહ ન જુઓ! તુરંત 1930 પર કૉલ કરો."
    },
    bullet3: {
      en: "No Financial Liability: This prototype is built for the Maverick Effect AI Challenge 2026. The developers assume no liability for financial losses incurred by users.",
      hi: "कोई वित्तीय दायित्व नहीं: यह प्रोटोटाइप मैवरिक इफेक्ट एआई चैलेंज 2026 के लिए बनाया गया है। डेवलपर्स किसी भी वित्तीय नुकसान के लिए जिम्मेदार नहीं होंगे।",
      gu: "કોઈ નાણાકીય જવાબદારી નથી: આ પ્રોટોટાઈપ મેવરિક ઈફેક્ટ AI ચેલેન્જ 2026 માટે બનાવવામાં આવ્યો છે. ડેવલપર્સ કોઈપણ નાણાકીય નુકસાન માટે જવાબદાર રહેશે નહીં."
    },
    readMore: {
      en: "Read Full Safety Disclaimer",
      hi: "पूरा सुरक्षा अस्वीकरण पढ़ें",
      gu: "સંપૂર્ણ સુરક્ષા અસ્વીકરણ વાંચો"
    },
    showLess: {
      en: "Show Less",
      hi: "कम दिखाएं",
      gu: "ઓછું બતાવો"
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 my-6 animate-fadeIn">
      <div className="rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 p-4 sm:p-5 text-amber-900 dark:text-amber-200 text-xs sm:text-sm shadow-sm transition-all">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1.5">
            <h4 className="font-bold text-amber-950 dark:text-amber-100 flex items-center justify-between">
              <span>{content.title[language] || content.title.en}</span>
            </h4>
            <p className="leading-relaxed font-normal opacity-90">
              {content.shortText[language] || content.shortText.en}
            </p>

            {isExpanded && (
              <div className="pt-3 mt-3 border-t border-amber-200/60 dark:border-amber-800/60 space-y-2 text-xs leading-relaxed animate-fadeIn">
                <p>• {content.bullet1[language] || content.bullet1.en}</p>
                <p className="font-semibold text-rose-700 dark:text-rose-300">• {content.bullet2[language] || content.bullet2.en}</p>
                <p>• {content.bullet3[language] || content.bullet3.en}</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 font-bold text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-white pt-1 transition-colors"
            >
              <span>{isExpanded ? content.showLess[language] : content.readMore[language]}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
