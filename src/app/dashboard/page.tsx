'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiActivity, FiBox, FiUsers, FiDollarSign, FiTrendingUp, FiArrowUpRight, FiArrowDownRight, FiZap, FiServer, FiShield, FiCpu, FiGlobe, FiTarget, FiAlertTriangle, FiCheckCircle, FiPlus, FiX, FiDownload } from 'react-icons/fi';
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Line
} from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';
import { useIndustry } from '@/context/IndustryContext';

const DashboardPage = () => {
  const { activeIndustry } = useIndustry();
  const [incidents, setIncidents] = useState([
    { id: 'INC-901', type: 'Production Latency', severity: 'High', status: 'Reviewing', time: '14:20:01' },
    { id: 'INC-842', type: 'Quality Deviation', severity: 'Med', status: 'Logged', time: '13:45:12' },
    { id: 'INC-715', type: 'Node Desync', severity: 'Low', status: 'Resolved', time: '10:12:45' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [newIncident, setNewIncident] = useState({ type: '', severity: 'Low', node: activeIndustry.id });

  const stats = [
    { label: 'Total Revenue', value: activeIndustry.stats.revenue, change: '+12.5%', isUp: true, icon: <FiDollarSign className="w-5 h-5" />, color: 'blue' },
    { label: 'Active Orders', value: activeIndustry.stats.throughput, change: '+5.2%', isUp: true, icon: <FiBox className="w-5 h-5" />, color: 'emerald' },
    { label: 'OEE Status', value: activeIndustry.stats.efficiency, change: '-0.4%', isUp: false, icon: <FiActivity className="w-5 h-5" />, color: 'rose' },
    { label: 'Workforce', value: activeIndustry.stats.workforce, change: '+2.1%', isUp: true, icon: <FiUsers className="w-5 h-5" />, color: 'amber' },
  ];

  const chartData = [
    { name: 'Mon', revenue: 4000, production: 2400, efficiency: 70 },
    { name: 'Tue', revenue: 3000, production: 1398, efficiency: 85 },
    { name: 'Wed', revenue: 2000, production: 9800, efficiency: 65 },
    { name: 'Thu', revenue: 2780, production: 3908, efficiency: 92 },
    { name: 'Fri', revenue: 1890, production: 4800, efficiency: 78 },
    { name: 'Sat', revenue: 2390, production: 3800, efficiency: 88 },
    { name: 'Sun', revenue: 3490, production: 4300, efficiency: 74 },
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('PRODUCTION PROTOCOL: Enterprise State PDF generated. Shared to secure cloud archival.');
    }, 2000);
  };

  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `INC-${Math.floor(Math.random() * 900 + 100)}`;
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setIncidents([{ id, ...newIncident, status: 'Logged', time }, ...incidents]);
    setIsModalOpen(false);
    setNewIncident({ type: '', severity: 'Low', node: activeIndustry.id });
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Professional Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[14px] font-serif-professional tracking-wide  tracking-widest mb-4 border border-blue-100 font-black">
            <FiGlobe className="animate-spin-slow-slow" /> Global Command Infrastructure • {activeIndustry.name}
          </div>
          <h1 className="text-4xl font-serif-professional tracking-tight tracking-tight text-slate-950 uppercase leading-none">{activeIndustry.type} Matrix</h1>
          <p className="text-slate-950 font-bold text-xl mt-3 flex items-center gap-2">
            <FiActivity className="text-blue-600" /> Real-time Node Telemetry & Orchestration Dashboard for {activeIndustry.location}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <button 
             onClick={() => setIsAuditOpen(true)}
             className="bg-white border border-slate-200 text-[14px] font-serif-professional tracking-wide  tracking-widest px-6 py-3 rounded-[24px] hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
           >
             <FiServer size={14} /> Audit Engine
           </button>
           <button 
             onClick={handleExport}
             disabled={isExporting}
             className="bg-white border border-slate-200 text-[14px] font-serif-professional tracking-wide  tracking-widest px-6 py-3 rounded-[24px] hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
           >
             {isExporting ? <div className="w-3 h-3 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin-slow" /> : <FiDownload />} {isExporting ? 'Generating...' : 'PDF Export'}
           </button>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="bg-blue-600 text-white px-14 py-3 rounded-[24px] text-[14px] font-serif-professional tracking-wide  tracking-[0.3em] shadow-xl shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
           >
             <FiPlus /> Log Incident
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} key={i} className="industrial-card animate-fade-up p-10 flex flex-col justify-between bg-white border border-slate-100 shadow-sm rounded-[40px] hover:shadow-2xl transition-all duration-700 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
             <div className="flex justify-between items-start mb-10 relative z-10">
                <div className={`w-14 h-14 rounded-[24px] flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform text-3xl ${
                  stat.color === 'blue' ? 'bg-blue-600 shadow-blue-600/20' :
                  stat.color === 'emerald' ? 'bg-emerald-600 shadow-emerald-600/20' :
                  stat.color === 'rose' ? 'bg-rose-600 shadow-rose-600/20' :
                  'bg-amber-600 shadow-amber-600/20'
                }`}>
                   {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-[14px] font-black px-3 py-1.5 rounded-xl shadow-sm border ${
                  stat.isUp ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                }`}>
                  {stat.isUp ? <FiArrowUpRight /> : <FiArrowDownRight />} {stat.change}
                </div>
             </div>
             <div className="relative z-10">
                <p className="text-[16px] font-black text-slate-950 uppercase tracking-widest mb-3">{stat.label}</p>
                <h3 className="text-3xl font-serif-professional tracking-tight text-slate-950 tracking-tight leading-none">{stat.value}</h3>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 industrial-card animate-fade-up p-10 flex flex-col relative overflow-hidden bg-white border border-slate-100 shadow-sm rounded-[40px]">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-[0.03] rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 relative z-10 gap-6">
            <div>
              <h3 className="text-3xl font-serif-professional tracking-tight text-slate-950 uppercase tracking-tight ">Throughput Intelligence</h3>
              <p className="text-[14px] font-black text-slate-950 uppercase tracking-widest mt-1">Operational Flux Monitoring</p>
            </div>
            <div className="flex gap-3">
               {['Revenue Flux', 'Batch Yield'].map((m, i) => (
                 <button key={i} className={`text-[12px] font-serif-professional uppercase tracking-widest px-6 py-2.5 rounded-[24px] transition-all ${i === 0 ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'bg-slate-50 text-slate-950 border border-slate-100 hover:bg-white'}`}>
                   {m}
                 </button>
               ))}
            </div>
          </div>
          <div className="h-[400px] w-full flex-1 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                   {/* ... gradients ... */}
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 900 }} dy={10} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={4} fillOpacity={0.1} fill="#2563eb" name="Revenue Flux" />
                <Area type="monotone" dataKey="production" stroke="#10b981" strokeWidth={4} fillOpacity={0.1} fill="#10b981" name="Batch Yield" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-8">
           <div className="industrial-card animate-fade-up p-10 bg-blue-600 text-white flex-1 flex flex-col justify-between relative overflow-hidden group shadow-2xl rounded-[40px]">
              <div className="absolute inset-0 bg-white opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              <div className="relative z-10">
                 <div className="w-16 h-16 bg-white/10 rounded-[28px] border border-white/20 flex items-center justify-center mb-8 backdrop-blur shadow-2xl">
                    <FiZap size={28} />
                 </div>
                 <h3 className="text-3xl font-serif-professional tracking-tight tracking-tight mb-4 uppercase ">System Health</h3>
                 <p className="text-blue-50 text-xl font-bold leading-relaxed">Infrastructure status is currently <span className="text-white font-black underline decoration-blue-400 underline-offset-4">Optimal</span> across all nodes.</p>
              </div>
              <div className="pt-10 border-t border-white/10 flex items-end justify-between relative z-10">
                 <div>
                    <p className="text-[14px] font-black text-blue-200 uppercase tracking-[0.3em] mb-2">Cluster Util</p>
                    <p className="text-3xl font-black tracking-tight ">92.4%</p>
                 </div>
                 <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-white animate-spin-slow shadow-2xl" />
              </div>
           </div>

           <div className="industrial-card animate-fade-up p-10 bg-white border border-slate-100 shadow-sm rounded-[40px]">
              <h3 className="text-[13px] font-black text-slate-950 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                 <FiShield className="text-blue-600" /> Security Perimeter
              </h3>
              <div className="space-y-6">
                 {[
                   { label: 'Gateway Firewall', status: 'Active', color: 'emerald' },
                   { label: 'Cloud Relays', status: 'Optimal', color: 'blue' },
                   { label: 'BPA Engines', status: 'Scaling', color: 'amber' }
                 ].map((item, i) => (
                   <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} key={i} className="flex items-center justify-between group">
                     <span className="text-[14px] font-black text-slate-950 uppercase tracking-widest group-hover:text-blue-600 transition-colors">{item.label}</span>
                     <span className={`text-[12px] font-serif-professional uppercase px-4 py-1.5 rounded-xl border shadow-sm ${
                       item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                       item.color === 'blue' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                       'bg-amber-50 text-amber-600 border-amber-100'
                     }`}>{item.status}</span>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="industrial-card animate-fade-up flex flex-col bg-white border border-slate-100 shadow-sm rounded-[40px] overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-10 bg-slate-50/20">
           <div>
              <h3 className="text-3xl font-serif-professional tracking-tight text-slate-950 uppercase tracking-tight ">Incident Tracking Ledger</h3>
              <p className="text-[14px] font-black text-slate-950 uppercase tracking-widest mt-1">Real-time Node Telemetry Log</p>
           </div>
           <span className="text-[14px] font-black text-white bg-slate-900 px-6 py-2.5 rounded-[24px] uppercase tracking-widest">
              {incidents.filter(i => i.status !== 'Resolved').length} Pending Vectors
           </span>
        </div>
        <div className="divide-y divide-slate-50">
           {incidents.map((inc) => (
             <div key={inc.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-8">
                   <div className={`w-3 h-3 rounded-full shadow-[0_0_15px] ${
                     inc.severity === 'High' ? 'bg-rose-500 shadow-rose-500' : 
                     inc.severity === 'Med' ? 'bg-amber-500 shadow-amber-500' : 
                     'bg-blue-600 shadow-blue-600'
                   }`} />
                   <div>
                      <p className="text-3xl font-serif-professional tracking-tight text-slate-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{inc.type}</p>
                      <p className="text-[12px] font-serif-professional text-slate-950 uppercase tracking-[0.2em] mt-1">{inc.id} • {inc.time}</p>
                   </div>
                </div>
                <div className="flex items-center gap-10">
                   <div className="text-right hidden md:block">
                      <p className="text-[12px] font-serif-professional text-slate-950 uppercase tracking-widest mb-1">Severity</p>
                      <p className={`text-[14px] font-serif-professional tracking-wide  ${inc.severity === 'High' ? 'text-rose-600' : 'text-slate-950'}`}>{inc.severity}</p>
                   </div>
                   <span className={`px-6 py-2 rounded-xl text-[12px] font-serif-professional uppercase tracking-widest border border-slate-100 ${
                     inc.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-white text-slate-950'
                   }`}>
                      {inc.status}
                   </span>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Incident Modal */}
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] p-8 border border-blue-500/20 shadow-3xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-serif-professional tracking-tight tracking-tight text-slate-950 uppercase leading-none">Log Global Incident</h2>
                  <p className="text-[14px] font-black text-slate-950 mt-2 uppercase tracking-[0.3em]">Critical Infrastructure Telemetry</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-slate-50 rounded-[24px] transition-all"><FiX size={24} /></button>
              </div>

              <form onSubmit={handleAddIncident} className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Incident Classification</label>
                  <input required type="text" placeholder="e.g. Node Cluster Desync" className="w-full bg-slate-50 border-none rounded-[32px] py-4 px-8 text-xl font-black outline-none focus:ring-4 focus:ring-blue-600/5 text-slate-950" 
                         value={newIncident.type} onChange={(e) => setNewIncident({...newIncident, type: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Severity Vector</label>
                    <select className="w-full bg-slate-50 border-none rounded-[32px] py-4 px-8 text-xl font-black outline-none focus:ring-4 focus:ring-blue-600/5 text-slate-950 appearance-none"
                            value={newIncident.severity} onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})}>
                      <option>Low</option>
                      <option>Med</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Origin Node</label>
                    <input disabled required type="text" className="w-full bg-slate-100 border-none rounded-[32px] py-4 px-8 text-xl font-black outline-none text-slate-950 opacity-50 cursor-not-allowed"
                           value={activeIndustry.id} />
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-4 bg-blue-600 text-white rounded-[32px] font-black text-base uppercase tracking-[0.4em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                   <FiAlertTriangle /> Commit Incident to discovery hub
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Audit Modal */}
      <AnimatePresence>
        {isAuditOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-end p-0 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAuditOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative w-full max-w-2xl h-full md:h-[calc(100vh-3rem)] bg-white rounded-none md:rounded-[40px] p-8 border-l border-slate-200 shadow-3xl overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-serif-professional tracking-tight tracking-tight text-slate-950 uppercase leading-none">Audit Engine</h2>
                  <p className="text-[14px] font-black text-slate-950 mt-2 uppercase tracking-[0.3em]">System Identity & Access Logs</p>
                </div>
                <button onClick={() => setIsAuditOpen(false)} className="p-4 hover:bg-slate-50 rounded-[24px] transition-all"><FiX size={28} /></button>
              </div>
              <div className="space-y-8">
                 {[1,2,3,4,5,6].map((log) => (
                   <div key={log} className="p-8 bg-slate-50 rounded-[40px] border border-transparent hover:border-blue-600/10 transition-all group">
                      <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-3">
                            <FiShield className="text-blue-600" size={20} />
                            <span className="text-[14px] font-black text-slate-950 uppercase tracking-widest">Access Authorized</span>
                         </div>
                         <span className="text-[13px] font-bold text-slate-950">14:02:{10+log} AM</span>
                      </div>
                      <p className="text-base font-bold text-slate-950 leading-relaxed uppercase tracking-tight">
                         User <span className="text-blue-600">Admin_Root</span> initiated metadata sync for Node cluster {log}A. Security check: <span className="text-emerald-500 underline decoration-emerald-200">Passed</span>.
                      </p>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-12 py-7 bg-slate-900 text-white rounded-[40px] font-black text-[14px] uppercase tracking-[0.4em] hover:bg-black transition-all shadow-2xl">Download Full Audit Trail</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
