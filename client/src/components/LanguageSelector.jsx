import React from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSelector({ currentLang, onLanguageChange }) {
  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  ];

  return (
    <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full p-1.5 shadow-sm transition-all">
      <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400 ml-2" />
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">Language:</span>
      <div className="flex items-center gap-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
              currentLang === lang.code
                ? 'bg-trust-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <span>{lang.native}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
