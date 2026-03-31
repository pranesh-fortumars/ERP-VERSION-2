'use client'

import React from 'react';
import { FiBell, FiSearch, FiSettings, FiMaximize, FiGrid } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="h-24 px-10 hidden lg:flex justify-between items-center sticky top-0 z-40 bg-white/40 backdrop-blur-xl border-b border-blue-500/5 transition-all duration-300">
      <div className="flex-1 flex items-center">
        <div className="relative group max-w-md w-full">
          <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search operational clusters..." 
            className="w-full bg-slate-50 border border-blue-500/5 rounded-2xl py-3.5 pl-14 pr-6 focus:ring-4 focus:ring-blue-600/5 focus:bg-white transition-all text-xs outline-none font-black uppercase tracking-widest text-slate-700 shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 pr-6 border-r border-slate-100 mr-2">
          {[FiMaximize, FiGrid, FiSettings].map((Icon, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1, translateY: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3.5 hover:bg-white rounded-2xl text-slate-500 transition-all border border-transparent hover:border-blue-500/10 shadow-sm"
            >
              <Icon size={18} />
            </motion.button>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-3.5 hover:bg-white rounded-2xl text-slate-500 transition-colors shadow-sm border border-transparent hover:border-blue-500/10"
        >
          <FiBell size={20} />
          <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white animate-pulse" />
        </motion.button>

        <div className="flex items-center gap-4 pl-4">
          <div className="text-right hidden xl:block">
            <p className="text-sm font-black leading-tight tracking-tighter text-slate-900 uppercase italic">Arjun Sharma</p>
            <p className="text-[9px] text-blue-600 font-black tracking-widest uppercase mt-0.5 opacity-60">Global Cluster Lead</p>
          </div>
          <div className="w-12 h-12 rounded-[18px] bg-blue-600 border-4 border-white shadow-xl flex items-center justify-center font-black text-white text-xs ring-1 ring-blue-100 group cursor-pointer hover:rotate-6 transition-transform">
            AS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
