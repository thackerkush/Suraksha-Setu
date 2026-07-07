import React, { useState } from 'react';
import { ShieldCheck, Search, Gamepad2, Radio, Info, Sun, Moon, Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import XPBadge from './XPBadge';

export default function Navbar({ activeTab, onTabChange, language, onLanguageChange, themeMode, onToggleTheme, xp, lastEarned, onReset }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'detector', label: { en: "AI Detector", hi: "एआई जाँच", gu: "AI તપાસ" }, icon: <Search className="w-4 h-4" /> },
    { id: 'quiz', label: { en: "Scam Quiz (XP)", hi: "स्कैम क्विज़ (XP)", gu: "સ્કેમ ક્વિઝ (XP)" }, icon: <Gamepad2 className="w-4 h-4 text-amber-500 animate-pulse" /> },
    { id: 'feed', label: { en: "Live Feed", hi: "लाइव अलर्ट", gu: "લાઈવ ફીડ" }, icon: <Radio className="w-4 h-4 text-rose-500" /> },
    { id: 'about', label: { en: "About & Mission", hi: "हमारे बारे में", gu: "અમારા વિશે" }, icon: <Info className="w-4 h-4 text-trust-500" /> },
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    if (onReset && tabId === 'detector') onReset();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Logo */}
        <div 
          onClick={() => handleTabClick('detector')}
          className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-trust-600 to-trust-800 text-white flex items-center justify-center shadow-md shadow-trust-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight block leading-none">
              Suraksha Setu
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-trust-600 dark:text-trust-400 block mt-0.5">
              (सुरक्षा सेतु) • AI Fraud Guard
            </span>
          </div>
        </div>

        {/* Desktop Collapsible Navigation Toolbar */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === item.id
                  ? 'bg-white dark:bg-slate-900 text-trust-700 dark:text-trust-300 shadow-sm scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              {item.icon}
              <span>{item.label[language] || item.label.en}</span>
            </button>
          ))}
        </nav>

        {/* Right Side Controls: XP Badge, Theme Toggle, Language, Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <XPBadge xp={xp} language={language} lastEarned={lastEarned} />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            title="Toggle Dark / Light Mode"
            className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 transition-all duration-200 flex items-center justify-center active:scale-95"
          >
            {themeMode === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <div className="hidden sm:block">
            <LanguageSelector 
              currentLang={language} 
              onLanguageChange={onLanguageChange} 
            />
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 p-4 space-y-4 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`p-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border ${
                  activeTab === item.id
                    ? 'bg-trust-50 dark:bg-trust-900/40 text-trust-700 dark:text-trust-300 border-trust-200 dark:border-trust-800 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200/60 dark:border-slate-700'
                }`}
              >
                {item.icon}
                <span>{item.label[language] || item.label.en}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Select Language:</span>
            <LanguageSelector 
              currentLang={language} 
              onLanguageChange={(lang) => { onLanguageChange(lang); setMobileMenuOpen(false); }} 
            />
          </div>
        </div>
      )}
    </header>
  );
}
