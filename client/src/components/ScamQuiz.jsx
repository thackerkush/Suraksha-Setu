import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, HelpCircle, Trophy, ArrowRight, RefreshCw, Sparkles, CheckCircle2, XCircle, Volume2, VolumeX } from 'lucide-react';

export default function ScamQuiz({ language, onEarnXP }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // 'scam' | 'safe'
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const scenarios = [
    {
      id: "quiz-1",
      text: "Congratulations! You have won Rs 25,000 cashback from PhonePe. Please enter your UPI PIN on the collect request to transfer money into your SBI account immediately.",
      answer: "scam",
      category: "Fake UPI Collect Request",
      explanation: {
        en: "UPI PIN is ONLY required to SEND money, never to RECEIVE money or cashback. Anyone asking for your PIN to give you money is a scammer.",
        hi: "UPI पिन की आवश्यकता केवल पैसे भेजने के लिए होती है, पैसे या कैशबैक प्राप्त करने के लिए कभी नहीं।",
        gu: "UPI PIN માત્ર પૈસા મોકલવા માટે જ જરૂરી છે, પૈસા કે કેશબેક મેળવવા માટે ક્યારેય નહીં."
      }
    },
    {
      id: "quiz-2",
      text: "Dear SBI Customer, your PAN card is not linked with your account. Your NetBanking will be blocked today at 11 PM. Click here to update KYC: http://sbi-kyc-net.in",
      answer: "scam",
      category: "Bank KYC Phishing Link",
      explanation: {
        en: "Banks never threaten instant account blocking over SMS or send short unofficial links (like sbi-kyc-net.in). Always use the official banking app.",
        hi: "बैंक कभी भी एसएमएस पर तुरंत खाता ब्लॉक करने की धमकी नहीं देते या अनौपचारिक लिंक नहीं भेजते हैं।",
        gu: "બેંકો ક્યારેય SMS પર ખાતું બ્લોક કરવાની ધમકી આપતી નથી અથવા બિનસત્તાવાર લિંક્સ મોકલતી નથી."
      }
    },
    {
      id: "quiz-3",
      text: "Dear Customer, Your A/c XX8921 has been credited with Rs 35,000.00 on 05-Jul-26 by NEFT-INDB0000001-SALARY. Total Bal: Rs 54,210.00. - HDFC Bank",
      answer: "safe",
      category: "Legitimate Bank Credit Alert",
      explanation: {
        en: "This is a standard bank credit notification showing NEFT salary deposit. It contains NO links, NO threats, and does NOT ask for OTPs or PINs.",
        hi: "यह एक सामान्य बैंक क्रेडिट सूचना है जिसमें कोई लिंक, धमकी या ओटीपी/पिन की मांग नहीं है।",
        gu: "આ એક સામાન્ય બેંક જમા સૂચના છે જેમાં કોઈ લિંક, ધમકી કે OTP/PIN ની માંગ નથી."
      }
    },
    {
      id: "quiz-4",
      text: "URGENT from Electricity Dept: Your power supply will be disconnected tonight at 9:30 PM due to unpaid bill. Call officer Ramesh immediately at 9876543210 to pay.",
      answer: "scam",
      category: "Electricity Bill Disconnection Scam",
      explanation: {
        en: "Government electricity boards never send personal mobile numbers asking for immediate payment to prevent disconnection.",
        hi: "सरकारी बिजली विभाग कभी भी व्यक्तिगत मोबाइल नंबर भेजकर तुरंत भुगतान की मांग नहीं करता।",
        gu: "સરકારી વીજળી વિભાગ ક્યારેય વ્યક્તિગત મોબાઈલ નંબર મોકલીને તાત્કાલિક ચૂકવણીની માંગ કરતો નથી."
      }
    },
    {
      id: "quiz-5",
      text: "Indane Gas: Your LPG refill cylinder booking ID #8812 is out for delivery today. Please share OTP 4819 with the delivery executive upon receiving the cylinder.",
      answer: "safe",
      category: "Legitimate Delivery Notification",
      explanation: {
        en: "Sharing a delivery confirmation OTP with an official executive standing at your door when receiving a physical parcel/cylinder is standard and safe.",
        hi: "समान या सिलेंडर प्राप्त करते समय दरवाजे पर खड़े आधिकारिक कर्मचारी के साथ डिलीवरी ओटीपी साझा करना सुरक्षित है।",
        gu: "સામાન કે સિલિન્ડર મેળવતી વખતે દરવાજે ઉભેલા સત્તાવાર કર્મચારી સાથે ડિલિવરી OTP શેર કરવો સુરક્ષિત છે."
      }
    },
    {
      id: "quiz-6",
      text: "Cyber Crime Police HQ: You are under Digital Arrest! Your Aadhaar card was used in illegal money laundering. Transfer Rs 1 Lakh for RBI verification immediately.",
      answer: "scam",
      category: "Digital Arrest / Police Impersonation",
      explanation: {
        en: "There is NO concept of 'Digital Arrest' in Indian law. Police, CBI, or RBI officials will NEVER call on WhatsApp or ask for money transfer for verification.",
        hi: "भारतीय कानून में 'डिजिटल अरेस्ट' जैसा कुछ नहीं है। पुलिस या सीबीआई कभी भी फोन पर पैसे नहीं मांगती।",
        gu: "ભારતીય કાયદામાં 'ડિજિટલ અરેસ્ટ' જેવું કંઈ નથી. પોલીસ કે CBI ક્યારેય ફોન પર પૈસા માંગતી નથી."
      }
    },
    {
      id: "quiz-7",
      text: "Telegram Part-Time Work: Earn Rs 3,000 to Rs 8,000 daily simply by liking YouTube videos and giving Google reviews. Contact our HR manager on Telegram now!",
      answer: "scam",
      category: "Telegram Job / Rating Ponzi Scheme",
      explanation: {
        en: "Scammers lure victims with easy money for liking videos, then later trap them into paying 'prepaid investment fees' or 'taxes' to withdraw earnings.",
        hi: "स्कैमर्स वीडियो लाइक करने के आसान पैसे का लालच देते हैं और बाद में पैसे निकालने के लिए 'निवेश शुल्क' मांगते हैं।",
        gu: "સ્કેમર્સ વિડિયો લાઈક કરવાના સરળ પૈસાની લાલચ આપે છે અને પછી પૈસા ઉપાડવા માટે 'રોકાણ ફી' માંગે છે."
      }
    },
    {
      id: "quiz-8",
      text: "Dear SBI Customer, your OTP for online debit card transaction of Rs 49,999 is 819283. Do not share this OTP with anyone. If not done by you, call customer care.",
      answer: "safe",
      category: "Legitimate Bank Security Alert",
      explanation: {
        en: "This is a genuine bank security warning alerting you about an OTP generated. As long as you follow the advice and DO NOT share the OTP, your money is safe.",
        hi: "यह एक असली बैंक सुरक्षा चेतावनी है। जब तक आप किसी के साथ अपना ओटीपी साझा नहीं करते, आपका पैसा सुरक्षित है।",
        gu: "આ એક અસલી બેંક સુરક્ષા ચેતવણી છે. જ્યાં સુધી તમે કોઈની સાથે તમારો OTP શેર નથી કરતા, ત્યાં સુધી તમારા પૈસા સુરક્ષિત છે."
      }
    }
  ];

  const currentScenario = scenarios[currentIndex];

  const handleAnswer = (choice) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(choice);
    const correct = choice === currentScenario.answer;
    setIsCorrect(correct);
    setAnsweredCount(prev => prev + 1);

    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      if (onEarnXP) onEarnXP(100, "Quiz Spot-On!");
    } else {
      setStreak(0);
      if (onEarnXP) onEarnXP(25, "Quiz Learning Bonus");
    }
  };

  const handleNext = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => (prev + 1) % scenarios.length);
  };

  const handleReadScenario = () => {
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
    const utterance = new SpeechSynthesisUtterance(currentScenario.text);
    utterance.lang = language === 'hi' ? 'hi-IN' : (language === 'gu' ? 'gu-IN' : 'en-IN');
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleRestart = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setAnsweredCount(0);
  };

  const labels = {
    title: {
      en: "Scam Spot Quiz Arena — Practice & Earn XP",
      hi: "स्कैम पहचानें (Quiz Arena) — अभ्यास करें और अंक कमाएं",
      gu: "સ્કેમ ઓળખો (Quiz Arena) — પ્રેક્ટિસ કરો અને પોઈન્ટ મેળવો"
    },
    subtitle: {
      en: "Test your skills against real Indian fraud scenarios. Earn +100 XP for correct detections!",
      hi: "असली भारतीय स्कैम परिदृश्यों के खिलाफ अपने कौशल का परीक्षण करें। सही पहचान पर +100 अंक कमाएं!",
      gu: "અસલી ભારતીય સ્કેમ દૃશ્યો સામે તમારી કુશળતાનું પરીક્ષણ કરો. સાચી ઓળખ પર +100 પોઈન્ટ મેળવો!"
    },
    question: {
      en: "Is this message Safe or a Scam?",
      hi: "क्या यह संदेश सुरक्षित है या एक स्कैम (धोखाधड़ी)?",
      gu: "શું આ સંદેશ સુરક્ષિત છે કે સ્કેમ (છેતરપિંડી)?"
    },
    btnScam: {
      en: "🚨 It's a Scam / Fraud",
      hi: "🚨 यह एक स्कैम (धोखा) है",
      gu: "🚨 આ એક સ્કેમ (છેતરપિંડી) છે"
    },
    btnSafe: {
      en: "✅ It's Safe / Legitimate",
      hi: "✅ यह सुरक्षित / असली है",
      gu: "✅ આ સુરક્ષિત / અસલી છે"
    },
    correctMsg: {
      en: "🎉 Spot On! You correctly identified this!",
      hi: "🎉 बिल्कुल सही! आपने सही पहचाना!",
      gu: "🎉 બિલકુલ સાચું! તમે સાચું ઓળખ્યું!"
    },
    wrongMsg: {
      en: "💡 Not quite, but great learning opportunity!",
      hi: "💡 कोई बात नहीं, यह सीखने का अच्छा मौका है!",
      gu: "💡 કોઈ વાંધો નહીં, આ શીખવાની સારી તક છે!"
    },
    nextBtn: {
      en: "Next Scenario",
      hi: "अगला सवाल",
      gu: "આગળનો પ્રશ્ન"
    },
    scoreLabel: {
      en: "Score:",
      hi: "स्कोर:",
      gu: "સ્કોર:"
    },
    streakLabel: {
      en: "Streak:",
      hi: "लगातार सही:",
      gu: "સતત સાચા:"
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-4 pb-12 animate-fadeIn">
      {/* Quiz Header & Stats */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 mb-6 transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-trust-700 dark:text-trust-300 font-extrabold text-lg sm:text-xl mb-1">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>{labels.title[language] || labels.title.en}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {labels.subtitle[language] || labels.subtitle.en}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 shadow-inner">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 dark:text-slate-500">{labels.scoreLabel[language] || "Score:"}</span>
              <span className="text-trust-600 dark:text-trust-400 font-extrabold text-base">{score} / {answeredCount}</span>
            </div>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <span>🔥 {labels.streakLabel[language] || "Streak:"}</span>
              <span className="font-extrabold">{streak}</span>
            </div>
          </div>
        </div>

        {/* Scenario Card */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            <div className="flex items-center gap-3">
              <span>Scenario #{currentIndex + 1} of {scenarios.length}</span>
              <button
                type="button"
                onClick={handleReadScenario}
                className="inline-flex items-center gap-1 text-trust-600 dark:text-trust-400 hover:text-trust-800 dark:hover:text-trust-300 font-bold bg-trust-50 dark:bg-trust-900/40 px-2.5 py-1 rounded-lg border border-trust-200 dark:border-trust-800 transition-all"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 animate-bounce" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{isSpeaking ? "Stop" : "🔊 Listen"}</span>
              </button>
            </div>
            <span className="text-trust-600 dark:text-trust-400 font-bold">{currentScenario.category}</span>
          </div>

          <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-base sm:text-lg font-medium leading-relaxed shadow-sm">
            "{currentScenario.text}"
          </div>

          {/* Question & Answer Buttons */}
          <div className="mt-8 space-y-4">
            <h3 className="text-center font-bold text-slate-800 dark:text-slate-100 text-base sm:text-lg flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-trust-600 dark:text-trust-400" />
              <span>{labels.question[language] || labels.question.en}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer('scam')}
                className={`p-4 rounded-xl font-bold text-sm sm:text-base border-2 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm ${
                  selectedAnswer === null
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md'
                    : selectedAnswer === 'scam' && isCorrect
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md scale-[1.02]'
                    : selectedAnswer === 'scam' && !isCorrect
                    ? 'bg-rose-600 border-rose-600 text-white opacity-80'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 opacity-50'
                }`}
              >
                <span>{labels.btnScam[language] || labels.btnScam.en}</span>
              </button>

              <button
                type="button"
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer('safe')}
                className={`p-4 rounded-xl font-bold text-sm sm:text-base border-2 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm ${
                  selectedAnswer === null
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md'
                    : selectedAnswer === 'safe' && isCorrect
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md scale-[1.02]'
                    : selectedAnswer === 'safe' && !isCorrect
                    ? 'bg-rose-600 border-rose-600 text-white opacity-80'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 opacity-50'
                }`}
              >
                <span>{labels.btnSafe[language] || labels.btnSafe.en}</span>
              </button>
            </div>
          </div>

          {/* Feedback & Explanation Banner */}
          {selectedAnswer !== null && (
            <div className={`mt-8 p-5 rounded-xl border-2 animate-fadeIn transition-all ${
              isCorrect
                ? 'bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                : 'bg-amber-50/90 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-base">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span>{labels.correctMsg[language] || labels.correctMsg.en}</span>
                        <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs">+100 XP</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        <span>{labels.wrongMsg[language] || labels.wrongMsg.en}</span>
                        <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs">+25 XP</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-normal opacity-90 pt-1">
                    {currentScenario.explanation[language] || currentScenario.explanation.en}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-shrink-0 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <span>{labels.nextBtn[language] || labels.nextBtn.en}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
