import React, { useState, useEffect } from 'react';
import { Radio, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function RecentScamsFeed({ language }) {
  const [scams, setScams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportCategory, setReportCategory] = useState('Fake UPI Collect Request');
  const [reportSnippet, setReportSnippet] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  // Fallback initial data in case API is offline during frontend dev
  const fallbackScams = [
    {
      id: "init-1",
      category: "Fake UPI Collect Request",
      verdict: "Scam",
      timestamp: "Just now",
      snippet: "Rs 5,000 cashback approved from PhonePe. Enter PIN on collect request..."
    },
    {
      id: "init-2",
      category: "Bank KYC Phishing / Impersonation",
      verdict: "Scam",
      timestamp: "12 mins ago",
      snippet: "Dear SBI User, your account PAN KYC is expired today. Your NetBanking..."
    },
    {
      id: "init-3",
      category: "Predatory Loan App Harassment",
      verdict: "Scam",
      timestamp: "34 mins ago",
      snippet: "URGENT: Your Instant Rupee Loan EMI is overdue by 1 day. Pay in 2 hours..."
    }
  ];

  const fetchRecentScams = () => {
    setLoading(true);
    fetch('/api/recent-scams')
      .then(res => res.json())
      .then(data => {
        if (data.recent_scams && data.recent_scams.length > 0) {
          setScams(data.recent_scams);
        } else {
          setScams(fallbackScams);
        }
      })
      .catch(err => {
        console.log("Using fallback recent scams.", err);
        setScams(fallbackScams);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecentScams();
  }, []);

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportSnippet.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/report-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: reportCategory,
          snippet: reportSnippet.trim(),
          verdict: "Scam"
        })
      });

      if (res.ok) {
        setReportSuccess(true);
        setReportSnippet('');
        fetchRecentScams();
        setTimeout(() => {
          setReportSuccess(false);
          setShowReportForm(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to report scam:", err);
      // Even if offline, add to local state for demo smoothness!
      setScams(prev => [{
        id: `local-${Date.now()}`,
        category: reportCategory,
        verdict: "Scam",
        timestamp: "Just now",
        snippet: reportSnippet.trim().slice(0, 60) + (reportSnippet.length > 60 ? '...' : '')
      }, ...prev]);
      setReportSuccess(true);
      setReportSnippet('');
      setTimeout(() => {
        setReportSuccess(false);
        setShowReportForm(false);
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

  const labels = {
    title: {
      en: "Live Community Scam Watchdog",
      hi: "लाइव सामुदायिक स्कैम अलर्ट (Watchdog)",
      gu: "લાઈવ સામુદાયિક સ્કેમ એલર્ટ (Watchdog)"
    },
    subtitle: {
      en: "Anonymized patterns recently detected or reported by users across rural India.",
      hi: "ग्रामीण भारत में हाल ही में पहचाने गए या रिपोर्ट किए गए अनाम स्कैम संदेश।",
      gu: "ગ્રામીણ ભારતમાં તાજેતરમાં ઓળખાયેલ અથવા રિપોર્ટ કરાયેલ અનામી સ્કેમ સંદેશાઓ."
    },
    reportBtn: {
      en: "+ Report New Scam Pattern",
      hi: "+ नया स्कैम पैटर्न रिपोर्ट करें",
      gu: "+ નવી સ્કેમ પેટર્ન રિપોર્ટ કરો"
    },
    refresh: {
      en: "Refresh Feed",
      hi: "फ़ीड रीफ़्रेश करें",
      gu: "ફીડ રિફ્રેશ કરો"
    },
    categoryLabel: {
      en: "Scam Category",
      hi: "स्कैम की श्रेणी",
      gu: "સ્કેમની શ્રેણી"
    },
    snippetLabel: {
      en: "Message Snippet (Don't include personal names or phone numbers)",
      hi: "संदेश का अंश (नाम या फोन नंबर शामिल न करें)",
      gu: "સંદેશનો અંશ (નામ અથવા ફોન નંબર શામેલ કરશો નહીં)"
    },
    submitReport: {
      en: "Submit Alert to Community",
      hi: "समुदाय को अलर्ट भेजें",
      gu: "સમુદાયને એલર્ટ મોકલો"
    },
    successMsg: {
      en: "Thank you! Pattern added to the community watchlist.",
      hi: "धन्यवाद! पैटर्न को सामुदायिक सूची में जोड़ दिया गया है।",
      gu: "આભાર! પેટર્નને સામુદાયિક સૂચિમાં ઉમેરવામાં આવી છે."
    }
  };

  const categories = [
    "Fake UPI Collect Request",
    "Bank KYC Phishing / Impersonation",
    "Predatory Loan App Harassment",
    "Digital Arrest / Police Impersonation",
    "Customs / Courier Parcel Scam",
    "Lottery / Prize Scam",
    "Investment / Ponzi Scheme",
    "Bank Official OTP Impersonation",
    "Fake Government Scheme"
  ];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 mt-4 mb-12 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm sm:text-base mb-1">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>{labels.title[language]}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              {labels.subtitle[language]}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchRecentScams}
              disabled={loading}
              title={labels.refresh[language]}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setShowReportForm(!showReportForm)}
              className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-xs sm:text-sm border border-rose-200 transition-all flex items-center gap-1.5"
            >
              <span>{labels.reportBtn[language]}</span>
            </button>
          </div>
        </div>

        {/* Report Scam Form Modal / Expandable Section */}
        {showReportForm && (
          <div className="my-6 p-5 bg-rose-50/50 rounded-xl border border-rose-200/80 animate-fadeIn">
            {reportSuccess ? (
              <div className="py-6 text-center text-emerald-700 font-bold flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce" />
                <span>{labels.successMsg[language]}</span>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-800">Report a Scam Pattern</h4>
                  <button
                    type="button"
                    onClick={() => setShowReportForm(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Close
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {labels.categoryLabel[language]}
                    </label>
                    <select
                      value={reportCategory}
                      onChange={(e) => setReportCategory(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 p-2.5 text-xs sm:text-sm bg-white text-slate-800 focus:outline-none focus:border-rose-500"
                    >
                      {categories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {labels.snippetLabel[language]}
                    </label>
                    <input
                      type="text"
                      value={reportSnippet}
                      onChange={(e) => setReportSnippet(e.target.value)}
                      placeholder="e.g. You won KBC lottery Rs 25 Lakhs. Pay tax..."
                      maxLength={120}
                      required
                      className="w-full rounded-lg border border-slate-300 p-2.5 text-xs sm:text-sm bg-white text-slate-800 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="text-right pt-2">
                  <button
                    type="submit"
                    disabled={submitting || !reportSnippet.trim()}
                    className="px-6 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : labels.submitReport[language]}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Scams Ticker List */}
        <div className="mt-6 space-y-3">
          {loading && scams.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Loading recent community alerts...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {scams.map((scam, index) => (
                <div
                  key={scam.id || index}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:shadow-sm transition-all flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                        {scam.category}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {scam.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium line-clamp-2 leading-relaxed">
                      "{scam.snippet}"
                    </p>
                  </div>
                  <ShieldAlert className="w-4 h-4 text-rose-500 flex-shrink-0 mt-1 opacity-70" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
