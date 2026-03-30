'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlayCircle, FiCheckCircle, FiTrendingUp, FiSend, 
  FiZap, FiSettings, FiArrowRight, FiShield, FiPlus, FiX, FiActivity, FiCpu, FiMonitor, FiDatabase, FiFileText, FiLayers
} from 'react-icons/fi';

const WorkflowPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workflows, setWorkflows] = useState([
    { 
      id: 'BPA-01', 
      name: 'Lead-to-Cash (L2C)', 
      status: 'Active', 
      efficiency: '94%',
      steps: [
        { title: 'Lead Capture', icon: <FiZap />, status: 'Completed' },
        { title: 'Quote Generation', icon: <FiCpu />, status: 'Completed' },
        { title: 'Manager Approval', icon: <FiShield />, status: 'Processing' },
        { title: 'Invoice & Payment', icon: <FiDatabase />, status: 'Pending' },
      ]
    },
    { 
      id: 'BPA-02', 
      name: 'Procure-to-Pay (P2P)', 
      status: 'Optimization Needed', 
      efficiency: '78%',
      steps: [
        { title: 'PR Creation', icon: <FiPlayCircle />, status: 'Completed' },
        { title: 'Vendor Selection', icon: <FiMonitor />, status: 'Completed' },
        { title: 'PO Approval', icon: <FiShield />, status: 'Warning' },
        { title: 'Goods Receipt', icon: <FiCheckCircle />, status: 'Pending' },
      ]
    }
  ]);

  const [newFlow, setNewFlow] = useState({ name: '', id: '' });

  const addWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `BPA-${Math.floor(Math.random() * 90 + 10)}`;
    setWorkflows([{ 
      id, 
      name: newFlow.name, 
      status: 'Active', 
      efficiency: '100%',
      steps: [
        { title: 'Initialization', icon: <FiZap />, status: 'Completed' },
        { title: 'Config', icon: <FiSettings />, status: 'Processing' },
        { title: 'Review', icon: <FiShield />, status: 'Pending' },
        { title: 'Deploy', icon: <FiSend />, status: 'Pending' },
      ] 
    }, ...workflows]);
    setIsModalOpen(false);
    setNewFlow({ name: '', id: '' });
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-all duration-500">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <FiActivity className="animate-pulse" /> BPA Engine Online
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Process Automation</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-1 flex items-center gap-2">
            <FiSettings className="text-blue-500" /> Mission-Critical Workflow Orchestration & Real-time Node Analytics
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-2.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95"
        >
          <FiPlus className="w-4 h-4" /> Design New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {workflows.map((flow, idx) => (
          <motion.div 
            key={flow.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-10 bg-white dark:bg-slate-900 rounded-[56px] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-[0.02] blur-[150px] -z-0" />
            
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-16 gap-8 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-[0.3em] bg-blue-500/10 px-4 py-1.5 rounded-xl border border-blue-500/10">{flow.id}</span>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${flow.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10' : 'bg-amber-500/10 text-amber-600 border-amber-500/10 animate-pulse'}`}>
                    {flow.status}
                  </span>
                </div>
                <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">{flow.name}</h3>
                <p className="text-slate-400 dark:text-slate-500 font-bold text-[10px] mt-4 uppercase tracking-[0.4em]">Engine Deployment Vector: Node Cluster Alpha</p>
              </div>
              <div className="px-10 py-8 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] border border-slate-100 dark:border-slate-800 text-center shadow-inner group-hover:bg-white dark:group-hover:bg-slate-800 transition-all duration-500 ring-1 ring-black/5 min-w-[200px]">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-2 group-hover:text-blue-500 transition-colors">Efficiency Index</p>
                <div className="flex items-baseline justify-center gap-1">
                  <p className="text-5xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">{flow.efficiency.replace('%', '')}</p>
                  <span className="text-xl font-black text-blue-400 dark:text-blue-600">%</span>
                </div>
              </div>
            </div>

            <div className="relative mb-12 px-4 lg:px-12">
              {/* Connector lines (Desktop) */}
              <div className="hidden lg:block absolute top-[44px] left-[15%] w-[70%] h-[2px] bg-slate-100 dark:bg-slate-800 -z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 relative z-10">
                {flow.steps.map((step, sIdx) => (
                  <div key={sIdx} className="group flex flex-col items-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-24 h-24 rounded-[36px] flex items-center justify-center text-4xl transition-all duration-700 border-4 border-white dark:border-slate-950 shadow-2xl relative
                      ${step.status === 'Completed' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 
                        step.status === 'Processing' ? 'bg-blue-600 text-white shadow-glow shadow-blue-500/50 ring-4 ring-blue-500/20 animate-pulse' :
                        step.status === 'Warning' ? 'bg-amber-500 text-white shadow-amber-500/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 shadow-inner'}`}>
                      {step.icon}
                      {step.status === 'Completed' && (
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-lg border-4 border-white dark:border-slate-950">
                          <FiCheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </motion.div>
                    <div className="mt-8 text-center w-full">
                      <h4 className={`text-base font-black mb-2 tracking-tighter transition-colors uppercase ${step.status === 'Pending' ? 'text-slate-300 dark:text-slate-600' : 'text-slate-900 dark:text-white'}`}>
                        {step.title}
                      </h4>
                      <div className="flex items-center justify-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${
                          step.status === 'Completed' ? 'bg-emerald-500' : 
                          step.status === 'Processing' ? 'bg-blue-500 animate-pulse' :
                          step.status === 'Warning' ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                        }`} />
                        <p className={`text-[9px] font-black uppercase tracking-[0.2em]
                          ${step.status === 'Completed' ? 'text-emerald-500' : 
                            step.status === 'Processing' ? 'text-blue-500' :
                            step.status === 'Warning' ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'}`}>
                          {step.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-16 pt-10 border-t border-slate-50 dark:border-slate-800 flex flex-col xl:flex-row justify-between items-center bg-slate-50/40 dark:bg-slate-800/30 -mx-10 -mb-10 px-10 py-8 rounded-b-[56px] gap-6">
              <div className="flex flex-wrap justify-center gap-8">
                <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                   <FiSettings className="group-hover:rotate-90 transition-transform" /> Configuration
                </button>
                <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2">
                   <FiFileText /> Audit Ledger
                </button>
                <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2">
                   <FiLayers /> Node Topology
                </button>
              </div>
              <button className="px-8 py-3.5 bg-white dark:bg-slate-800 rounded-[20px] text-[10px] font-black uppercase tracking-[0.3em] border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm active:scale-95 group flex items-center gap-3">
                <FiPlayCircle className="group-hover:text-blue-500" /> Run Architecture Simulation
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Designer Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[56px] p-10 md:p-14 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Design Engine Blueprint</h2>
                  <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em]">BPA Macro-Architecture Config</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors active:scale-95"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={addWorkflow} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Workflow Title Descriptor</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Employee Lifecycle Automation v4" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 dark:text-white font-black"
                    value={newFlow.name}
                    onChange={(e) => setNewFlow({...newFlow, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Trigger Mechanism Vector</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 dark:text-white font-black appearance-none">
                    <option>Protocol: Resource Creation</option>
                    <option>Protocol: Scheduled (CRON)</option>
                    <option>Protocol: Webhook Callback</option>
                    <option>Protocol: Manual Execution</option>
                  </select>
                </div>
                <div className="p-6 bg-blue-500/10 rounded-[32px] border border-blue-500/20 flex gap-4">
                  <div className="p-3 bg-blue-600 rounded-2xl h-fit shadow-lg shadow-blue-500/20">
                     <FiZap className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-1">BPA Engine Propagation Note</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-bold">New workflows are initialized with a standard 4-node blueprint (Init, Config, Review, Deploy) for mission-critical synchronization & rapid orchestration.</p>
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-5 bg-blue-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95">
                  Commit & Propagate Engine
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


