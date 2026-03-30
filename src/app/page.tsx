'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBox, FiUsers, FiDollarSign, FiBarChart2, FiGlobe, FiShield, FiCpu, FiTrendingUp } from 'react-icons/fi';
import Link from 'next/link';

const LandingPage = () => {
  const features = [
    { icon: <FiBox size={24} />, title: 'Smart Inventory', desc: 'Real-time SKU tracking with AI-driven reorder alerts across PAN-India warehouses.' },
    { icon: <FiUsers size={24} />, title: 'Enterprise CRM', desc: 'Manage large-scale B2B contracts, GSTIN profiles, and stakeholder relations.' },
    { icon: <FiCpu size={24} />, title: 'BPA Automation', desc: 'Business Process Automation for Lead-to-Cash and Procure-to-Pay cycles.' },
    { icon: <FiShield size={24} />, title: 'Statutory Compliance', desc: 'GST, PF, and TDS reconciliation built into every transaction and payroll.' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-teal-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-50 animate-ping" />
              Trusted by 500+ Indian Enterprises
            </div>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white mb-8">
              The Next-Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-teal-400 to-indigo-500">
                Industrial OS
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg font-medium leading-relaxed mb-10 tracking-tight">
              An all-in-one ERP & BPA platform designed for modern Indian Manufacturing. 
              Efficiency. Transparency. Scale.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 text-white font-black py-4 px-10 rounded-2xl shadow-xl transition-all flex items-center gap-3"
                >
                  Enter Command Center <FiArrowRight size={20} />
                </motion.button>
              </Link>
              <button className="bg-slate-800/10 backdrop-blur-xl border border-slate-700/50 text-white font-black py-4 px-10 rounded-2xl hover:bg-slate-700/30 transition-all">
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
            <div className="relative rounded-[48px] overflow-hidden border border-slate-700/50 shadow-2xl">
              <img 
                src="file:///C:/Users/prane/.gemini/antigravity/brain/5910531c-c2e0-4088-b84c-3993a9f90725/industrial_erp_hero_1774856751712.png" 
                alt="Industrial ERP Dashboard Preview" 
                className="w-full grayscale hover:grayscale-0 transition-all duration-700 brightness-75 hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Float Stat Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl premium-shadow"
            >
              <FiTrendingUp className="text-teal-400 mb-2" size={24} />
              <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase mb-1">Portfolio Value</p>
              <h4 className="text-xl font-bold text-white">₹84.2 Cr</h4>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-black tracking-tighter text-white mb-6">Built for High-Growth Manufacturing</h2>
            <p className="text-slate-400 font-medium">Standardized protocols for Indian tax laws, industrial workflows, and supply chain logistics.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-[38px] bg-slate-900/40 border border-slate-800/50 hover:border-indigo-500/50 transition-all hover:bg-slate-900/60"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-8">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-20 px-6 border-t border-slate-800/50 bg-slate-900/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <h3 className="text-2xl font-black tracking-tighter text-white mb-2">Omni ERP Suite</h3>
            <p className="text-slate-500 font-medium text-sm">Industrial Grade Business Automation.</p>
          </div>
          <div className="flex gap-8">
            <Link href="/dashboard" className="text-sm font-bold text-slate-400 hover:text-white transition-all">Platform</Link>
            <Link href="/sales" className="text-sm font-bold text-slate-400 hover:text-white transition-all">Revenue</Link>
            <Link href="/inventory" className="text-sm font-bold text-slate-400 hover:text-white transition-all">Assets</Link>
            <Link href="/manufacturing" className="text-sm font-bold text-slate-400 hover:text-white transition-all">Shop Floor</Link>
          </div>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">© 2024 Omni Industrial Solutions Pvt Ltd</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
