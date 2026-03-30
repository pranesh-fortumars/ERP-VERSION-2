'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FiPlayCircle, FiCheckCircle, FiTrendingUp, FiSend, FiZap, FiSettings, FiArrowRight, FiShield } from 'react-icons/fi';

const WorkflowPage = () => {
  const workflows = [
    { 
      id: 'BPA-01', 
      name: 'Lead-to-Cash (L2C)', 
      status: 'Active', 
      efficiency: '94%',
      steps: [
        { title: 'Lead Capture', icon: <FiZap />, status: 'Completed' },
        { title: 'Quote Generation', icon: <FiSettings />, status: 'Completed' },
        { title: 'Manager Approval', icon: <FiShield />, status: 'Processing' },
        { title: 'Invoice & Payment', icon: <FiSend />, status: 'Pending' },
      ]
    },
    { 
      id: 'BPA-02', 
      name: 'Procure-to-Pay (P2P)', 
      status: 'Optimization Needed', 
      efficiency: '78%',
      steps: [
        { title: 'PR Creation', icon: <FiZap />, status: 'Completed' },
        { title: 'Vendor Selection', icon: <FiSettings />, status: 'Completed' },
        { title: 'PO Approval', icon: <FiShield />, status: 'Warning' },
        { title: 'Goods Receipt', icon: <FiSend />, status: 'Pending' },
      ]
    }
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Process Automation</h1>
          <p className="text-slate-500 font-medium tracking-tight">Monitor and optimize mission-critical Business Process Automation (BPA)</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2">
          <FiPlus /> Design New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {workflows.map((flow, idx) => (
          <motion.div 
            key={flow.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 premium-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em]">{flow.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${flow.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {flow.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{flow.name}</h3>
              </div>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Efficiency Index</p>
                <p className="text-2xl font-black text-indigo-600">{flow.efficiency}</p>
              </div>
            </div>

            <div className="relative">
              {/* Connector lines (Desktop) */}
              <div className="hidden md:block absolute top-[44px] left-0 w-full h-[2px] bg-slate-100 dark:bg-slate-800 -z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {flow.steps.map((step, sIdx) => (
                  <div key={sIdx} className="group flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-[28px] flex items-center justify-center text-2xl transition-all duration-500 border-4 border-white dark:border-slate-900 shadow-xl
                      ${step.status === 'Completed' ? 'bg-emerald-500 text-white scale-110' : 
                        step.status === 'Processing' ? 'bg-indigo-600 text-white shadow-glow shadow-indigo-500/50 scale-110' :
                        step.status === 'Warning' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      {step.icon}
                    </div>
                    <div className="mt-6 text-center">
                      <h4 className={`text-sm font-bold mb-1 ${step.status === 'Pending' ? 'text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                        {step.title}
                      </h4>
                      <p className={`text-[10px] font-black uppercase tracking-widest
                        ${step.status === 'Completed' ? 'text-emerald-500' : 
                          step.status === 'Processing' ? 'text-indigo-500 animate-pulse' :
                          step.status === 'Warning' ? 'text-amber-500' : 'text-slate-400'}`}>
                        {step.status}
                      </p>
                    </div>
                    {sIdx < 3 && (
                      <div className="md:hidden my-4 text-slate-300">
                        <FiArrowRight className="rotate-90" size={24} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 -mx-8 -mb-8 px-8 py-6 rounded-b-[40px]">
              <div className="flex gap-4">
                <button className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">Configuration</button>
                <button className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">Audit Logs</button>
              </div>
              <button className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-all">
                Run Simulation
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FiPlus = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default WorkflowPage;
