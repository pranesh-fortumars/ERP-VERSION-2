'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCpu, FiActivity, FiLayers, FiAlertTriangle, 
  FiClock, FiCheckCircle, FiPlay, FiSettings, FiBarChart2, FiX, FiZap, FiTarget, FiBox, FiTrendingUp, FiServer
} from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';

const ManufacturingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productionLog] = useState([
    { name: 'Unit A', output: 450, target: 500, quality: 98 },
    { name: 'Unit B', output: 380, target: 400, quality: 95 },
    { name: 'Unit C', output: 520, target: 500, quality: 99 },
    { name: 'Unit D', output: 290, target: 350, quality: 92 },
  ]);

  const [jobs, setJobs] = useState([
    { id: 'JOB-902', product: 'Engine Transmission Case', priority: 'High', progress: 65, startTime: '06:00 AM' },
    { id: 'JOB-905', product: 'Turbine Blade Core', priority: 'Critical', progress: 40, startTime: '08:30 AM' },
    { id: 'JOB-899', product: 'Alloy Wheel Hub', priority: 'Medium', progress: 100, startTime: 'Yesterday' },
  ]);

  const [newJob, setNewJob] = useState({ product: '', priority: 'Medium' });

  const addJob = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `JOB-${Math.floor(Math.random() * 900 + 100)}`;
    setJobs([{ ...newJob, id, progress: 0, startTime: 'Just Now' }, ...jobs]);
    setIsModalOpen(false);
    setNewJob({ product: '', priority: 'Medium' });
  };

  const maintenanceSchedule = [
    { machine: 'CNC Milling X1', status: 'Optimal', health: 94, nextService: '12 Days' },
    { machine: 'Heavy Press P4', status: 'Warning', health: 68, nextService: '2 Days' },
    { machine: 'Robotic Arm R2', status: 'Optimal', health: 98, nextService: '25 Days' },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Professional Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">MES Orchestration</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 flex items-center gap-2">
            <FiCpu className="text-blue-600" /> High-Scale Shop Floor Operations • Node cluster Alpha
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <FiBarChart2 className="w-4 h-4" /> Audit Metrics
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <FiPlay className="w-4 h-4" /> New Batch
          </button>
        </div>
      </div>

      {/* Industrial Digital Twin (Replaces Image) */}
      <div className="relative h-80 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 p-10 flex items-center justify-between group">
         <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
         
         <div className="relative z-10 space-y-4 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Asset: Unit-7 ASSEMBLY
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">High-Speed <br />Assembly Line</h2>
            <p className="text-slate-400 text-xs font-medium max-w-sm">Autonomous robotic matrix with real-time desync correction and AI-driven quality validation protocols active.</p>
         </div>

         <div className="relative z-10 hidden xl:flex gap-4">
            <div className="w-48 h-48 rounded-xl border border-blue-500/20 bg-blue-500/5 backdrop-blur flex items-center justify-center relative overflow-hidden group-hover:border-blue-500/40 transition-all">
               <FiActivity className="text-blue-500 animate-pulse" size={64} />
               <div className="absolute bottom-4 text-[10px] font-black text-blue-400 uppercase tracking-widest">OEE: 92.4%</div>
            </div>
            <div className="w-48 h-48 rounded-xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur flex items-center justify-center relative overflow-hidden group-hover:border-emerald-500/40 transition-all">
               <FiCheckCircle className="text-emerald-500" size={64} />
               <div className="absolute bottom-4 text-[10px] font-black text-emerald-400 uppercase tracking-widest">Quality: 98.1%</div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Production Throughput */}
        <div className="xl:col-span-2 industrial-card p-10 flex flex-col">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white uppercase leading-none">Throughput Analytics</h3>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Shift distribution metrics</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest text-slate-500">Shift 7A (Morning)</div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionLog}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                <Bar dataKey="output" radius={[6, 6, 0, 0]} barSize={40}>
                  {productionLog.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2563eb' : '#059669'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Machine Health Metrics */}
        <div className="industrial-card p-10 flex flex-col">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white uppercase leading-none">Integrity Lab</h3>
             <FiSettings className="text-slate-400 animate-spin-slow" />
          </div>
          <div className="space-y-6 flex-1">
            {maintenanceSchedule.map((m, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-center mb-3 text-slate-900 dark:text-slate-100">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded ${m.status === 'Optimal' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                        <FiActivity className="w-4 h-4" />
                     </div>
                     <h4 className="text-xs font-bold uppercase tracking-tight">{m.machine}</h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${m.status === 'Optimal' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white animate-pulse'}`}>{m.status}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${m.health}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className={`h-full ${m.health > 80 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                  />
                </div>
                <div className="flex justify-between items-center text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2 px-1">
                   <span>Life: {m.health}%</span>
                   <span>Next service: {m.nextService}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Batches & Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 industrial-card overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
             <div>
                <h3 className="text-sm font-black tracking-widest text-slate-900 dark:text-white uppercase leading-none">Work Order Backlog</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time batch progress</p>
             </div>
             <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-600/10 px-4 py-2 rounded">View High Priority</button>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {jobs.map((job, i) => (
              <div key={job.id} className="p-6 flex flex-col md:flex-row gap-6 items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group data-table-row">
                <div className="w-12 h-12 bg-slate-900 text-white rounded flex items-center justify-center font-black group-hover:bg-blue-600 transition-colors uppercase tracking-tighter">
                  {job.id.split('-')[1]}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold uppercase tracking-tight text-slate-900 dark:text-white truncate">{job.product}</h4>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                     <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" /> {job.id} • Started: {job.startTime}
                  </p>
                </div>
                <div className="w-full md:w-48">
                  <div className="flex justify-between items-center mb-1.5 px-1 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    <span>In-Progress</span>
                    <span>{job.progress}%</span>
                  </div>
                  <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${job.progress}%` }}
                      className="h-full bg-blue-600 rounded-full" 
                    />
                  </div>
                </div>
                <span className={`px-4 py-1 rounded text-[8px] font-black uppercase tracking-widest ${job.priority === 'Critical' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'}`}>
                  {job.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="industrial-card p-10 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden group min-h-[400px]">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-blue-600 rounded flex items-center justify-center mb-10 shadow-lg group-hover:rotate-12 transition-transform">
               <FiSettings size={32} />
            </div>
            <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase leading-none">BOM Master</h3>
            <p className="text-slate-400 font-medium text-[13px] leading-relaxed mb-12 max-w-[250px]">Configure enterprise-level production recipes with real-time cost roll-up and inventory reservation logic.</p>
            <div className="space-y-4">
              {['Fiscal Cost Analysis', 'Shrinkage Prediction', 'Multi-Level BOM Logic'].map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                  <FiCheckCircle className="w-4 h-4" /> {feat}
                </div>
              ))}
            </div>
          </div>
          <button className="w-full py-4 bg-white text-slate-900 font-black rounded-lg text-[10px] uppercase tracking-[0.4em] relative z-10 hover:bg-slate-100 transition-all shadow-xl active:scale-95 mt-10">
            Orchestrate Recipes
          </button>
        </div>
      </div>

      {/* Launch Batch Modal */}
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">Dispatch Center</h2>
                  <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">MES Workflow Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={addJob} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Asset Designation</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Turbine Impeller Unit v4" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white font-bold"
                    value={newJob.product}
                    onChange={(e) => setNewJob({...newJob, product: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dispatch Priority Matrix</label>
                  <div className="flex gap-2">
                    {['Medium', 'High', 'Critical'].map(p => (
                      <button 
                        key={p}
                        type="button"
                        onClick={() => setNewJob({...newJob, priority: p})}
                        className={`flex-1 py-3.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                          newJob.priority === p 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="w-full mt-4 py-4 bg-blue-600 text-white rounded-lg font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
                  Launch Batch
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManufacturingPage;


