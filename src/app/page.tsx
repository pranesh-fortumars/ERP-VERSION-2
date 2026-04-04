'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBox, FiUsers, FiCpu, FiShield, FiTrendingUp, FiActivity, FiServer, FiLayers, FiDatabase } from 'react-icons/fi';
import Link from 'next/link';

const LandingPage = () => {
  const features = [
    { icon: <FiBox className="w-5 h-5 md:w-6 md:h-6" />, title: 'Smart Inventory', desc: 'Real-time SKU tracking with AI-driven reorder alerts across PAN-India nodes.' },
    { icon: <FiUsers className="w-5 h-5 md:w-6 md:h-6" />, title: 'Enterprise CRM', desc: 'B2B contract lifecycle, GSTIN verification, and stakeholder intelligence.' },
    { icon: <FiCpu className="w-5 h-5 md:w-6 md:h-6" />, title: 'BPA Engine', desc: 'High-scale automation for Lead-to-Cash and Procure-to-Pay cycles.' },
    { icon: <FiShield className="w-5 h-5 md:w-6 md:h-6" />, title: 'Statutory Compliance', desc: 'GST, PF, and TDS reconciliation built into every fiscal transaction.' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950 font-sans selection:bg-indigo-500/10 transition-colors">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 border-slate-200 bg-white/80 /80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white">
              <FiServer size={18} />
            </div>
            <span className="text-xl font-black tracking-tight">PRO<span className="text-indigo-600">ERP</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10">
             {['Solutions', 'Features', 'Compliance', 'Security'].map(item => (
               <button key={item} className="text-[14px] font-black uppercase tracking-[0.3em] text-slate-950 hover:text-indigo-600 transition-colors">{item}</button>
             ))}
          </div>
          <Link href="/dashboard">
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-base font-serif-professional tracking-wide  tracking-widest transition-all hover:bg-black active:scale-95 shadow-lg">
              Console Access
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-indigo-600/20 bg-indigo-600/5 text-indigo-600 text-[14px] font-serif-professional tracking-wide  tracking-[0.2em] mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              v2.8.0 Enterprise Release
            </div>
            <h1 className="text-4xl md:text-6xl font-serif-professional tracking-tight font-black tracking-tight leading-[1.05] mb-10 text-slate-950">
              The Industrial <br />
              <span className="text-indigo-600">Operating System</span>
            </h1>
            <p className="text-base text-slate-800 max-w-lg font-bold leading-relaxed mb-12">
              Mission-critical ERP & Business Process Automation infrastructure for high-scale Indian manufacturing and corporate giants.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/dashboard">
                <button className="bg-indigo-600 text-white font-black py-4 px-10 rounded-xl shadow-xl shadow-indigo-600/20 transition-all flex items-center gap-3 active:scale-95 hover:bg-indigo-700">
                  Command Center <FiArrowRight size={18} />
                </button>
              </Link>
              <button className="bg-white border-2 border-slate-200 text-slate-950 font-black py-4 px-10 rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                Technical Blueprint
              </button>
            </div>
          </motion.div>

          {/* Clean Dashboard Projection (No Image) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:block hidden"
          >
            <div className="relative industrial-card animate-fade-up animate-float bg-slate-50 /50 p-6 aspect-video overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-10 border-b border-slate-200 border-slate-200 bg-white/50 /50 backdrop-blur flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
               </div>
               
               <div className="mt-10 grid grid-cols-3 gap-4 h-full pt-4">
                  <div className="col-span-2 space-y-4">
                     <div className="h-32 bg-white  rounded-lg border border-slate-200 border-slate-200 p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                           <div className="w-20 h-2 bg-indigo-600/20 rounded" />
                           <FiTrendingUp className="text-indigo-500" />
                        </div>
                        <div className="flex items-end gap-2 h-16">
                           {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                             <div key={i} className="flex-1 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-t" style={{ height: `${h}%` }} />
                           ))}
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="h-40 bg-white  rounded-lg border border-slate-200 border-slate-200 p-4 shadow-sm">
                           <FiBox className="text-slate-950 mb-4" />
                           <div className="space-y-2">
                             <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded" />
                             <div className="h-2 w-3/4 bg-slate-100 dark:bg-slate-700 rounded" />
                             <div className="h-2 w-1/2 bg-indigo-500/40 rounded" />
                           </div>
                        </div>
                        <div className="h-40 bg-white  rounded-lg border border-slate-200 border-slate-200 p-4 shadow-sm">
                           <FiActivity className="text-slate-950 mb-4" />
                           <div className="space-y-2">
                             <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded" />
                             <div className="h-2 w-2/3 bg-slate-100 dark:bg-slate-700 rounded" />
                             <div className="h-8 w-8 rounded-full border-4 border-indigo-600/30 border-t-indigo-600 animate-spin mx-auto mt-4" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="h-full bg-indigo-600 text-white rounded-lg p-6 flex flex-col justify-between shadow-xl">
                        <FiDatabase className="text-indigo-400" />
                        <div>
                           <p className="text-[14px] font-serif-professional tracking-wide  text-white font-black mb-1">Fiscal Balance</p>
                           <p className="text-3xl font-black tracking-tight">₹42.8 Cr</p>
                        </div>
                        <div className="space-y-2">
                           <div className="h-1 w-full bg-white/10 rounded" />
                           <div className="h-1 w-3/4 bg-white/10 rounded" />
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="absolute inset-0 border-[20px] border-transparent pointer-events-none group-hover:border-indigo-600/5 transition-all duration-700" />
            </div>

            {/* Float Cards */}
            <motion.div 
               animate={{ y: [0, -8, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute -top-10 -right-10 p-5 bg-white  border border-slate-200 border-slate-200 rounded-xl shadow-2xl flex items-center gap-4"
            >
               <div className="p-2 bg-emerald-500 rounded text-white"><FiTrendingUp size={16} /></div>
               <div>
                  <p className="text-[14px] font-black text-slate-950 uppercase tracking-widest">Growth</p>
                  <p className="text-xl font-black">+12.4%</p>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-48 px-6 bg-slate-50/50 /20 border-y border-slate-200 border-slate-200">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="industrial-card animate-fade-up animate-float p-10 bg-white  group"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-600/10 dark:bg-indigo-600/10 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 mb-8 border border-indigo-600/10">
                  {f.icon}
                </div>
                <h3 className="text-3xl font-serif-professional tracking-tight mb-4 text-slate-950 font-black">{f.title}</h3>
                <p className="text-slate-800 text-xl leading-relaxed font-bold">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-200 border-slate-200 bg-white ">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-950 text-base font-serif-professional tracking-wide  tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white">
              <FiLayers size={14} />
            </div>
            <span className="text-slate-950">PRO<span className="text-indigo-600">ERP</span></span>
          </div>
          <div className="flex gap-10">
            <span>Platform</span>
            <span>Security</span>
            <span>T&C</span>
          </div>
          <div className="text-center md:text-right">
             <p>© 2024 Omni Industrial Solutions</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

