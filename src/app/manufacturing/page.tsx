'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCpu, FiActivity, FiSettings, FiTool, FiCheckCircle, FiAlertCircle, 
  FiArrowRight, FiPlay, FiBox, FiClock, FiShield, FiPlus, FiX, FiLayers, FiDownload, FiUpload
} from 'react-icons/fi';

const ManufacturingPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { label: 'OEE Status', value: '92.4%', change: '+0.5%', icon: <FiActivity />, color: 'blue' },
    { label: 'Production Out', value: '14,284', change: '+2.1%', icon: <FiBox />, color: 'emerald' },
    { label: 'Total Downtime', value: '14m', change: '-5m', icon: <FiClock />, color: 'amber' },
    { label: 'Quality Rate', value: '98.1%', change: '+0.2%', icon: <FiShield />, color: 'blue' },
  ];

  const machineStatus = [
    { machine: 'Heavy Press 01', status: 'Optimal', health: 94, load: 78, color: 'bg-cyan-500' },
    { machine: 'CNC Router B2', status: 'Optimal', health: 88, load: 92, color: 'bg-indigo-500' },
    { machine: 'Automated Welder', status: 'Maintenance', health: 42, load: 0, color: 'bg-rose-500' },
    { machine: 'Injection Mold 5', status: 'Optimal', health: 91, load: 65, color: 'bg-blue-600' },
  ];

  const jobs = [
    { id: 'JOB-4029', part: 'Turbine Blade X-1', priority: 'High', progress: 65, startTime: '08:00 AM' },
    { id: 'JOB-4030', part: 'Engine Housing Unit', priority: 'Med', progress: 12, startTime: '10:30 AM' },
    { id: 'JOB-4031', part: 'Control Panel Shell', priority: 'Low', progress: 0, startTime: 'Wait' },
  ];

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
             <FiCpu className="animate-spin-slow" /> Manufacturing Execution System Active
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">Floor Intelligence</h1>
          <p className="text-slate-500 font-bold text-sm mt-2 flex items-center gap-2">
            <FiActivity className="text-blue-500" /> Real-time OEE & Neural Production Analytics
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
             <FiUpload /> Floor Sync
           </button>
           <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
             <FiDownload /> Audit Export
           </button>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-10 py-3.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
           >
             <FiPlus /> New Work Order
           </button>
        </div>
      </div>

      {/* Industrial Digital Twin (Replaces Image) */}
      <div className="h-64 w-full rounded-3xl overflow-hidden border border-blue-500/20 bg-blue-600 p-8 flex flex-col justify-between relative group shadow-2xl">
         <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
         
         <div className="relative z-10 space-y-4 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-2 backdrop-blur">
               <FiActivity className="animate-pulse" /> Live Stream Node-4A
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">High-Speed <br />Assembly Line</h2>
            <p className="text-blue-50 text-xs font-medium max-w-sm">Autonomous robotic matrix with real-time desync correction and AI-driven quality validation protocols active.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="industrial-card p-8 flex flex-col justify-between bg-white border border-slate-200 shadow-sm rounded-3xl"
          >
            <div className={`p-4 rounded-2xl ${
              stat.color === 'blue' ? 'bg-blue-600/10 text-blue-600' :
              stat.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' :
              'bg-amber-500/10 text-amber-600'
            } w-fit mb-6 text-2xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</h3>
              <p className="text-[9px] font-black text-emerald-500 mt-2 uppercase tracking-widest">{stat.change} vs Last Shift</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 industrial-card flex flex-col bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <h3 className="text-sm font-black tracking-widest text-slate-900 uppercase leading-none">Node Cluster Performance</h3>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="w-2 h-2 rounded-full bg-slate-200" />
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {machineStatus.map((m, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-center mb-3 text-slate-900">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded ${m.status === 'Optimal' ? 'bg-blue-500/10 text-blue-500' : 'bg-sky-500/10 text-sky-500'}`}>
                        <FiActivity className="w-4 h-4" />
                     </div>
                     <h4 className="text-xs font-bold uppercase tracking-tight">{m.machine}</h4>
                  </div>
                  <span className={`px-4 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest border ${m.status === 'Optimal' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse'}`}>{m.status}</span>
                </div>
                <div className="h-1.5 w-full bg-blue-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${m.health}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className={`h-full ${m.color}`} 
                  />
                </div>
                <div className="flex justify-between items-center text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2 px-1">
                   <span>Unit Integrity</span>
                   <span>{m.health}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="industrial-card bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
             <div>
                 <h3 className="text-sm font-black tracking-widest text-slate-900 uppercase leading-none">Work Order Backlog</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time batch progress</p>
             </div>
             <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">View High Priority</button>
          </div>
          <div className="divide-y divide-slate-100">
            {jobs.map((job, i) => (
              <div key={i} className="p-6 flex items-center justify-between group hover:bg-slate-50 transition-all cursor-pointer">
                <div>
                   <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{job.part}</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{job.id} • {job.startTime}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                     <p className="text-[10px] font-black text-blue-600">{job.progress}%</p>
                     <div className="w-12 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-blue-600" style={{ width: `${job.progress}%` }} />
                     </div>
                  </div>
                  <FiChevronRight className="text-slate-200 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
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
              className="absolute inset-0 bg-white/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-10 border border-slate-200 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">New Work Order</h2>
                  <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Execute Production Cycle</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory SKU / Part Part</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Engine Housing Unit" 
                    className="w-full bg-slate-50 border-none rounded-lg py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-blue-500/50 text-slate-900 font-bold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Volume</label>
                    <input 
                      required
                      type="number" 
                      placeholder="00" 
                      className="w-full bg-slate-50 border-none rounded-lg py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-blue-500/50 text-slate-900 font-bold"
                    />
                  </div>
                   <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Priority Matrix</label>
                    <select className="w-full bg-slate-50 border-none rounded-lg py-4 px-6 text-xs outline-none focus:ring-1 focus:ring-blue-500/50 text-slate-900 font-bold appearance-none">
                      <option>Low</option>
                      <option>Med</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full mt-4 py-4 bg-blue-600 text-white rounded-lg font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
                  Initialize Work Order
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FiChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

export default ManufacturingPage;
