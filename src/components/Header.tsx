'use client'

import React from 'react';
import { FiBell, FiSearch, FiSettings, FiMaximize, FiGrid, FiGlobe, FiCommand } from 'react-icons/fi';
import { useIndustry } from '@/context/IndustryContext';
import { motion } from 'framer-motion';

const Header = () => {
  const { activeIndustry } = useIndustry();
  return (
    <header className="h-24 px-10 hidden lg:flex justify-between items-center sticky top-0 z-40 bg-white/40 backdrop-blur-xl border-b border-blue-500/5 transition-all duration-300">
      <div className="flex-1 flex items-center gap-8">
        <div className="relative group max-w-md w-full">
          <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-900 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search operational clusters..." 
            className="w-full bg-slate-50 border border-blue-500/5 rounded-[24px] py-3.5 pl-14 pr-16 focus:ring-4 focus:ring-blue-600/5 focus:bg-white transition-all text-sm outline-none font-serif-professional tracking-wide  tracking-widest text-slate-900 shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-400 font-black text-[11px] shadow-sm">
             <FiCommand size={10} /> K
          </div>
        </div>

        <div className="flex items-center gap-3 px-6 py-2.5 bg-blue-50/50 rounded-[24px] border border-blue-100/50 group hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
           <FiGlobe className="text-blue-600 group-hover:text-white animate-spin-slow" size={16} />
           <div className="text-left">
              <p className="text-[11px] font-black text-slate-900 group-hover:text-white uppercase leading-none mb-1 opacity-60">Active Hub</p>
              <p className="text-[12px] font-black text-blue-600 group-hover:text-white uppercase leading-none ">{activeIndustry.name}</p>
           </div>
        </div>
      </div>      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 pr-6 border-r border-slate-100 mr-2">
          {[FiMaximize, FiGrid, FiSettings].map((Icon, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1, translateY: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3.5 hover:bg-white rounded-[24px] text-slate-900 transition-all border border-transparent hover:border-blue-500/10 shadow-sm"
            >
              <Icon size={18} />
            </motion.button>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-3.5 hover:bg-white rounded-[24px] text-slate-900 transition-colors shadow-sm border border-transparent hover:border-blue-500/10"
        >
          <FiBell size={20} />
          <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white animate-pulse" />
        </motion.button>

        <div className="flex items-center gap-4 pl-4">
          <div className="text-right hidden xl:block">
            <p className="text-base font-black leading-tight tracking-tight text-slate-900 uppercase ">Arjun Sharma</p>
            <p className="text-[11px] text-blue-600 font-black tracking-widest uppercase mt-0.5 opacity-60">Global Cluster Lead</p>
          </div>
          <div className="w-12 h-12 rounded-[18px] bg-blue-600 border-4 border-white shadow-xl flex items-center justify-center font-black text-white text-sm ring-1 ring-blue-100 group cursor-pointer hover:rotate-6 transition-transform">
            AS
          </div>
        </div>
      </div>
        </header>
  );
};

export default Header;
