'use client'

import React from 'react';
import { FiBell, FiSearch, FiSettings, FiMaximize, FiGrid } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 flex justify-between items-center sticky top-0 z-40">
      <div className="flex-1 flex items-center">
        <div className="relative group max-w-md w-full hidden lg:block">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search analytics, tasks, or manufacturing data..." 
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-700 transition-all text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-slate-800 mr-2 md:flex hidden">
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
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
        </motion.button>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-tight">Arjun Sharma</p>
            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">Operation Head</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 border-2 border-white dark:border-slate-800 shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center font-bold text-white text-sm">
            AS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
