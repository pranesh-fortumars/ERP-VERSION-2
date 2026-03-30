'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiBarChart2, FiPieChart, FiChevronDown, FiDownload, FiArrowUpRight, FiSearch } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const ReportGenerationPage = () => {
  const salesData = [
    { month: 'Jan', revenue: 4500000, target: 4000000 },
    { month: 'Feb', revenue: 3800000, target: 4000000 },
    { month: 'Mar', revenue: 5200000, target: 4500000 },
    { month: 'Apr', revenue: 4800000, target: 4500000 },
    { month: 'May', revenue: 6100000, target: 5000000 },
    { month: 'Jun', revenue: 5900000, target: 5500000 },
  ];

  const inventoryData = [
    { name: 'Raw Materials', value: 45 },
    { name: 'WIP Goods', value: 25 },
    { name: 'Finished Inventory', value: 20 },
    { name: 'Transit Stock', value: 10 },
  ];
  
  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

  const [reportType, setReportType] = useState('Sales');
  const [isGenerating, setIsGenerating] = useState(false);

  const startGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Analytical Intelligence</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Generate high-fidelity reports and mission-critical business insights.</p>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl text-xs font-black transition-all flex items-center gap-2 uppercase tracking-widest hover:bg-slate-200">
            <FiDownload /> Export Archive
          </button>
          <button 
            onClick={startGeneration}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2 uppercase tracking-widest relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.span key="gen" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Compiling...
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-2">
                  <FiFileText /> Generate Report
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Report Config */}
        <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-[11px] text-blue-500">Parameters</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Report Domain</label>
              <div className="relative group">
                <FiPieChart className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <select 
                   value={reportType} 
                   onChange={(e) => setReportType(e.target.value)}
                   className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 pl-12 pr-4 text-xs font-black outline-none focus:ring-2 focus:ring-blue-500/10 dark:text-white appearance-none"
                >
                  <option>Sales Performance</option>
                  <option>Inventory Health</option>
                  <option>Customer Dynamics</option>
                  <option>Financial Audit</option>
                  <option>Logistics Nodes</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Temporal Horizon</label>
              <div className="relative group">
                <FiBarChart2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <select 
                   className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 pl-12 pr-4 text-xs font-black outline-none focus:ring-2 focus:ring-blue-500/10 dark:text-white appearance-none"
                >
                  <option>Last 6 Fiscal Months</option>
                  <option>Quarterly Analysis</option>
                  <option>Yearly Retrospective</option>
                  <option>Custom Epoch</option>
                </select>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="p-5 bg-blue-50/50 dark:bg-blue-900/10 rounded-[28px] border border-blue-100/50 dark:border-blue-500/10">
                 <p className="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-1 leading-none">Last Compilation</p>
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 dark:text-white">March 28, 2024</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-md text-[9px] font-black">STABLE</span>
                 </div>
              </div>
              <p className="text-[10px] text-slate-400 font-medium px-2 leading-relaxed">
                Reports are cryptographically signed and stored in the secure audit ledger. GST compliance is automatically verified.
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Visualization */}
        <div className="xl:col-span-2 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Revenue Vectors</h3>
                 <div className="flex items-center gap-2 text-emerald-500 font-black text-xs">
                    <FiArrowUpRight /> +14.2% Growth
                 </div>
              </div>
              <div style={{ width: '100%', minWidth: 0, minHeight: 320 }}>
                <ResponsiveContainer width="100%" height={320} minHeight={320}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 900, fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="target" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-[11px]">Substrate Mix</h3>
                <div style={{ width: '100%', minWidth: 0, minHeight: 200 }}>
                  <ResponsiveContainer width="100%" height={240} minHeight={240}>
                    <PieChart>
                      <Pie data={inventoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {inventoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                   {inventoryData.map((item, i) => (
                     <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{item.name}</span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col justify-center text-center">
                 <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <FiDownload size={32} />
                 </div>
                 <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">Automated Archival</h4>
                 <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-[200px] mx-auto">
                   Enable scheduled delivery of analytical clusters to stakeholders.
                 </p>
                 <button className="mt-6 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                   Configure cron
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerationPage;

