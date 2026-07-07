import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ResultCard from './components/ResultCard';
import LanguageSelector from './components/LanguageSelector';
import Disclaimer from './components/Disclaimer';
import { ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');

  const handleAnalyze = async (textToAnalyze) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToAnalyze }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Server returned status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Unable to connect to the analysis server. Please check if your backend is running or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 font-sans selection:bg-trust-100 selection:text-trust-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div 
            onClick={handleReset}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-trust-600 to-trust-800 text-white flex items-center justify-center shadow-md shadow-trust-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                Suraksha Setu
              </span>
              <span className="text-xs font-semibold text-trust-600 block sm:inline sm:ml-1.5">
                (सुरक्षा सेतु)
              </span>
            </div>
          </div>

          <LanguageSelector 
            currentLang={language} 
            onLanguageChange={setLanguage} 
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col justify-center">
        {error && (
          <div className="max-w-2xl mx-auto mt-6 px-4">
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3 shadow-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <div>
                <span className="font-bold block">Connection Error</span>
                <span>{error}</span>
              </div>
            </div>
          </div>
        )}

        {!result ? (
          <LandingPage 
            onAnalyze={handleAnalyze} 
            loading={loading} 
            language={language} 
          />
        ) : (
          <ResultCard 
            result={result} 
            onReset={handleReset} 
            language={language} 
          />
        )}

        <Disclaimer language={language} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Built for the <strong>Maverick Effect AI Challenge 2026</strong></span>
          <span className="text-slate-400">Zero-Budget Architecture • Powered by Google Gemini AI</span>
        </div>
      </footer>
    </div>
  );
}
