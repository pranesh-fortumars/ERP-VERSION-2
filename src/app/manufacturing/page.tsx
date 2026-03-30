'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCpu, FiActivity, FiLayers, FiAlertTriangle, 
  FiClock, FiCheckCircle, FiPlay, FiSettings, FiBarChart2, FiX, FiZap, FiTarget, FiBox, FiTrendingUp
} from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';
import Image from 'next/image';

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
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-colors duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Shop Floor Management
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">MES Orchestration</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-1 flex items-center gap-2">
            <FiCpu className="text-indigo-500" /> High-Scale Production Operations & BOM Infrastructure
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 active:scale-95">
            <FiBarChart2 className="w-4 h-4" /> Efficiency Audit
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95"
          >
            <FiPlay className="w-4 h-4" /> Dispatch Batch
          </button>
        </div>
      </div>

      {/* Industrial Hero Banner */}
      <div className="relative h-96 w-full rounded-[48px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl group">
        <Image 
          src="/industrial_robotic_arm_line_1774861143413.png" 
          alt="Smart Manufacturing Line" 
          fill 
          className="object-cover grayscale dark:grayscale-0 contrast-125 dark:contrast-100 group-hover:scale-105 transition-transform duration-1000 brightness-110 dark:brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-3xl font-black tracking-tight mb-2 uppercase">Unit-7 High-Speed Assembly</h2>
          <p className="text-indigo-200 text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Real-time Telemetry Active
          </p>
        </div>
        <div className="absolute top-10 right-10 flex gap-4">
           {[
             { label: 'OEE', val: '92.4%', color: 'indigo' },
             { label: 'Quality', val: '98.1%', color: 'emerald' }
           ].map((stat, i) => (
             <div key={i} className="bg-slate-900/40 backdrop-blur-md border border-white/20 p-5 rounded-3xl min-w-[120px]">
               <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">{stat.label}</p>
               <p className="text-2xl font-black text-white">{stat.val}</p>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Production Throughput */}
        <div className="xl:col-span-2 p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Throughput Analytics</h3>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1">Shift distribution metrics</p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-2 text-[10px] font-black text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl border border-black/5 uppercase tracking-widest">Shift 7A (Morning)</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={0} minWidth={0}>
              <BarChart data={productionLog}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                <Bar dataKey="output" radius={[12, 12, 0, 0]} barSize={40}>
                  {productionLog.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Machine Health Metrics */}
        <div className="p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Machine Integrity</h3>
             <FiSettings className="text-slate-400 animate-spin-slow" />
          </div>
          <div className="space-y-4 flex-1">
            {maintenanceSchedule.map((m, i) => (
              <div key={i} className="p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group flex flex-col justify-between">
                <div className="flex justify-between items-center mb-6 text-slate-900 dark:text-slate-100">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-xl ${m.status === 'Optimal' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'} ring-1 ring-black/5 shadow-inner`}>
                        <FiActivity className="w-4 h-4" />
                     </div>
                     <h4 className="text-sm font-black uppercase tracking-tight">{m.machine}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${m.status === 'Optimal' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white animate-pulse'}`}>{m.status}</span>
                </div>
                <div>
                   <div className="flex justify-between items-center text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                      <span>Health Index: {m.health}%</span>
                      <span>Next: {m.nextService}</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner ring-1 ring-black/5">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${m.health}%` }}
                       transition={{ duration: 1.5, delay: i * 0.2 }}
                       className={`h-full rounded-full ${m.health > 80 ? 'bg-emerald-500' : 'bg-rose-500'} shadow-glow-emerald`} 
                     />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Batches & Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-10">
             <div>
                <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Work Order Backlog</h3>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1">Real-time batch progress</p>
             </div>
             <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl border border-indigo-500/10">View Priority</button>
          </div>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div key={job.id} className="flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group text-slate-900 dark:text-slate-100">
                <div className="w-14 h-14 bg-indigo-600 text-white rounded-[24px] flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-xl shadow-indigo-600/20 uppercase tracking-tighter text-lg">
                  {job.id.split('-')[1]}
                </div>
                <div className="flex-1 text-center md:text-left overflow-hidden">
                  <h4 className="text-lg font-black uppercase tracking-tighter truncate">{job.product}</h4>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 flex items-center gap-2 justify-center md:justify-start">
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" /> {job.id} • Started: {job.startTime}
                  </p>
                </div>
                <div className="w-full md:w-64 text-center">
                  <div className="flex justify-between items-end mb-3 px-1">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Progress Trace</span>
                    <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{job.progress}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner ring-1 ring-black/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${job.progress}%` }}
                      transition={{ duration: 1, delay: 0.1 }}
                      className="h-full bg-indigo-600 rounded-full shadow-glow-indigo" 
                    />
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${job.priority === 'Critical' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-black/5'}`}>
                    {job.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 bg-slate-900 rounded-[48px] text-white shadow-2xl flex flex-col justify-between relative overflow-hidden group min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-indigo-700 to-transparent opacity-90 transition-opacity group-hover:opacity-100 duration-700" />
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[32px] flex items-center justify-center mb-8 ring-1 ring-white/20 group-hover:rotate-12 transition-transform duration-700">
               <FiSettings className="text-indigo-100" size={32} />
            </div>
            <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase leading-none">BOM Master</h3>
            <p className="text-indigo-100/70 font-medium text-[13px] leading-relaxed mb-12 max-w-[250px]">Configure enterprise-level production recipes with real-time cost roll-up and inventory reservation logic.</p>
            <div className="space-y-4">
              {['Fiscal Cost Analysis', 'Shrinkage Prediction', 'Multi-Level BOM Logic'].map((feat, i) => (
                <div key={i} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                  <FiCheckCircle className="w-4 h-4" /> {feat}
                </div>
              ))}
            </div>
          </div>
          <button className="w-full py-5 bg-white text-indigo-600 font-black rounded-3xl text-[10px] uppercase tracking-[0.4em] relative z-10 hover:bg-indigo-50 transition-all shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-95 mt-10">
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
              className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[48px] p-10 md:p-14 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">Dispatch Center</h2>
                  <p className="text-slate-500 font-black text-[10px] mt-1 uppercase tracking-[0.3em]">MES Workflow Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors active:scale-90"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={addJob} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Designation</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Turbine Impeller Unit v4" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-black"
                    value={newJob.product}
                    onChange={(e) => setNewJob({...newJob, product: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Dispatch Priority Matrix</label>
                  <div className="flex gap-3">
                    {['Medium', 'High', 'Critical'].map(p => (
                      <button 
                        key={p}
                        type="button"
                        onClick={() => setNewJob({...newJob, priority: p})}
                        className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          newJob.priority === p 
                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' 
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-transparent'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-5 bg-indigo-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95">
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


