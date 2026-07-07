import React from 'react';
import { ShieldCheck, Sparkles, Heart, Cpu, Lock, Users, PhoneCall, Award, CheckCircle2, Globe } from 'lucide-react';

export default function AboutSection({ language }) {
  const content = {
    badge: {
      en: "Built for Maverick Effect AI Challenge 2026",
      hi: "मैवरिक इफेक्ट एआई चैलेंज 2026 के लिए निर्मित",
      gu: "મેવરિક ઇફેક્ટ AI ચેલેન્જ 2026 માટે બનાવેલ"
    },
    title: {
      en: "Bridging Digital Safety for Rural & First-Time Banking Users",
      hi: "ग्रामीण और नए डिजिटल बैंकिंग उपयोगकर्ताओं के लिए सुरक्षा का पुल",
      gu: "ગ્રામીણ અને નવા ડિજિટલ બેંકિંગ વપરાશકર્તાઓ માટે સુરક્ષાનો પુલ"
    },
    subtitle: {
      en: "Suraksha Setu (सुरक्षा सेतु) translates complex cybercrime threats into simple, reassuring plain-language guidance across India.",
      hi: "सुरक्षा सेतु जटिल साइबर अपराध खतरों को भारत भर में सरल और स्पष्ट भाषा में समझाता है।",
      gu: "સુરક્ષા સેતુ જટિલ સાયબર ક્રાઈમના જોખમોને ભારતભરમાં સરળ અને સ્પષ્ટ ભાષામાં સમજાવે છે."
    },
    missionTitle: {
      en: "🎯 Our Social Impact Mission",
      hi: "🎯 हमारा सामाजिक प्रभाव और उद्देश्य",
      gu: "🎯 અમારું સામાજિક પ્રભાવ અને ઉદ્દેશ્ય"
    },
    missionDesc: {
      en: "With over 300 million+ rural and elderly citizens adopting digital banking (UPI, Jan Dhan accounts), cyber scammers have shifted from technical hacking to psychological manipulation—targeting language barriers, authority fear (Digital Arrest), and financial urgency (Predatory Loan Apps). Suraksha Setu acts as an instant AI financial guardian, empowering every citizen to verify suspicious SMS, WhatsApp messages, or calls before losing their hard-earned savings.",
      hi: "30 करोड़ से अधिक ग्रामीण और बुजुर्ग नागरिकों द्वारा डिजिटल बैंकिंग (यूपीआई, जन धन खाते) अपनाने के साथ, साइबर ठगों ने अब भाषा की बाधाओं और डर (जैसे 'डिजिटल अरेस्ट') का फायदा उठाना शुरू कर दिया है। सुरक्षा सेतु एक त्वरित एआई वित्तीय रक्षक के रूप में कार्य करता है, जो हर नागरिक को पैसे खोने से पहले किसी भी संदिग्ध संदेश या कॉल की जांच करने की शक्ति देता है।",
      gu: "30 કરોડથી વધુ ગ્રામીણ અને વડીલ નાગરિકો દ્વારા ડિજિટલ બેંકિંગ (UPI, જન ધન ખાતા) અપનાવવાની સાથે, સાયબર ઠગોએ હવે ભાષાના અવરોધો અને ડર (જેમ કે 'ડિજિટલ અરેસ્ટ') નો ફાયદો ઉઠાવવાનું શરૂ કર્યું છે. સુરક્ષા સેતુ એક ત્વરિત AI નાણાકીય રક્ષક તરીકે કાર્ય કરે છે, જે દરેક નાગરિકને પૈસા ગુમાવતા પહેલા કોઈપણ શંકાસ્પદ સંદેશ કે કૉલની તપાસ કરવાની શક્તિ આપે છે."
    },
    techTitle: {
      en: "⚡ Zero-Budget AI Architecture",
      hi: "⚡ जीरो-बजट एआई तकनीक",
      gu: "⚡ ઝીરો-બજેટ AI ટેકનોલોજી"
    },
    techDesc: {
      en: "Engineered specifically for grassroots deployment, our system operates on a strict zero-budget architecture using React, Vite, and Python FastAPI. Powered by Google Gemini 2.5 Flash with strict Pydantic JSON schema validation, it includes a 0ms offline fallback mode pre-loaded with curated Indian fraud archetypes to ensure 100% reliability during network outages.",
      hi: "विशेष रूप से जमीनी स्तर के लिए तैयार किया गया हमारा सिस्टम रियाक्ट (React) और पायथन फास्टएपीआई (FastAPI) का उपयोग करके जीरो-बजट आर्किटेक्चर पर काम करता है। यह गूगल जेमिनी 2.5 फ्लैश (Google Gemini AI) द्वारा संचालित है और इसमें बिना इंटरनेट के भी 0ms में काम करने वाला ऑफलाइन फॉलबैक मोड शामिल है।",
      gu: "ખાસ કરીને પાયાના સ્તરે ઉપયોગ માટે તૈયાર કરાયેલ અમારી સિસ્ટમ React અને Python FastAPI નો ઉપયોગ કરીને ઝીરો-બજેટ આર્કિટેક્ચર પર કામ કરે છે. તે Google Gemini 2.5 Flash દ્વારા સંચાલિત છે અને તેમાં ઇન્ટરનેટ વિના પણ 0ms માં કામ કરતો ઑફલાઇન ફૉલબેક મોડ શામેલ છે."
    },
    rulesTitle: {
      en: "🛡️ 4 Golden Rules of Digital Banking Safety",
      hi: "🛡️ डिजिटल बैंकिंग सुरक्षा के 4 सुनहरे नियम",
      gu: "🛡️ ડિજિટલ બેંકિંગ સુરક્ષાના 4 સોનેરી નિયમો"
    },
    rules: [
      {
        title: { en: "1. PIN is ONLY for Sending Money", hi: "1. पिन केवल पैसे भेजने के लिए है", gu: "1. PIN માત્ર પૈસા મોકલવા માટે છે" },
        desc: { en: "Never enter your UPI PIN to receive money, lottery prizes, or cashback. Scammers claiming 'enter PIN to receive Rs 5,000' are stealing from you.", hi: "पैसे, लॉटरी या कैशबैक प्राप्त करने के लिए कभी भी अपना यूपीआई पिन न डालें। पैसे देने के नाम पर पिन मांगने वाले ठग हैं।", gu: "પૈસા, લોટરી કે કેશબેક મેળવવા માટે ક્યારેય તમારો UPI PIN દાખલ ન કરો. પૈસા આપવાના નામે PIN માંગનારા ઠગો છે." }
      },
      {
        title: { en: "2. No 'Digital Arrest' in Indian Law", hi: "2. कानून में कोई 'डिजिटल अरेस्ट' नहीं है", gu: "2. કાયદામાં કોઈ 'ડિજિટલ અરેસ્ટ' નથી" },
        desc: { en: "Police, CBI, Customs, or RBI officers will NEVER call you on WhatsApp video or demand money transfer to avoid arrest.", hi: "पुलिस, सीबीआई या आरबीआई अधिकारी कभी भी व्हाट्सएप पर कॉल करके गिरफ्तारी से बचने के लिए पैसे नहीं मांगते।", gu: "પોલીસ, CBI કે RBI અધિકારીઓ ક્યારેય WhatsApp પર કૉલ કરીને ધરપકડથી બચવા માટે પૈસા માંગતા નથી." }
      },
      {
        title: { en: "3. Avoid Unofficial SMS Links", hi: "3. अनौपचारिक लिंक पर क्लिक न करें", gu: "3. બિનસત્તાવાર લિંક્સ પર ક્લિક ન કરો" },
        desc: { en: "Banks never send short random links (like sbi-kyc-net.in) threatening instant account blocking. Always open your official banking app.", hi: "बैंक कभी भी एसएमएस पर तुरंत खाता ब्लॉक करने की धमकी देकर अनौपचारिक लिंक नहीं भेजते। हमेशा आधिकारिक ऐप खोलें।", gu: "બેંકો ક્યારેય SMS પર ખાતું બ્લોક કરવાની ધમકી આપીને બિનસત્તાવાર લિંક્સ મોકલતી નથી. હંમેશા સત્તાવાર ઍપ ખોલો." }
      },
      {
        title: { en: "4. Call 1930 Immediately if Scammed", hi: "4. ठगी होने पर तुरंत 1930 पर कॉल करें", gu: "4. છેતરપિંડી થાય તો તુરંત 1930 પર કૉલ કરો" },
        desc: { en: "If you lose money to a cyber scam, call the National Cyber Crime Helpline at 1930 within the first hour (Golden Hour) or report at cybercrime.gov.in.", hi: "यदि आपके साथ साइबर ठगी हो जाए, तो पहले घंटे (गोल्डन आवर) के भीतर राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर कॉल करें।", gu: "જો તમારી સાથે સાયબર છેતરપિંડી થાય, તો પ્રથમ કલાક (ગોલ્ડન અવર) ની અંદર રાષ્ટ્રીય સાયબર ક્રાઈમ હેલ્પલાઈન 1930 પર કૉલ કરો." }
      }
    ],
    helplineBox: {
      title: { en: "National Cyber Crime Reporting Helpline", hi: "राष्ट्रीय साइबर अपराध रिपोर्टिंग हेल्पलाइन", gu: "રાષ્ટ્રીય સાયબર ક્રાઈમ રિપોર્ટિંગ હેલ્પલાઈન" },
      number: "1930",
      sub: { en: "Available 24/7 across India • Official Portal: cybercrime.gov.in", hi: "भारत भर में 24/7 उपलब्ध • आधिकारिक पोर्टल: cybercrime.gov.in", gu: "ભારતભરમાં 24/7 ઉપલબ્ધ • સત્તાવાર પોર્ટલ: cybercrime.gov.in" }
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-10 pb-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-trust-100/80 dark:bg-trust-900/40 border border-trust-200 dark:border-trust-800 text-trust-800 dark:text-trust-300 text-xs sm:text-sm font-bold shadow-sm">
          <Award className="w-4 h-4 text-trust-600 dark:text-trust-400" />
          <span>{content.badge[language] || content.badge.en}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {content.title[language] || content.title.en}
        </h1>

        <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {content.subtitle[language] || content.subtitle.en}
        </p>
      </div>

      {/* Grid of 2 Main Mission & Tech Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-trust-500/5 dark:bg-trust-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
          <div className="w-12 h-12 rounded-2xl bg-trust-50 dark:bg-trust-900/50 text-trust-600 dark:text-trust-400 flex items-center justify-center font-bold text-xl shadow-sm">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {content.missionTitle[language] || content.missionTitle.en}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {content.missionDesc[language] || content.missionDesc.en}
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xl shadow-sm">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {content.techTitle[language] || content.techTitle.en}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {content.techDesc[language] || content.techDesc.en}
          </p>
        </div>
      </div>

      {/* 4 Golden Rules Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-700/60 mb-12 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-trust-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight flex items-center justify-center gap-2.5">
            <Lock className="w-6 h-6 text-amber-400" />
            <span>{content.rulesTitle[language] || content.rulesTitle.en}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.rules.map((rule, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 space-y-2"
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm sm:text-base">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{rule.title[language] || rule.title.en}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pl-6">
                {rule.desc[language] || rule.desc.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Cyber Crime Helpline Banner */}
      <div className="bg-gradient-to-r from-rose-600 to-rose-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-rose-500">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
            <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
            <span>Emergency Cyber Help</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-extrabold">
            {content.helplineBox.title[language] || content.helplineBox.title.en}
          </h3>
          <p className="text-xs sm:text-sm text-rose-100">
            {content.helplineBox.sub[language] || content.helplineBox.sub.en}
          </p>
        </div>

        <a 
          href="tel:1930" 
          className="px-8 py-4 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-black text-2xl sm:text-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3 flex-shrink-0"
        >
          <PhoneCall className="w-7 h-7 text-rose-600 animate-pulse" />
          <span>1930</span>
        </a>
      </div>
    </div>
  );
}
