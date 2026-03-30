'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCpu, FiActivity, FiLayers, FiAlertTriangle, 
  FiClock, FiCheckCircle, FiPlay, FiSettings, FiBarChart2, FiX 
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
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Shop Floor Control</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Enterprise manufacturing execution system (MES) & BOM management.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold hover:shadow-lg transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <FiBarChart2 /> Efficiency Audit
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <FiPlay /> Launch New Batch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Production Throughput */}
        <div className="xl:col-span-2 p-6 md:p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Unit Output Analytics</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 border border-slate-100 dark:border-slate-800 px-3 py-1.5 rounded-xl uppercase tracking-widest">Shift A (Morning)</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={0} minWidth={0}>
              <BarChart data={productionLog}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                <Bar dataKey="output" radius={[12, 12, 0, 0]} barSize={40}>
                  {productionLog.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Machine Health Metrics */}
        <div className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-black tracking-tight mb-8 text-slate-900 dark:text-white">Equipment Status</h3>
          <div className="space-y-6">
            {maintenanceSchedule.map((m, i) => (
              <div key={i} className="p-5 rounded-3xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                <div className="flex justify-between items-center mb-4 text-slate-900 dark:text-slate-100">
                  <h4 className="text-sm font-bold">{m.machine}</h4>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${m.status === 'Optimal' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 animate-pulse'}`}>{m.status}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Health Index: {m.health}%</span>
                  <span>Service: {m.nextService}</span>
                </div>
                <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${m.health}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className={`h-full rounded-full ${m.health > 80 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Batches & Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 md:p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <h3 className="text-xl font-black tracking-tight mb-8 text-slate-900 dark:text-white">Active Work Orders</h3>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div key={job.id} className="flex flex-col md:flex-row gap-6 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group text-slate-900 dark:text-slate-100">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 font-black group-hover:scale-110 transition-transform">
                  {job.id.split('-')[1]}
                </div>
                <div className="flex-1 text-center md:text-left overflow-hidden">
                  <h4 className="text-sm font-bold truncate">{job.product}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ID: {job.id} • Started: {job.startTime}</p>
                </div>
                <div className="w-full md:w-48 text-center">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                    <span className="text-xs font-black text-indigo-600">{job.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${job.progress}%` }}
                      transition={{ duration: 1, delay: 0.1 }}
                      className="h-full bg-indigo-600 rounded-full" 
                    />
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${job.priority === 'Critical' ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                    {job.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-slate-900 rounded-[40px] text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-indigo-600 to-transparent opacity-80" />
          <div className="relative">
            <FiSettings className="mb-6 opacity-80" size={32} />
            <h3 className="text-2xl font-black mb-2 tracking-tight">Bill of Materials (BOM)</h3>
            <p className="text-indigo-100 font-medium opacity-80 text-[13px] leading-relaxed mb-10">Configure multi-level production recipes with real-time cost estimation and shrinkage calculation.</p>
            <div className="space-y-3">
              {['Cost Roll-up', 'Waste Prediction', 'Sub-Batch Logic'].map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-bold text-emerald-400">
                  <FiCheckCircle size={14} /> {feat}
                </div>
              ))}
            </div>
          </div>
          <button className="w-full py-4 bg-white text-indigo-600 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] relative z-10 hover:bg-indigo-50 transition-all shadow-lg hover:scale-[1.02] active:scale-95 mt-8">
            Manage BOM Master
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[40px] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Launch Production Batch</h2>
                  <p className="text-slate-500 font-medium text-xs mt-1 uppercase tracking-widest font-black">MES Dispatcher</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={addJob} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Product Component</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Turbine Impeller Unit" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                    value={newJob.product}
                    onChange={(e) => setNewJob({...newJob, product: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Dispatch Priority</label>
                  <div className="flex gap-2">
                    {['Medium', 'High', 'Critical'].map(p => (
                      <button 
                        key={p}
                        type="button"
                        onClick={() => setNewJob({...newJob, priority: p})}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          newJob.priority === p 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="w-full mt-4 py-4 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:scale-[1.01]">
                  Initialize Workflow
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

