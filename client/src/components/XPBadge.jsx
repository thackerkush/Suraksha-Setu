import React from 'react';
import { Award, Zap, Trophy, Shield } from 'lucide-react';

export default function XPBadge({ xp, language, lastEarned }) {
  // Determine Level and Title based on XP
  const getLevelInfo = (currentXP) => {
    if (currentXP < 100) {
      return {
        level: 1,
        title: { en: "Novice Citizen", hi: "नवसिखिया नागरिक", gu: "નવોદિત નાગરિક" },
        nextXP: 100,
        icon: <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />,
        color: "from-slate-500 to-slate-700",
        badgeBg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
      };
    }
    if (currentXP < 300) {
      return {
        level: 2,
        title: { en: "Cyber Vigilante", hi: "साइबर रक्षक", gu: "સાયબર રક્ષક" },
        nextXP: 300,
        icon: <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
        color: "from-amber-500 to-amber-700",
        badgeBg: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800"
      };
    }
    if (currentXP < 600) {
      return {
        level: 3,
        title: { en: "Scam Defender", hi: "स्कैम योद्धा", gu: "સ્કેમ યોદ્ધા" },
        nextXP: 600,
        icon: <Award className="w-4 h-4 text-trust-600 dark:text-trust-400" />,
        color: "from-trust-600 to-trust-800",
        badgeBg: "bg-trust-100 dark:bg-trust-950/60 text-trust-800 dark:text-trust-300 border-trust-200 dark:border-trust-800"
      };
    }
    return {
      level: 4,
      title: { en: "Suraksha Guardian", hi: "सुरक्षा अभिभावक", gu: "સુરક્ષા વાલી" },
      nextXP: 1000,
      icon: <Trophy className="w-4 h-4 text-yellow-500 dark:text-yellow-400 animate-bounce" />,
      color: "from-yellow-500 to-amber-600",
      badgeBg: "bg-yellow-100 dark:bg-yellow-950/60 text-yellow-900 dark:text-yellow-300 border-yellow-300 dark:border-yellow-800"
    };
  };

  const levelInfo = getLevelInfo(xp);
  const prevThreshold = levelInfo.level === 1 ? 0 : (levelInfo.level === 2 ? 100 : (levelInfo.level === 3 ? 300 : 600));
  const progressPercent = Math.min(100, Math.max(0, ((xp - prevThreshold) / (levelInfo.nextXP - prevThreshold)) * 100));

  const labels = {
    lvl: { en: "Lvl", hi: "स्तर", gu: "સ્તર" },
    xp: { en: "XP", hi: "अंक", gu: "પોઈન્ટ" }
  };

  return (
    <div className="relative inline-flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 rounded-2xl px-3 py-1.5 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Animated Floating XP Toast */}
      {lastEarned && (
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-amber-400 dark:text-slate-900 font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-lg whitespace-nowrap animate-bounce flex items-center gap-1 z-50">
          <Zap className="w-3 h-3 text-amber-400 dark:text-amber-600" />
          <span>+{lastEarned.amount} XP: {lastEarned.reason}</span>
        </div>
      )}

      {/* Level Icon & Title Badge */}
      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-xl border text-xs font-bold ${levelInfo.badgeBg}`}>
        {levelInfo.icon}
        <span className="hidden sm:inline">{levelInfo.title[language] || levelInfo.title.en}</span>
        <span className="sm:hidden">{labels.lvl[language]} {levelInfo.level}</span>
      </div>

      {/* XP Bar & Count */}
      <div className="flex flex-col min-w-[70px] sm:min-w-[90px]">
        <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-600 dark:text-slate-300 leading-none mb-1">
          <span>{xp} <span className="font-normal text-slate-400 dark:text-slate-500">{labels.xp[language]}</span></span>
          <span className="text-slate-400 dark:text-slate-500">{levelInfo.nextXP}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-600">
          <div 
            className={`h-full bg-gradient-to-r ${levelInfo.color} transition-all duration-500 rounded-full`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
