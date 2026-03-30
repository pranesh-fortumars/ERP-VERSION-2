'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlayCircle, FiCheckCircle, FiTrendingUp, FiSend, 
  FiZap, FiSettings, FiArrowRight, FiShield, FiPlus, FiX 
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
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Process Automation</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Monitor and optimize mission-critical Business Process Automation (BPA)</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2 uppercase tracking-widest"
        >
          <FiPlus /> Design New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {workflows.map((flow, idx) => (
          <motion.div 
            key={flow.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-[0.03] blur-[100px] -z-0" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em] bg-indigo-500/10 px-2 py-0.5 rounded-md">{flow.id}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${flow.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 animate-pulse'}`}>
                    {flow.status}
                  </span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">{flow.name}</h3>
              </div>
              <div className="px-8 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-[28px] border border-slate-100 dark:border-slate-800 text-center shadow-inner group transition-all hover:bg-white dark:hover:bg-slate-800">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-500 transition-colors">Efficiency Index</p>
                <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{flow.efficiency}</p>
              </div>
            </div>

            <div className="relative mb-8">
              {/* Connector lines (Desktop) */}
              <div className="hidden lg:block absolute top-[44px] left-[10%] w-[80%] h-[2px] bg-slate-100 dark:bg-slate-800 -z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                {flow.steps.map((step, sIdx) => (
                  <div key={sIdx} className="group flex flex-col items-center">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`w-20 h-20 rounded-[32px] flex items-center justify-center text-3xl transition-all duration-500 border-4 border-white dark:border-slate-900 shadow-2xl
                      ${step.status === 'Completed' ? 'bg-emerald-500 text-white' : 
                        step.status === 'Processing' ? 'bg-indigo-600 text-white shadow-glow shadow-indigo-500/50 ring-4 ring-indigo-500/20' :
                        step.status === 'Warning' ? 'bg-amber-500 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600'}`}>
                      {step.icon}
                    </motion.div>
                    <div className="mt-8 text-center px-4">
                      <h4 className={`text-sm font-black mb-1 tracking-tight transition-colors ${step.status === 'Pending' ? 'text-slate-300 dark:text-slate-600' : 'text-slate-900 dark:text-white'}`}>
                        {step.title}
                      </h4>
                      <div className="flex items-center justify-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          step.status === 'Completed' ? 'bg-emerald-500' : 
                          step.status === 'Processing' ? 'bg-indigo-500 animate-pulse' :
                          step.status === 'Warning' ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                        }`} />
                        <p className={`text-[9px] font-black uppercase tracking-[0.1em]
                          ${step.status === 'Completed' ? 'text-emerald-500' : 
                            step.status === 'Processing' ? 'text-indigo-500' :
                            step.status === 'Warning' ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'}`}>
                          {step.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center bg-slate-50/30 dark:bg-slate-800/20 -mx-8 -mb-8 px-8 py-6 rounded-b-[40px] gap-4">
              <div className="flex gap-6">
                <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">Configuration</button>
                <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">Audit Logs</button>
                <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">Nodes</button>
              </div>
              <button className="px-6 py-3 bg-white dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm active:scale-95">
                Run Multi-Node Simulation
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[40px] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Design Automation Workflow</h2>
                  <p className="text-slate-500 font-medium text-xs mt-1 uppercase tracking-widest font-black">BPA Engine Config</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={addWorkflow} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Workflow Title</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Employee Onboarding v2" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                    value={newFlow.name}
                    onChange={(e) => setNewFlow({...newFlow, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Trigger Mechanism</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold">
                    <option>On Resource Creation</option>
                    <option>Scheduled (CRON)</option>
                    <option>Webhook Callback</option>
                    <option>Manual Execution</option>
                  </select>
                </div>
                <div className="p-5 bg-indigo-500/5 rounded-3xl border border-indigo-500/10">
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <FiZap size={10} /> BPA Engine Note
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">New workflows are initialized with a standard 4-node blueprint (Init, Config, Review, Deploy) for rapid prototyping.</p>
                </div>
                <button type="submit" className="w-full mt-4 py-4 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:scale-[1.01]">
                  Commit & Deploy Engine
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

