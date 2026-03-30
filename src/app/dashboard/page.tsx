'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, FiBox, FiUsers, FiDollarSign, FiClock, 
  FiAlertTriangle, FiCheckCircle, FiActivity, FiGlobe, FiArrowUpRight, FiZap, FiTarget 
} from 'react-icons/fi';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend, LineChart, Line 
} from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';

const DashboardPage = () => {
  const revenueData = [
    { name: 'Week 1', revenue: 4500000, target: 4000000, expenses: 3100000 },
    { name: 'Week 2', revenue: 5200000, target: 4200000, expenses: 3400000 },
    { name: 'Week 3', revenue: 4800000, target: 4400000, expenses: 3200000 },
    { name: 'Week 4', revenue: 6100000, target: 4600000, expenses: 3800000 },
  ];

  const operationalOEE = [
    { name: 'Availability', value: 88, color: '#6366f1' },
    { name: 'Performance', value: 92, color: '#10b981' },
    { name: 'Quality', value: 98, color: '#f59e0b' },
  ];

  const stats = [
    { label: 'Net Revenue', value: '₹2.06 Cr', change: '+12.5%', icon: FiDollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { label: 'OEE Status', value: '92.6%', change: '+2.1%', icon: FiActivity, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Active Jobs', value: '42', change: '-4', icon: FiZap, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Workforce', value: '1,240', change: '+12', icon: FiUsers, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  ];

  const incidents = [
    { id: 'INC-721', type: 'Production Delay', severity: 'Medium', status: 'Investigating', time: '2h ago' },
    { id: 'INC-719', type: 'Quality Deviation', severity: 'High', status: 'Blocked', time: '5h ago' },
    { id: 'INC-715', type: 'Resource Shortage', severity: 'Low', status: 'Resolved', time: '1d ago' },
  ];

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" /> Live Enterprise Stream
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">Operation Command</h1>
          <p className="text-slate-500 font-medium tracking-tight flex items-center gap-2">
            <FiGlobe className="text-indigo-500" /> Real-time Enterprise Resource Intelligence • Mumbai & Pune Units
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold hover:shadow-lg transition-all">Audit Logs</button>
          <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2">
            <FiTrendingUp /> Growth Forecast
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all grow group"
          >
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} w-fit mb-6 transition-transform group-hover:scale-110`}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black">{stat.value}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Intelligence */}
        <div className="lg:col-span-2 p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Revenue Stream Intelligence</h3>
              <p className="text-xs font-medium text-slate-500 mt-1">Aggregated financial performance against quarterly targets</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                <span className="w-2 h-2 rounded-full bg-indigo-500" /> Revenue
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                <span className="w-2 h-2 rounded-full bg-slate-400" /> Expenses
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={0} minWidth={0}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} tickFormatter={(value) => `₹${value/100000}L`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="6 6" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" stroke="#94a3b8" strokeWidth={2} fill="transparent" strokeDasharray="3 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Manufacturing Health / OEE */}
        <div className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold tracking-tight mb-1">Unit Efficiency (OEE)</h3>
          <p className="text-xs font-medium text-slate-500 mb-8">Overall Equipment Effectiveness breakdown</p>
          
          <div className="flex-1 space-y-10">
            {operationalOEE.map((oee, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <FiTarget className="text-slate-300" size={14} />
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{oee.name}</p>
                  </div>
                  <p className="text-lg font-black text-indigo-600">{oee.value}%</p>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${oee.value}%` }}
                    transition={{ duration: 1.2, delay: i * 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: oee.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 dark:border-emerald-500/20">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600">
                <FiCheckCircle size={18} />
              </div>
              <div>
                <p className="text-xs font-black text-emerald-900 dark:text-emerald-100 uppercase tracking-widest">Global Status: Optimal</p>
                <p className="text-[10px] font-medium text-slate-500 mt-1 leading-relaxed">All critical infrastructure and manufacturing lines are in peak tolerance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Information Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk & Incident Monitoring */}
        <div className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Operational Incidents</h3>
            <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest animate-pulse">Critical Alerts</span>
          </div>
          <div className="space-y-4">
            {incidents.map((incident, i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                <div className="flex items-center gap-5">
                  <div className={`p-3 rounded-2xl ${incident.severity === 'High' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-500'} group-hover:scale-110 transition-transform`}>
                    <FiAlertTriangle size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{incident.type}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{incident.id} • {incident.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${incident.status === 'Resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                      {incident.status}
                    </span>
                  </div>
                  <FiArrowUpRight className="text-slate-300 group-hover:text-indigo-500 cursor-pointer transition-colors" size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Compliance & Audit */}
        <div className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-[80px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 blur-[60px] rounded-full" />
          
          <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center mb-8 text-indigo-600 dark:text-indigo-400 shadow-glow-indigo">
            <FiCheckCircle size={40} />
          </div>
          <h3 className="text-3xl font-black tracking-tight mb-3">Enterprise Audit Ready</h3>
          <p className="text-slate-500 font-medium max-w-sm mb-10 leading-relaxed">
            Your current compliance rating is <span className="text-indigo-600 font-bold">98.4%</span>. All Indian tax filings and statutory logs are synchronized.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:scale-105 transition-all">
              Initialize ISO Audit
            </button>
            <button className="px-8 py-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-all border border-slate-200 dark:border-slate-700">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
