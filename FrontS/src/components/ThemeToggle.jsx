import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark' || false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="relative p-2 rounded-xl border border-slate-200 dark:border-zinc-800 
                 bg-white dark:bg-slate-900/50 backdrop-blur-sm
                 hover:bg-slate-50 dark:hover:bg-zinc-800/30 
                 transition-all duration-300"
    >
      <div className="flex items-center justify-center text-slate-500 dark:text-zinc-400">
        {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
      </div>
    </button>
  );
};

export default ThemeToggle;