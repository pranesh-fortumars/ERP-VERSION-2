'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiActivity, FiBox, FiUsers, FiDollarSign, 
  FiTrendingUp, FiArrowUpRight, FiArrowDownRight,
  FiZap, FiServer, FiShield, FiCpu, FiGlobe, FiTarget, FiAlertTriangle, FiCheckCircle, FiPlus, FiX
} from 'react-icons/fi';
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Line
} from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';

const DashboardPage = () => {
  const [incidents, setIncidents] = useState([
    { id: 'INC-901', type: 'Production Latency', severity: 'High', status: 'Reviewing' },
    { id: 'INC-842', type: 'Quality Deviation', severity: 'Med', status: 'Logged' },
    { id: 'INC-715', type: 'Node Desync', severity: 'Low', status: 'Resolved' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIncident, setNewIncident] = useState({ type: '', severity: 'Low', node: 'Unit-7A' });

  const stats = [
    { label: 'Total Revenue', value: '₹4.2 Cr', change: '+12.5%', isUp: true, icon: <FiDollarSign className="w-5 h-5" />, color: 'blue' },
    { label: 'Active Orders', value: '1,284', change: '+5.2%', isUp: true, icon: <FiBox className="w-5 h-5" />, color: 'emerald' },
    { label: 'OEE Status', value: '94.2%', change: '-0.4%', isUp: false, icon: <FiActivity className="w-5 h-5" />, color: 'rose' },
    { label: 'Workforce', value: '850', change: '+2.1%', isUp: true, icon: <FiUsers className="w-5 h-5" />, color: 'amber' },
  ];

  const chartData = [
    { name: 'Mon', revenue: 4000, production: 2400 },
    { name: 'Tue', revenue: 3000, production: 1398 },
    { name: 'Wed', revenue: 2000, production: 9800 },
    { name: 'Thu', revenue: 2780, production: 3908 },
    { name: 'Fri', revenue: 1890, production: 4800 },
    { name: 'Sat', revenue: 2390, production: 3800 },
    { name: 'Sun', revenue: 3490, production: 4300 },
  ];

  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `INC-${Math.floor(Math.random() * 900 + 100)}`;
    setIncidents([{ id, ...newIncident, status: 'Logged' }, ...incidents]);
    setIsModalOpen(false);
    setNewIncident({ type: '', severity: 'Low', node: 'Unit-7A' });
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Professional Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">Command Center</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 flex items-center gap-2">
            <FiGlobe className="text-blue-600" /> Real-time Enterprise Telemetry • Node Cluster Alpha
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-lg hover:bg-slate-50 transition-all">
            Audit Logs
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <FiPlus /> Log Incident
          </button>
        </div>
      </div>

      {/* Tighter Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="industrial-card p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-600/10 text-blue-600' :
                stat.color === 'emerald' ? 'bg-emerald-600/10 text-emerald-600' :
                stat.color === 'rose' ? 'bg-rose-600/10 text-rose-600' :
                'bg-amber-600/10 text-amber-600'
              }`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded shadow-sm ${
                stat.isUp ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
              }`}>
                {stat.isUp ? <FiArrowUpRight /> : <FiArrowDownRight />} {stat.change}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Geometric Analytics Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 industrial-card p-8 flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-[0.03] rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between mb-10 relative z-10">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Throughput Intelligence</h3>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Operational Flux Monitoring</p>
            </div>
            <div className="flex gap-2">
               {['Revenue', 'Volume'].map((m, i) => (
                 <button key={i} className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'}`}>
                   {m}
                 </button>
               ))}
            </div>
          </div>
          <div className="h-[350px] w-full flex-1 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-200" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 900 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 900 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Line type="monotone" dataKey="production" stroke="#059669" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="industrial-card p-8 bg-slate-900 dark:bg-blue-600 text-white flex-1 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-white opacity-[0.05] pointer-events-none grid-dots" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur">
                <FiZap size={24} />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-2 uppercase italic">System Health</h3>
              <p className="text-white/70 text-xs font-medium leading-relaxed">Infrastructure status is currently optimal across all nodes.</p>
            </div>
            <div className="pt-8 border-t border-white/10 flex items-end justify-between relative z-10">
              <div>
                <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em] mb-1">Utilization</p>
                <p className="text-4xl font-black tracking-tighter">92.4%</p>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-white/20 border-t-white animate-spin shadow-2xl" />
            </div>
          </div>

          <div className="industrial-card p-8">
            <h3 className="text-[11px] font-black text-slate-900 dark:text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <FiShield /> Security Perimeter
            </h3>
            <div className="space-y-5">
              {[
                { label: 'Gateway Firewall', status: 'Active', color: 'emerald' },
                { label: 'Cloud Relays', status: 'Optimal', color: 'blue' },
                { label: 'BPA Engines', status: 'Scaling', color: 'amber' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                  <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border shadow-sm ${
                    item.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10' :
                    item.color === 'blue' ? 'bg-blue-500/10 text-blue-600 border-blue-500/10' :
                    'bg-amber-500/10 text-amber-600 border-amber-500/10'
                  }`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incident Ledger */}
      <div className="industrial-card overflow-hidden">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/30 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Incident Tracking Ledger</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time Node Telemetry</p>
          </div>
          <span className="text-[10px] font-black text-blue-600 bg-blue-600/10 px-4 py-1.5 rounded-xl border border-blue-500/10 uppercase tracking-widest">
            {incidents.filter(i => i.status !== 'Resolved').length} Pending Execution
          </span>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-200/5">
          <AnimatePresence mode="popLayout">
            {incidents.map((inc, j) => (
              <motion.div 
                layout
                key={inc.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 flex items-center justify-between data-table-row group cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-3 h-3 rounded-full shadow-lg ${
                    inc.severity === 'High' ? 'bg-rose-500 shadow-rose-500/20' : 
                    inc.severity === 'Med' ? 'bg-amber-500 shadow-amber-500/20' : 
                    'bg-blue-500 shadow-blue-500/20'
                  }`} />
                  <div>
                    <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{inc.type}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{inc.id} • Unit-7A</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right hidden md:block">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Severity</p>
                     <p className={`text-[10px] font-black uppercase ${inc.severity === 'High' ? 'text-rose-600' : 'text-slate-600'}`}>{inc.severity}</p>
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-100 px-4 py-1.5 rounded-lg border border-black/5">
                    {inc.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[48px] p-12 border border-blue-500/20 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Log Global Incident</h2>
                  <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.3em]">Critical Infrastructure Telemetry</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-slate-100 rounded-2xl transition-all"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleAddIncident} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Incident Classification</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Node Cluster Desync" 
                    className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm font-black outline-none focus:ring-2 focus:ring-blue-500/10"
                    value={newIncident.type}
                    onChange={(e) => setNewIncident({...newIncident, type: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Severity Vector</label>
                    <select 
                      className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm font-black outline-none focus:ring-2 focus:ring-blue-500/10 appearance-none"
                      value={newIncident.severity}
                      onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})}
                    >
                      <option>Low</option>
                      <option>Med</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Origin Node</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Unit-7A" 
                      className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm font-black outline-none focus:ring-2 focus:ring-blue-500/10"
                      value={newIncident.node}
                      onChange={(e) => setNewIncident({...newIncident, node: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-6 bg-blue-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                  <FiAlertTriangle /> Commit Incident to Discovery Hub
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;

