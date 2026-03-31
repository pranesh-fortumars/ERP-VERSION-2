'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, FiPlay, FiCheckCircle, FiClock, FiSettings, 
  FiPlus, FiChevronRight, FiActivity, FiX, FiLayers, FiDatabase, FiUsers, FiBox, FiShield, FiDollarSign
} from 'react-icons/fi';

const WorkflowPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const workflows = [
    {
      id: 1,
      name: 'Lead-to-Cash Cycle',
      status: 'Active',
      efficiency: '94%',
      steps: [
        { title: 'Inquiry Discovery', icon: <FiDatabase />, status: 'Completed', time: '1.2h' },
        { title: 'Quote Synthesis', icon: <FiSettings />, status: 'Completed', time: '0.5h' },
        { title: 'Legal Validation', icon: <FiCheckCircle />, status: 'Processing', time: 'Pending' },
        { title: 'Capital Realization', icon: <FiClock />, status: 'Pending', time: 'L-Sync' },
      ]
    },
    {
      id: 2,
      name: 'Procure-to-Pay Automation',
      status: 'Optimization Needed',
      efficiency: '82%',
      steps: [
        { title: 'Vendor Matrix', icon: <FiUsers />, status: 'Completed', time: '2.4h' },
        { title: 'Batch Fulfillment', icon: <FiBox />, status: 'Warning', time: '3.1h' },
        { title: 'Statutory Audit', icon: <FiShield />, status: 'Pending', time: 'Next' },
        { title: 'Treasury Release', icon: <FiDollarSign />, status: 'Pending', time: 'Sync' },
      ]
    }
  ];

  return (
    <div className="space-y-12 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-all duration-500">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            <FiActivity className="animate-pulse" /> BPA Engines Synchronized
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">Workflow <br /> Orchestration</h1>
          <p className="text-slate-500 font-bold text-sm tracking-tight mt-4 flex items-center gap-2">
            <FiLayers className="text-blue-600" /> High-Scale Business Process Automation & Matrix Governance
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           {['Active', 'Staged', 'Historical'].map(tab => (
             <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
             >
               {tab}
             </button>
           ))}
           <button 
            onClick={() => setIsModalOpen(true)}
            className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl hover:scale-105 transition-all active:scale-95"
           >
             <FiPlus size={24} />
           </button>
        </div>
      </div>

      {/* Workflow Visualization Matrix */}
      <div className="space-y-12">
        {workflows.map((flow, idx) => (
          <motion.div 
            key={flow.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-10 bg-white rounded-[56px] border border-blue-500/20 shadow-xl shadow-blue-900/5 relative overflow-hidden group hover:border-blue-500 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-[0.05] blur-[150px] -z-0" />
            
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-16 gap-8 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-blue-600/10 text-blue-600 border border-blue-500/10`}>
                    {flow.status}
                  </span>
                </div>
                <h3 className="text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">{flow.name}</h3>
                <p className="text-slate-400 font-bold text-[10px] mt-4 uppercase tracking-[0.4em]">Engine Deployment Vector: Node Cluster Alpha</p>
              </div>
              <div className="px-10 py-8 bg-blue-50 rounded-[32px] border border-blue-100 text-center shadow-inner group-hover:bg-blue-100/50 transition-all duration-500 ring-1 ring-blue-500/5 min-w-[200px]">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Efficiency Index</p>
                <div className="flex items-baseline justify-center gap-1">
                  <p className="text-5xl font-black text-blue-600 tracking-tighter">{flow.efficiency.replace('%', '')}</p>
                  <span className="text-xl font-black text-blue-400">%</span>
                </div>
              </div>
            </div>

            <div className="relative mb-12 px-4 lg:px-12">
              {/* Connector lines (Desktop) */}
              <div className="hidden lg:block absolute top-[44px] left-[15%] w-[70%] h-[2px] bg-blue-100 -z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 relative z-10">
                {flow.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex flex-col items-center group/step">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-24 h-24 rounded-[36px] flex items-center justify-center text-4xl transition-all duration-700 border-4 border-white shadow-2xl relative
                      ${step.status === 'Completed' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 
                        step.status === 'Processing' ? 'bg-blue-600 text-white shadow-glow shadow-blue-500/50 ring-4 ring-blue-500/20 animate-pulse' :
                        step.status === 'Warning' ? 'bg-amber-500 text-white shadow-amber-500/20' : 'bg-slate-50 text-slate-300 shadow-inner'}`}>
                      {step.icon}
                      {step.status === 'Completed' && (
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-lg border-4 border-white">
                          <FiCheckCircle size={16} />
                        </div>
                      )}
                    </motion.div>
                    <div className="mt-8 text-center w-full">
                      <h4 className={`text-base font-black mb-2 tracking-tighter transition-colors uppercase ${step.status === 'Pending' ? 'text-slate-300' : 'text-slate-900'}`}>
                        {step.title}
                      </h4>
                      <div className="flex items-center justify-center gap-3">
                        <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${
                          step.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          step.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          'bg-slate-50 text-slate-400 border-slate-100'
                        }`}>
                          {step.status}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{step.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-slate-50 flex flex-col xl:flex-row justify-between items-center bg-slate-50/40 -mx-10 -mb-10 px-10 py-8 rounded-b-[56px] gap-6">
              <div className="flex items-center gap-8">
                 <div className="flex -space-x-3">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500 uppercase overflow-hidden">
                        <span className="opacity-40">NODE</span>
                     </div>
                   ))}
                 </div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">3 active node executors assigned</p>
              </div>
              <button className="px-8 py-3.5 bg-white rounded-[20px] text-[10px] font-black uppercase tracking-[0.3em] border border-slate-200 hover:border-blue-500/50 hover:text-blue-600 transition-all shadow-sm active:scale-95 group flex items-center gap-3">
                Process Details <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-white/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[56px] p-10 md:p-14 border border-slate-200 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Initialize Engine</h2>
                  <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em]">BPA Pipeline Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors active:scale-95"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Process Nomenclature</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Dynamic Inventory Rebalancing" 
                    className="w-full bg-slate-50 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 font-black"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Operational Cluster</label>
                  <select className="w-full bg-slate-50 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 font-black appearance-none">
                    <option>Manufacturing Node Delta</option>
                    <option>Logistics Cluster Omega</option>
                    <option>Financial Matrix Alpha</option>
                  </select>
                </div>
                <button type="submit" className="w-full mt-6 py-5 bg-blue-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95">
                  Deploy Process Matrix
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkflowPage;
