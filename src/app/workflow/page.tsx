'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBriefcase, FiCheckCircle, FiClock, FiActivity, FiLayers, FiZap, 
  FiPlus, FiX, FiSearch, FiFilter, FiGlobe, FiDatabase, FiSettings,
  FiShoppingCart, FiTruck, FiBox, FiUsers, FiShield, FiDollarSign
} from 'react-icons/fi';

const WorkflowPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState<number | null>(1);

  const workflowNodes = [
    { id: '1', title: 'Procurement Request', status: 'Completed', color: 'bg-emerald-500', icon: <FiShoppingCart className="w-8 h-8" />, time: '12m' },
    { id: '2', title: 'Vendor Approval', status: 'Completed', color: 'bg-indigo-500', icon: <FiBriefcase className="w-8 h-8" />, time: '45m' },
    { id: '3', title: 'Quality Assurance', status: 'In Progress', color: 'bg-blue-600', icon: <FiActivity className="w-8 h-8" />, time: 'ACT' },
    { id: '4', title: 'Logistics Deployment', status: 'Pending', color: 'bg-slate-300', icon: <FiTruck className="w-8 h-8" />, time: 'TBD' }
  ];

  const workflows = [
    {
      id: 1,
      name: 'Lead-to-Cash Cycle',
      status: 'Active',
      efficiency: '94.2%',
      nodes: workflowNodes
    },
    {
      id: 2,
      name: 'Procure-to-Pay Pipeline',
      status: 'Optimization Needed',
      efficiency: '82.4%',
      nodes: [
        { id: '1', title: 'Vendor Matrix', status: 'Completed', color: 'bg-sky-500', icon: <FiUsers className="w-8 h-8" />, time: '1.2h' },
        { id: '2', title: 'Batch Fulfillment', status: 'Completed', color: 'bg-indigo-600', icon: <FiBox className="w-8 h-8" />, time: '3.1h' },
        { id: '3', title: 'Statutory Audit', status: 'In Progress', color: 'bg-amber-500', icon: <FiShield className="w-8 h-8" />, time: 'Pending' },
        { id: '4', title: 'Treasury Release', status: 'Pending', color: 'bg-slate-300', icon: <FiDollarSign className="w-8 h-8" />, time: 'Next' }
      ]
    }
  ];

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[14px] font-serif-professional tracking-wide  tracking-widest mb-4 border border-blue-100">
            <FiGlobe className="animate-spin-slow" /> Orchestration Infrastructure Active
          </div>
          <h1 className="text-3xl font-black text-slate-950 uppercase tracking-tight leading-none">Workflow Matrix</h1>
          <p className="text-slate-950 font-bold text-xl mt-2 flex items-center gap-2">
            <FiLayers className="text-blue-500" /> BPA Pipeline Execution & Node Tracking
          </p>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-8 py-3.5 bg-blue-600 text-white rounded-[24px] text-[14px] font-serif-professional tracking-wide  tracking-[0.3em] shadow-xl shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
           >
             <FiPlus /> Initialize Pipe
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {workflows.map((flow) => (
          <div 
            key={flow.id}
            className={`industrial-card animate-fade-up p-10 bg-white group transition-all duration-700 ${activeWorkflow === flow.id ? 'ring-2 ring-blue-600/20 shadow-2xl' : ''}`}
            onClick={() => setActiveWorkflow(flow.id)}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 px-4">
              <div className="flex items-center gap-6">
                 <div className={`w-16 h-16 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-blue-600/30 ${flow.status === 'Active' ? 'bg-blue-600' : 'bg-amber-500'}`}>
                    <FiZap size={28} />
                 </div>
                 <div>
                    <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tight leading-none">{flow.name}</h3>
                    <p className="text-base font-black text-slate-950 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                       {flow.status} <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </p>
                 </div>
              </div>
              <div className="flex items-center gap-10">
                 <div className="text-center">
                    <p className="text-[14px] font-black text-slate-950 uppercase tracking-widest mb-1">Efficiency Delta</p>
                    <p className="text-3xl font-black text-blue-600  tracking-tight">{flow.efficiency}</p>
                 </div>
                 <button className="p-4 bg-slate-50 rounded-[24px] text-slate-950 hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-100">
                    <FiSettings size={20} />
                 </button>
              </div>
            </div>

            <div className="relative">
              {/* Process Line */}
              <div className="hidden lg:block absolute top-8 left-0 right-0 h-1 bg-slate-100 -z-0 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: flow.status === 'Active' ? '70%' : '100%' }}
                   transition={{ duration: 2 }}
                   className={`h-full ${flow.status === 'Active' ? 'bg-blue-600' : 'bg-amber-400'}`}
                 />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {flow.nodes.map((node, nIdx) => (
                  <div key={nIdx} className="flex flex-col items-center group/node">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-24 h-24 rounded-[36px] flex items-center justify-center text-white shadow-2xl transition-all duration-500 border-8 border-white ${node.color}
                      ${node.status === 'In Progress' ? 'ring-8 ring-blue-600/10' : ''}`}
                    >
                      {node.icon}
                      {node.status === 'Completed' && (
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-white shadow-lg">
                           <FiCheckCircle size={14} />
                        </div>
                      )}
                    </motion.div>
                    <div className="mt-8 text-center px-4">
                       <h4 className="text-[13px] font-black text-slate-950 uppercase tracking-widest leading-none mb-2">{node.title}</h4>
                       <p className={`text-[12px] font-serif-professional tracking-wide  tracking-[0.3em] ${node.status === 'Pending' ? 'text-slate-300' : 'text-blue-600'}`}>
                         {node.status} • {node.time}
                       </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Initialize Modal */}
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
              className="relative w-full max-w-xl bg-white rounded-[40px] p-8 md:p-10 border border-blue-500/10 shadow-3xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-950 uppercase leading-none">Initialize Pipe</h2>
                  <p className="text-slate-950 font-black text-[14px] mt-2 uppercase tracking-[0.3em]">Protocol Orchestration Artifact</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-50 rounded-[24px] text-slate-950 transition-colors active:scale-95"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Process Identification</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Asset Recovery Pipeline Delta" 
                    className="w-full bg-slate-50 border-none rounded-[32px] py-4 px-8 text-xl outline-none focus:ring-4 focus:ring-blue-600/5 font-black text-slate-950 shadow-inner"
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Priority Vector</label>
                    <select className="w-full bg-slate-50 border-none rounded-[32px] py-4 px-8 text-xl outline-none focus:ring-4 focus:ring-blue-600/5 font-black text-slate-950 appearance-none shadow-inner">
                      <option>Standard</option>
                      <option>High Priority</option>
                      <option>Critical</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Node Selection</label>
                    <select className="w-full bg-slate-50 border-none rounded-[32px] py-4 px-8 text-xl outline-none focus:ring-4 focus:ring-blue-600/5 font-black text-slate-950 appearance-none shadow-inner">
                      <option>All Logic Nodes</option>
                      <option>Cluster Alpha Only</option>
                    </select>
                  </div>
                </div>
                <button type="button" className="w-full mt-6 py-4 bg-blue-600 text-white rounded-[32px] font-black text-[13px] uppercase tracking-[0.4em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-90">
                   Deploy Workflow Orchestration
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
