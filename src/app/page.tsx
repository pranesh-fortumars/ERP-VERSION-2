'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBox, FiUsers, FiDollarSign, FiBarChart2, FiGlobe, FiShield, FiCpu, FiTrendingUp, FiActivity } from 'react-icons/fi';
import Link from 'next/link';

const LandingPage = () => {
  const features = [
    { icon: <FiBox className="w-6 h-6 md:w-7 md:h-7" />, title: 'Smart Inventory', desc: 'Real-time SKU tracking with AI-driven reorder alerts across PAN-India warehouses.' },
    { icon: <FiUsers className="w-6 h-6 md:w-7 md:h-7" />, title: 'Enterprise CRM', desc: 'Lead generation, B2B contracts, GSTIN profiles, and stakeholder relations.' },
    { icon: <FiCpu className="w-6 h-6 md:w-7 md:h-7" />, title: 'BPA Automation', desc: 'Business Process Automation for Lead-to-Cash and Procure-to-Pay cycles.' },
    { icon: <FiShield className="w-6 h-6 md:w-7 md:h-7" />, title: 'Statutory Compliance', desc: 'GST, PF, and TDS reconciliation built into every transaction and payroll.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0c10] text-slate-900 dark:text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 dark:bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-teal-500/10 dark:bg-teal-500/20 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              Trusted by 500+ Indian Enterprises
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900 dark:text-white mb-8">
              Industrial <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-teal-500 to-indigo-700 dark:from-indigo-400 dark:via-teal-400 dark:to-indigo-500">
                Operating System
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-lg font-medium leading-relaxed mb-10 tracking-tight">
              An all-in-one ERP & Business Process Automation platform designed for high-scale Indian Manufacturing and Industrial Giants.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 text-white font-black py-4 px-10 rounded-2xl shadow-xl transition-all flex items-center gap-3 active:scale-95"
                >
                  Enter Command Center <FiArrowRight size={20} />
                </motion.button>
              </Link>
              <button className="bg-white dark:bg-slate-800/10 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-white font-black py-4 px-10 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all active:scale-95">
                Book a Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-teal-500/20 blur-[80px] rounded-[60px]" />
            <div className="relative rounded-[48px] overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-2xl bg-white dark:bg-slate-900">
              <img 
                src="/industrial_erp_hero_1774856751712.png" 
                alt="Industrial ERP Command Center" 
                className="w-full grayscale dark:grayscale-0 contrast-125 dark:contrast-100 hover:grayscale-0 transition-all duration-700 brightness-100 dark:brightness-75 dark:hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-[#0a0c10]/60 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Float Stat Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl"
            >
              <FiTrendingUp className="text-teal-600 dark:text-teal-400 mb-2" size={24} />
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">Portfolio Value</p>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">₹84.2 Cr</h4>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl"
            >
              <FiActivity className="text-indigo-600 dark:text-indigo-400 mb-2" size={24} />
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">Production OEE</p>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">92.4%</h4>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-32 px-6 bg-white/50 dark:bg-slate-900/20 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">Built for Industrial Scale</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Standardized protocols for Indian tax laws, heavy manufacturing workflows, and cross-border supply chain logistics.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[48px] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:bg-slate-900/60"
              >
                <div className="w-16 h-16 rounded-[24px] bg-indigo-500/10 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 mb-10 shadow-inner">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-24 px-6 border-t border-slate-200 dark:border-slate-800/50 bg-white dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-1">PRO<span className="text-indigo-600">ERP</span></h3>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Enterprise Command Infrastructure</p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {['Platform', 'Revenue', 'Assets', 'Shop Floor'].map((link, j) => (
              <Link 
                key={j} 
                href={`/${link.toLowerCase().replace(' ', '-')}`} 
                className="text-sm font-black text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-all uppercase tracking-widest"
              >
                {link}
              </Link>
            ))}
          </div>
          <div className="text-center md:text-right">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2024 Omni Industrial Solutions Pvt Ltd</p>
             <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full mt-4">v2.4.0 INDUSTRIAL RELEASE</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

