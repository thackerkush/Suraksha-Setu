import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function Disclaimer({ language }) {
  const texts = {
    en: "Disclaimer: This AI tool assists your judgment and financial safety. It does not guarantee detection of 100% of scams and is not a substitute for reporting to official police authorities. If you are a victim of cyber fraud, immediately dial 1930 or report at cybercrime.gov.in.",
    hi: "अस्वीकरण: यह एआई टूल आपके निर्णय और वित्तीय सुरक्षा में सहायता करता है। यह 100% घोटालों का पता लगाने की गारंटी नहीं देता है और आधिकारिक पुलिस या बैंक रिपोर्टिंग का विकल्प नहीं है। यदि आप साइबर धोखाधड़ी के शिकार हुए हैं, तो तुरंत 1930 डायल करें या cybercrime.gov.in पर रिपोर्ट करें।",
    gu: "અસ્વીકરણ: આ AI સાધન તમારા નિર્ણય અને નાણાકીય સુરક્ષામાં મદદ કરે છે. તે 100% કૌભાંડો શોધવાની ખાતરી આપતું નથી અને સત્તાવાર પોલીસ અથવા બેંક રિપોર્ટિંગનો વિકલ્પ નથી. જો તમે સાયબર છેતરપિંડીનો ભોગ બન્યા છો, તો તરત જ 1930 ડાયલ કરો અથવા cybercrime.gov.in પર જાણ કરો."
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-8 p-4 bg-amber-50/80 border border-amber-200/60 rounded-xl flex items-start gap-3 text-amber-900 shadow-sm">
      <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <p className="text-xs sm:text-sm leading-relaxed font-normal">
        {texts[language] || texts.en}
      </p>
    </div>
  );
}
