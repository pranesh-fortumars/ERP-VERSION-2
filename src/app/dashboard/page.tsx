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
    { label: 'Total Revenue', value: '₹4.2 Cr', change: '+12.5%', isUp: true, icon: <FiDollarSign className="w-5 h-5 md:w-6 md:h-6" />, color: 'indigo' },
    { label: 'Active Orders', value: '1,284', change: '+5.2%', isUp: true, icon: <FiBox className="w-5 h-5 md:w-6 md:h-6" />, color: 'teal' },
    { label: 'OEE Status', value: '94.2%', change: '-0.4%', isUp: false, icon: <FiActivity className="w-5 h-5 md:w-6 md:h-6" />, color: 'rose' },
    { label: 'Workforce', value: '850', change: '+2.1%', isUp: true, icon: <FiUsers className="w-5 h-5 md:w-6 md:h-6" />, color: 'amber' },
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
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 transition-colors duration-500">
      {/* Dynamic Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" /> Live Telemetry Overview
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Command Center</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-1 flex items-center gap-2">
            <FiGlobe className="text-indigo-500" /> Real-time Enterprise Resource Intelligence • v2.4.0
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3 pr-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter ring-1 ring-slate-200 dark:ring-slate-700">
                 {String.fromCharCode(64 + i)}
               </div>
             ))}
          </div>
          <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-2xl hover:shadow-lg transition-all active:scale-95 shadow-sm text-slate-600 dark:text-slate-300">
            Audit Logs
          </button>
          <button className="bg-indigo-600 text-white px-8 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-2">
            <FiTrendingUp className="w-3.5 h-3.5" /> System Report
          </button>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-indigo-500/50 transition-all duration-500 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${
                stat.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-600' :
                stat.color === 'teal' ? 'bg-teal-500/10 text-teal-600' :
                stat.color === 'rose' ? 'bg-rose-500/10 text-rose-600' :
                'bg-amber-500/10 text-amber-600'
              } group-hover:scale-110 transition-transform duration-500 shadow-inner ring-1 ring-black/5`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full ${
                stat.isUp ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
              } border border-black/5`}>
                {stat.isUp ? <FiArrowUpRight className="w-3 h-3" /> : <FiArrowDownRight className="w-3 h-3" />} {stat.change}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Analytics Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Operational Intelligence</h3>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1">Real-time throughput analytics</p>
            </div>
            <div className="flex gap-4">
               {['Revenue', 'OEE', 'Incidents'].map((m, i) => (
                 <button key={i} className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${i === 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-black/5'}`}>
                   {m}
                 </button>
               ))}
            </div>
          </div>
          <div className="h-[400px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%" minHeight={300} minWidth={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                <Line type="monotone" dataKey="production" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8 flex flex-col">
           {/* Production Heath Card */}
          <div className="p-10 bg-indigo-600 rounded-[48px] text-white shadow-2xl shadow-indigo-600/40 relative overflow-hidden group flex-1 flex flex-col justify-between min-h-[300px]">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-[24px] flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform duration-700 shadow-inner ring-1 ring-white/20">
                <FiZap className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black tracking-tight mb-3 uppercase">Production Flux</h3>
              <p className="text-indigo-100/70 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed mb-12 max-w-[200px]">System capacity utilization is currently at optimal high-performance.</p>
            </div>
            <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-8">
              <div>
                <p className="text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-1">Current Output</p>
                <p className="text-4xl font-black tracking-tighter">92.4%</p>
              </div>
              <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20">
                Details
              </button>
            </div>
            {/* Abstract Background Shapes */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-400/20 rounded-full blur-[60px] pointer-events-none" />
          </div>

          {/* Infrastructure Health */}
          <div className="p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <div>
                 <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">Stack Integrity</h3>
                 <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Status: Operational</p>
               </div>
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-glow-emerald shadow-emerald-500/40" />
            </div>
            <div className="space-y-8">
              {[
                { label: 'Cloud Systems', status: 'Optimal', icon: <FiServer className="w-5 h-5 text-indigo-500" /> },
                { label: 'Security Firewall', status: 'Active', icon: <FiShield className="w-5 h-5 text-emerald-500" /> },
                { label: 'Automation Engine', status: 'Scaling', icon: <FiCpu className="w-5 h-5 text-amber-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-inner ring-1 ring-black/5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.label}</p>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">{item.status}</p>
                    </div>
                  </div>
                  <FiArrowUpRight className="text-slate-200 group-hover:text-slate-600 dark:group-hover:text-indigo-400 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incidents Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Critical Alerts</h3>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1">Incident monitoring backlog</p>
               </div>
               <span className="bg-rose-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-500/30">
                 3 Pending
               </span>
            </div>
            <div className="space-y-4">
               {[
                 { id: 'INC-901', type: 'Production Delay', severity: 'High', status: 'Blocked', icon: <FiAlertTriangle className="text-rose-500" /> },
                 { id: 'INC-842', type: 'Quality Deviation', severity: 'Medium', status: 'Investigating', icon: <FiTarget className="text-amber-500" /> },
                 { id: 'INC-715', type: 'Resource Lock', severity: 'Low', status: 'Resolved', icon: <FiCheckCircle className="text-emerald-500" /> }
               ].map((inc, j) => (
                 <div key={j} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/10 rounded-[32px] border border-transparent hover:border-indigo-500/20 transition-all group">
                    <div className="flex items-center gap-5">
                       <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
                          {inc.icon}
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{inc.type}</p>
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{inc.id} • UNIT-7A</p>
                       </div>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${inc.status === 'Blocked' ? 'bg-rose-500 text-white' : inc.status === 'Resolved' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'} shadow-lg ring-4 ring-white dark:ring-slate-900`}>
                       {inc.status}
                    </span>
                 </div>
               ))}
            </div>
        </div>

        <div className="p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />
           <div className="relative z-10 w-24 h-24 bg-indigo-500/10 rounded-[32px] flex items-center justify-center mb-10 text-indigo-600 shadow-inner group transition-transform hover:scale-110 duration-700">
             <FiCheckCircle className="w-12 h-12" />
           </div>
           <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 uppercase">ISO Audit Ready</h3>
           <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mb-12 leading-relaxed">
             Enterprise compliance score is <span className="text-indigo-600 dark:text-indigo-400 font-black">98.4%</span>. All Indian statutory filings for Q3 2024 are synchronized and verified.
           </p>
           <div className="flex gap-4 w-full justify-center">
             <button className="flex-1 max-w-[200px] py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all">
               Initialize Audit
             </button>
             <button className="flex-1 max-w-[150px] py-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95">
               History
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
