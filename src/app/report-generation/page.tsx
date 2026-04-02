'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransition } from 'react';
import { generateEnterpriseReport, registerReportBlueprint } from '@/app/actions/reports';
import { FiFileText, FiBarChart2, FiPieChart, FiChevronDown, FiDownload, FiArrowUpRight, FiSearch, FiPlus, FiX, FiLayers, FiUpload } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const ReportGenerationPage = () => {
  const [isPending, startTransition] = useTransition();
  const [templates, setTemplates] = useState([
    { id: 'T-01', name: 'Quarterly Revenue Retrospective', cluster: 'Sales', frequency: 'Quarterly' },
    { id: 'T-02', name: 'Inventory Health Audit', cluster: 'Logistics', frequency: 'Weekly' }
  ]);

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
  
  const COLORS = ['#2563eb', '#10b981', '#6366f1', '#f59e0b', '#0ea5e9'];

  const [reportType, setReportType] = useState('Sales Performance');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ name: '', cluster: 'Sales Performance', frequency: 'Monthly' });

    const startReportGeneration = () => {
    startTransition(async () => {
      setIsGenerating(true);
      const result = await generateEnterpriseReport('AUDIT', reportType);
      if (result.success) {
        setIsGenerating(false);
        alert(`SUCCESS: ${result.reportId} COMPLIED & ENCRYPTED.\nDownload Checksum: ${result.checksum}\nLocation: ${result.downloadUrl}`);
      }
    });
  };

    const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newTemplate.name);
    formData.append('cluster', newTemplate.cluster);
    formData.append('frequency', newTemplate.frequency);

    startTransition(async () => {
      const result = await registerReportBlueprint(formData);
      if (result.success) {
        setTemplates([{ id: result.template.id, ...newTemplate }, ...templates]);
        setIsModalOpen(false);
        setNewTemplate({ name: '', cluster: 'Sales Performance', frequency: 'Monthly' });
      }
    });
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold  tracking-[0.2em] mb-4">
            <FiLayers /> Intelligence Engine v3.2
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 ">Analytical Intelligence</h1>
          <p className="text-slate-900 font-bold tracking-tight mt-1 flex items-center gap-2">
            <FiBarChart2 className="text-blue-500" /> High-Fidelity Business Process Reporting Cluster
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <button 
             onClick={startReportGeneration} disabled={isGenerating || isPending}
             className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-bold transition-all flex items-center gap-2  tracking-widest hover:shadow-lg active:scale-95"
           >
             {isGenerating ? <div className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" /> : <FiUpload />} {isGenerating ? 'Archiving...' : 'Import Data'}
           </button>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-bold transition-all flex items-center gap-2  tracking-widest hover:shadow-lg active:scale-95"
           >
            <FiPlus /> Register Template
          </button>
          <button 
            onClick={startReportGeneration} disabled={isGenerating || isPending}
            className="px-10 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-bold shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center gap-3  tracking-[0.3em] relative overflow-hidden active:scale-95"
          >
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.span key="gen" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Compiling...
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-3">
                  <FiFileText size={16} /> Generate Report
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Report Config */}
        <div className="space-y-8">
          <div className="bg-white  rounded-[40px] border border-slate-200 border-slate-200 p-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
            <h2 className="text-[11px] font-bold text-blue-600 mb-8  tracking-[0.3em]">Execution Parameters</h2>
            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-bold  tracking-widest text-slate-900 ml-1">Analytical Domain</label>
                <div className="relative group/select">
                  <FiPieChart className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-900 group-hover/select:text-blue-500 transition-colors" />
                  <select 
                    value={reportType} 
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full bg-slate-50  border-none rounded-2xl py-4.5 pl-14 pr-6 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-900 appearance-none cursor-pointer"
                  >
                    <option>Sales Performance</option>
                    <option>Inventory Health</option>
                    <option>Customer Dynamics</option>
                    <option>Financial Audit</option>
                    <option>Logistics Nodes</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold  tracking-widest text-slate-900 ml-1">Temporal Horizon</label>
                <div className="relative group/select">
                  <FiBarChart2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-900 group-hover/select:text-blue-500 transition-colors" />
                  <select 
                    className="w-full bg-slate-50  border-none rounded-2xl py-4.5 pl-14 pr-6 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-900 appearance-none cursor-pointer"
                  >
                    <option>Last 6 Fiscal Months</option>
                    <option>Quarterly Analysis</option>
                    <option>Yearly Retrospective</option>
                    <option>Custom Epoch</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 space-y-5">
                <div className="p-6 bg-blue-500/5 /10 rounded-[32px] border border-blue-500/10">
                  <p className="text-[10px] font-bold  text-blue-500 tracking-[0.2em] mb-2 leading-none">Status: Stable</p>
                  <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 text-slate-900">Last Compilation</span>
                      <span className="text-[10px] font-bold text-slate-900">Mar 28, 2024</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-900 font-bold px-3 leading-relaxed  tracking-tight">
                  Reports are cryptographically hashed and committed to the secure audit ledger automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-200 p-10 shadow-sm">
             <h2 className="text-[11px] font-bold text-slate-900 mb-8  tracking-[0.3em]">Active Templates</h2>
             <div className="space-y-6">
                {templates.map((tpl, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50  rounded-xl flex items-center justify-center text-slate-900 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                           <FiFileText size={18} />
                        </div>
                        <div>
                           <p className="text-xs font-bold text-slate-900 text-slate-900 group-hover:text-blue-600 transition-colors">{tpl.name}</p>
                           <p className="text-[9px] font-bold text-slate-900  tracking-widest mt-0.5">{tpl.cluster} • {tpl.frequency}</p>
                        </div>
                     </div>
                     <FiArrowUpRight className="text-slate-300 group-hover:text-blue-500 transition-all" />
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Visual Analytics */}
        <div className="xl:col-span-2 space-y-8">
           <div className="bg-white  rounded-[40px] border border-slate-200 border-slate-200 p-10 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent opacity-50" />
              <div className="flex items-center justify-between mb-12">
                 <div>
                   <h3 className="text-2xl font-bold text-slate-900 text-slate-900 tracking-tighter  leading-none mb-1">Fiscal Trajectory</h3>
                   <p className="text-[10px] font-bold text-slate-900  tracking-widest">Revenue Vectors & Performance Anchors</p>
                 </div>
                 <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/10 px-5 py-2 rounded-2xl border border-emerald-500/10 font-bold text-xs">
                    <FiArrowUpRight /> +14.2% Growth
                 </div>
              </div>
              <div style={{ width: '100%', minWidth: 0 }}>
                <ResponsiveContainer width="100%" height={380}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" opacity={0.5} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#64748b'}} dy={10} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', fontWeight: 900, fontSize: '12px', padding: '20px' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="target" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="6 6" fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[40px] border border-slate-200 p-10 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-[11px] font-bold text-slate-900  tracking-[0.3em]">Substrate Mix</h3>
                   <FiPieChart className="text-blue-500" />
                </div>
                <div style={{ width: '100%', minWidth: 0 }}>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={inventoryData} cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value" stroke="none">
                        {inventoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                   {inventoryData.map((item, i) => (
                     <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-500/10 transition-all">
                        <div className="w-2.5 h-2.5 rounded-full shadow-lg" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="text-[9px] font-bold text-slate-900  tracking-tight truncate">{item.name}</span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-[40px] p-12 flex flex-col justify-center text-center relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-700">
                 <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700" />
                 <div className="w-24 h-24 bg-blue-50 rounded-[36px] flex items-center justify-center mx-auto mb-10 text-blue-600 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-blue-100">
                    <FiDownload size={36} />
                 </div>
                 <h4 className="text-2xl font-bold text-slate-900 mb-4  tracking-tighter leading-none ">Automated Archival</h4>
                 <p className="text-xs font-bold text-slate-900 leading-relaxed max-w-[240px] mx-auto mb-12  tracking-widest">
                   Enable scheduled delivery of <span className="text-blue-600">Encrypted Analytical Clusters</span> to authorized stakeholders.
                 </p>
                 <button className="py-6 bg-blue-600 text-white rounded-[32px] text-[10px] font-bold  tracking-[0.4em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 mx-auto px-16">
                   Configure cron
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Template Modal */}
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] p-12 md:p-16 border border-blue-500/20 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter text-slate-900  leading-none mb-2">Register Blueprint</h2>
                  <p className="text-slate-900 font-bold text-[10px]  tracking-[0.3em]">Analytical Intelligence Manifest</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-3xl transition-all active:scale-90"
                >
                  <FiX size={26} />
                </button>
              </div>

              <form onSubmit={handleAddTemplate} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold  tracking-widest text-slate-900 ml-1">Template Designation</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Sales Master Audit v3" 
                    className="w-full bg-slate-50  border-none rounded-2xl py-5 px-8 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-900"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold  tracking-widest text-slate-900 ml-1">Target Cluster</label>
                    <select 
                      className="w-full bg-slate-50  border-none rounded-2xl py-5 px-8 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-900 appearance-none cursor-pointer"
                      value={newTemplate.cluster}
                      onChange={(e) => setNewTemplate({...newTemplate, cluster: e.target.value})}
                    >
                      <option>Sales Performance</option>
                      <option>Inventory Health</option>
                      <option>Financial Audit</option>
                      <option>Logistics Nodes</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold  tracking-widest text-slate-900 ml-1">Temporal Frequency</label>
                    <select 
                      className="w-full bg-slate-50  border-none rounded-2xl py-5 px-8 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-900 appearance-none cursor-pointer"
                      value={newTemplate.frequency}
                      onChange={(e) => setNewTemplate({...newTemplate, frequency: e.target.value})}
                    >
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-6 bg-blue-600 text-white rounded-[32px] font-bold text-xs  tracking-[0.4em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                  <FiPlus /> Commit Template to Registry
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportGenerationPage;


