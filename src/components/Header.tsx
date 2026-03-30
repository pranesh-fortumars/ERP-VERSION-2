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
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 md:px-8 flex justify-between items-center sticky top-0 z-40 transition-colors">
      <div className="flex-1 flex items-center">
        <div className="relative group max-w-md w-full hidden sm:block">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search analytics, tasks..." 
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-600/20 focus:bg-white dark:focus:bg-slate-700 transition-all text-sm outline-none font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-all"
          title="Toggle Theme"
        >
          {isDark ? <FiSun size={20} className="text-amber-500" /> : <FiMoon size={20} className="text-blue-600" />}
        </button>

        <div className="flex items-center gap-1 md:gap-2 pr-2 md:pr-4 border-r border-slate-200 dark:border-slate-800 mr-1 md:mr-2 md:flex hidden">
          {[FiMaximize, FiGrid, FiSettings].map((Icon, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-colors"
            >
              <Icon size={18} />
            </motion.button>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-colors"
        >
          <FiBell size={20} />
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
        </motion.button>

        <div className="flex items-center gap-3 pl-1 md:pl-2">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-black leading-tight tracking-tight">Arjun Sharma</p>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">Operation Head</p>
          </div>
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 border-2 border-white dark:border-slate-800 shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center font-black text-white text-sm">
            AS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
