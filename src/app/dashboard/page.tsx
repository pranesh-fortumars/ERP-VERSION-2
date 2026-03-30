'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiActivity, FiBox, FiUsers, FiDollarSign, 
  FiTrendingUp, FiArrowUpRight, FiArrowDownRight,
  FiZap, FiServer, FiShield, FiCpu, FiGlobe, FiTarget, FiAlertTriangle, FiCheckCircle
} from 'react-icons/fi';
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Line
} from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';

const DashboardPage = () => {
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

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Professional Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Command Center</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 flex items-center gap-2">
            <FiGlobe className="text-blue-600" /> Real-time Enterprise Telemetry • Node Cluster Alpha
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-lg hover:bg-slate-50 transition-all font-sans">
            Audit Logs
          </button>
          <button className="bg-blue-600 text-white px-8 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
            System Report
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
              <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded ${
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
        <div className="lg:col-span-2 industrial-card p-8 flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Througput Intelligence</h3>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Operational Flux Monitoring</p>
            </div>
            <div className="flex gap-2">
               {['Revenue', 'Volume'].map((m, i) => (
                 <button key={i} className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded transition-all ${i === 0 ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'}`}>
                   {m}
                 </button>
               ))}
            </div>
          </div>
          <div className="h-[350px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Line type="monotone" dataKey="production" stroke="#059669" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="industrial-card p-8 bg-slate-900 text-white flex-1 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center mb-6">
                <FiZap size={20} />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2 uppercase">System Health</h3>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">Infrastructure status is currently optimal across all nodes.</p>
            </div>
            <div className="pt-8 border-t border-white/10 flex items-end justify-between">
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Utilization</p>
                <p className="text-3xl font-bold">92.4%</p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
            </div>
          </div>

          <div className="industrial-card p-8">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Security Perimeter</h3>
            <div className="space-y-6">
              {[
                { label: 'Gateway Firewall', status: 'Active', color: 'emerald' },
                { label: 'Cloud Relays', status: 'Optimal', color: 'blue' },
                { label: 'BPA Engines', status: 'Scaling', color: 'amber' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">{item.label}</span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded bg-${item.color}-500/10 text-${item.color}-600 border border-${item.color}-500/20`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incident Ledger */}
      <div className="industrial-card overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest">Incident Tracking Ledger</h3>
          <span className="text-[10px] font-black text-blue-600 bg-blue-600/10 px-3 py-1 rounded">3 Pending</span>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {[
            { id: 'INC-901', type: 'Production Latency', severity: 'High', status: 'Reviewing' },
            { id: 'INC-842', type: 'Quality Deviation', severity: 'Med', status: 'Logged' },
            { id: 'INC-715', type: 'Node Desync', severity: 'Low', status: 'Resolved' }
          ].map((inc, j) => (
            <div key={j} className="p-4 flex items-center justify-between data-table-row">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${inc.severity === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                <div>
                   <p className="text-xs font-bold text-slate-900 dark:text-white">{inc.type}</p>
                   <p className="text-[10px] font-medium text-slate-400">{inc.id} • Unit-7A</p>
                </div>
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{inc.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
