import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ResultCard from './components/ResultCard';
import Disclaimer from './components/Disclaimer';
import RecentScamsFeed from './components/RecentScamsFeed';
import ScamQuiz from './components/ScamQuiz';
import AboutSection from './components/AboutSection';
import Navbar from './components/Navbar';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('detector'); // 'detector' | 'quiz' | 'feed' | 'about'

  // Dark Mode State with localStorage persistence
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem('suraksha_theme');
    return saved || 'light';
  });

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('suraksha_theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Gamification XP State with localStorage persistence and bulletproof NaN protection
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('suraksha_xp');
    const parsed = saved ? parseInt(saved, 10) : 0;
    return Number.isFinite(parsed) && !isNaN(parsed) ? parsed : 0;
  });
  const [lastEarned, setLastEarned] = useState(null);

  const handleEarnXP = (amount, reason) => {
    setXp((prev) => {
      const current = Number.isFinite(prev) && !isNaN(prev) ? prev : 0;
      const nextXP = current + amount;
      localStorage.setItem('suraksha_xp', nextXP.toString());
      return nextXP;
    });
    setLastEarned({ amount, reason });
    setTimeout(() => setLastEarned(null), 3500);
  };

  const handleAnalyze = async (textToAnalyze) => {
    setLoading(true);
    setError('');
    setResult(null);
    setActiveTab('detector');

    handleEarnXP(50, "Message Analyzed");

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
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 font-sans selection:bg-trust-100 dark:selection:bg-trust-900 selection:text-trust-900 dark:selection:text-trust-100 transition-colors duration-300">
      {/* Collapsible Navbar with Theme Toggle & XP Badge */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
        onLanguageChange={setLanguage}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        xp={xp}
        lastEarned={lastEarned}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col justify-center">
        {error && (
          <div className="max-w-2xl mx-auto mt-6 px-4">
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm flex items-center gap-3 shadow-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
              <div>
                <span className="font-bold block">Connection Error</span>
                <span>{error}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' ? (
          <AboutSection language={language} />
        ) : activeTab === 'quiz' ? (
          <ScamQuiz language={language} onEarnXP={handleEarnXP} />
        ) : activeTab === 'feed' ? (
          <RecentScamsFeed language={language} onEarnXP={handleEarnXP} />
        ) : !result ? (
          <>
            <LandingPage 
              onAnalyze={handleAnalyze} 
              loading={loading} 
              language={language} 
              onEarnXP={handleEarnXP}
            />
            <RecentScamsFeed language={language} onEarnXP={handleEarnXP} />
          </>
        ) : (
          <>
            <ResultCard 
              result={result} 
              onReset={handleReset} 
              language={language} 
            />
            <RecentScamsFeed language={language} onEarnXP={handleEarnXP} />
          </>
        )}

        <Disclaimer language={language} />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Built for the <strong className="text-slate-800 dark:text-slate-200">Maverick Effect AI Challenge 2026</strong></span>
          <span className="text-slate-400 dark:text-slate-500">Zero-Budget Architecture • Powered by Google Gemini AI</span>
        </div>
      </footer>
    </div>
  );
}
