'use client'

import React, { useState, useEffect } from 'react';
import { FiBell, FiSearch, FiSettings, FiMaximize, FiGrid, FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="h-20 glass-header px-6 md:px-8 flex justify-between items-center sticky top-0 z-40 transition-all duration-500">
      <div className="flex-1 flex items-center">
        <div className="relative group max-w-md w-full hidden sm:block">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search operational clusters..." 
            className="w-full bg-slate-50 dark:bg-white/40 border border-blue-500/10 rounded-2xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition-all text-xs outline-none font-black uppercase tracking-widest text-slate-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleTheme}
          className="p-3 hover:bg-blue-50 rounded-2xl text-slate-500 transition-all shadow-sm border border-blue-500/10"
          title="Toggle Phase"
        >
          {isDark ? <FiSun size={20} className="text-amber-500 animate-pulse" /> : <FiMoon size={20} className="text-blue-600" />}
        </button>

        <div className="flex items-center gap-1 md:gap-2 pr-2 md:pr-4 border-r border-slate-200 dark:border-slate-300 mr-1 md:mr-2 md:flex hidden">
          {[FiMaximize, FiGrid, FiSettings].map((Icon, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1, translateY: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 hover:bg-blue-50 rounded-2xl text-slate-500 transition-all border border-transparent hover:border-blue-500/10 shadow-sm"
            >
              <Icon size={18} />
            </motion.button>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-3 hover:bg-blue-50 rounded-2xl text-slate-500 transition-colors shadow-sm border border-blue-500/10"
        >
          <FiBell size={20} />
          <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-blue-600 rounded-full border-2 border-white animate-pulse" />
        </motion.button>

        <div className="flex items-center gap-4 pl-2">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-black leading-tight tracking-tighter text-slate-900 uppercase italic">Arjun Sharma</p>
            <p className="text-[9px] text-blue-600 font-black tracking-widest uppercase mt-0.5 opacity-80">Operation Head</p>
          </div>
          <div className="w-12 h-12 rounded-[20px] bg-gradient-to-tr from-blue-700 to-blue-500 border-4 border-white shadow-2xl flex items-center justify-center font-black text-white text-sm ring-1 ring-blue-100">
            AS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
