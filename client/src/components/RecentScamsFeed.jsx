import React, { useState, useEffect } from 'react';
import { Radio, RefreshCw, CheckCircle2, ShieldAlert, PlusCircle, X, Check, Filter } from 'lucide-react';

export default function RecentScamsFeed({ language, onEarnXP }) {
  const [scams, setScams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New report form state
  const [reportCategory, setReportCategory] = useState('UPI Fraud');
  const [reportSnippet, setReportSnippet] = useState('');
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const fetchRecentScams = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/recent-scams');
      if (!response.ok) {
        throw new Error(`Server status: ${response.status}`);
      }
      const data = await response.json();
      setScams(data);
    } catch (err) {
      console.error("Failed to fetch recent scams:", err);
      setError("Unable to load community feed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentScams();
  }, []);

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportSnippet.trim() || reportSubmitting) return;

    setReportSubmitting(true);
    try {
      const response = await fetch('/api/report-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: reportCategory,
          snippet: reportSnippet.trim()
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      setReportSuccess(true);
      if (onEarnXP) onEarnXP(150, "Watchdog Scam Reported!");
      
      setTimeout(() => {
        setReportSuccess(false);
        setIsModalOpen(false);
        setReportSnippet('');
        fetchRecentScams();
      }, 2000);
    } catch (err) {
      console.error("Report error:", err);
      alert("Could not submit report. Please try again.");
    } finally {
      setReportSubmitting(false);
    }
  };

  const categories = ['ALL', 'UPI Fraud', 'Phishing Link', 'Digital Arrest', 'Lottery Scam', 'Predatory Loan'];

  const filteredScams = selectedCategory === 'ALL' 
    ? scams 
    : scams.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(s.category.toLowerCase()));

  const labels = {
    title: {
      en: "Live Community Scam Watchdog Feed",
      hi: "लाइव कम्युनिटी स्कैम अलर्ट (चौकसी फ़ीड)",
      gu: "લાઈવ કમ્યુનિટી સ્કેમ ચેતવણી (ચોક્સી ફીડ)"
    },
    subtitle: {
      en: "Anonymized real-time scam patterns reported or detected across rural & digital India.",
      hi: "ग्रामीण भारत भर में रिपोर्ट किए गए और पकड़े गए असली स्कैम संदेशों की लाइव झलक।",
      gu: "ગ્રામીણ ભારતભરમાં નોંધાયેલા અને પકડાયેલા અસલી સ્કેમ સંદેશાઓની લાઈવ ઝલક."
    },
    reportBtn: {
      en: "+ Report New Scam (Earn 150 XP)",
      hi: "+ नया स्कैम रिपोर्ट करें (+150 अंक)",
      gu: "+ નવો સ્કેમ રિપોર્ટ કરો (+150 પોઈન્ટ)"
    },
    refreshBtn: {
      en: "Refresh Feed",
      hi: "ताज़ा करें",
      gu: "રિફ્રેશ કરો"
    },
    noData: {
      en: "No recent alerts reported in this category yet.",
      hi: "इस श्रेणी में अभी कोई अलर्ट नहीं है।",
      gu: "આ શ્રેણીમાં હજુ કોઈ ચેતવણી નથી."
    },
    modalTitle: {
      en: "Report a New Scam Pattern to Protect India",
      hi: "भारत को सुरक्षित रखने के लिए नया स्कैम रिपोर्ट करें",
      gu: "ભારતને સુરક્ષિત રાખવા માટે નવો સ્કેમ રિપોર્ટ કરો"
    },
    modalDesc: {
      en: "Your anonymous submission helps train our AI and warns thousands of rural banking users instantly.",
      hi: "आपकी बिना नाम की रिपोर्ट हमारे एआई को सिखाती है और हजारों ग्रामीण उपयोगकर्ताओं को तुरंत चेतावनी देती है।",
      gu: "તમારો અનામી રિપોર્ટ અમારા AI ને શીખવે છે અને હજારો ગ્રામીણ વપરાશકર્તાઓને તુરંત ચેતવણી આપે છે."
    },
    catLabel: {
      en: "Scam Category:",
      hi: "स्कैम की श्रेणी:",
      gu: "સ્કેમની શ્રેણી:"
    },
    snippetLabel: {
      en: "Suspicious Message Snippet / Caller Claim:",
      hi: "संदिग्ध संदेश या कॉल करने वाले का दावा:",
      gu: "શંકાસ્પદ સંદેશ કે કૉલ કરનારનો દાવો:"
    },
    snippetPlaceholder: {
      en: "e.g., Received SMS claiming SBI account blocked, asked to click sbi-kyc.in...",
      hi: "उदाहरण: एसबीआई खाता ब्लॉक होने का संदेश आया और लिंक पर क्लिक करने को कहा...",
      gu: "ઉદાહરણ: SBI ખાતું બ્લોક થવાનો સંદેશ આવ્યો અને લિંક પર ક્લિક કરવાનું કહ્યું..."
    },
    submitBtn: {
      en: "Submit Watchdog Report (+150 XP)",
      hi: "रिपोर्ट सबमिट करें (+150 अंक)",
      gu: "રિપોર્ટ સબમિટ કરો (+150 પોઈન્ટ)"
    },
    submittingBtn: {
      en: "Submitting to Watchdog...",
      hi: "सबमिट किया जा रहा है...",
      gu: "સબમિટ થઈ રહ્યું છે..."
    },
    successMsg: {
      en: "🎉 Thank you! Your report is live on the Community Feed!",
      hi: "🎉 धन्यवाद! आपकी रिपोर्ट कम्युनिटी फ़ीड पर लाइव है!",
      gu: "🎉 આભાર! તમારો રિપોર્ટ કમ્યુનિટી ફીડ પર લાઈવ છે!"
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-8 pb-12 animate-fadeIn">
      {/* Feed Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-400 font-extrabold text-lg sm:text-xl mb-1">
              <Radio className="w-5 h-5 animate-pulse" />
              <span>{labels.title[language] || labels.title.en}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {labels.subtitle[language] || labels.subtitle.en}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{labels.reportBtn[language] || labels.reportBtn.en}</span>
            </button>

            <button
              type="button"
              onClick={fetchRecentScams}
              disabled={loading}
              title={labels.refreshBtn[language]}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 flex-shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Feed List */}
        <div className="mt-2 space-y-3">
          {loading ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm flex flex-col items-center justify-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-trust-600 dark:text-trust-400" />
              <span>Loading community watchdog alerts...</span>
            </div>
          ) : error ? (
            <div className="py-8 text-center text-rose-500 text-sm font-semibold">
              {error}
            </div>
          ) : filteredScams.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
              {labels.noData[language] || labels.noData.en}
            </div>
          ) : (
            filteredScams.map((scam, index) => (
              <div
                key={index}
                className="p-4 sm:p-5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                      scam.verdict === 'SCAM' 
                        ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800' 
                        : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    }`}>
                      {scam.verdict}
                    </span>
                    <span className="text-xs font-bold text-trust-700 dark:text-trust-400 bg-trust-50 dark:bg-trust-950/40 px-2 py-0.5 rounded-md border border-trust-200 dark:border-trust-800">
                      {scam.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug line-clamp-2">
                    "{scam.snippet}"
                  </p>
                </div>

                <div className="text-right flex-shrink-0 w-full sm:w-auto flex sm:flex-col justify-between sm:justify-end items-center sm:items-end pt-2 sm:pt-0 border-t sm:border-0 border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                    {scam.timestamp || "Just now"}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Pattern</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Reporting Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-800">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Community Watchdog Report</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {labels.modalTitle[language] || labels.modalTitle.en}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {labels.modalDesc[language] || labels.modalDesc.en}
              </p>
            </div>

            {reportSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-center space-y-2 animate-fadeIn">
                <Check className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto animate-bounce" />
                <p className="font-bold text-base">{labels.successMsg[language] || labels.successMsg.en}</p>
                <p className="text-xs opacity-75">+150 XP Added to your profile!</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    {labels.catLabel[language] || labels.catLabel.en}
                  </label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm focus:outline-none focus:border-trust-600 dark:focus:border-trust-400"
                  >
                    <option value="UPI Fraud">UPI Fraud / Collect Request</option>
                    <option value="Phishing Link">Phishing Link / KYC Threat</option>
                    <option value="Digital Arrest">Digital Arrest / Police Threat</option>
                    <option value="Lottery Scam">Lottery / WhatsApp Prize Scam</option>
                    <option value="Predatory Loan">Predatory Instant Loan App</option>
                    <option value="Other Financial Scam">Other Financial Scam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    {labels.snippetLabel[language] || labels.snippetLabel.en}
                  </label>
                  <textarea
                    value={reportSnippet}
                    onChange={(e) => setReportSnippet(e.target.value)}
                    placeholder={labels.snippetPlaceholder[language] || labels.snippetPlaceholder.en}
                    rows={4}
                    required
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:border-trust-600 dark:focus:border-trust-400 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={reportSubmitting || !reportSnippet.trim()}
                    className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {reportSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{labels.submittingBtn[language] || labels.submittingBtn.en}</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4" />
                        <span>{labels.submitBtn[language] || labels.submitBtn.en}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
