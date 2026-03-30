'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie 
} from 'recharts';
import { 
  FiTrendingUp, FiUsers, FiCreditCard, FiCheckCircle, 
  FiActivity, FiArrowUpRight, FiArrowDownRight, FiTruck 
} from 'react-icons/fi';
import CustomTooltip from '@/components/CustomTooltip';

const stats = [
  { title: 'Monthly Revenue', value: '₹12,45,000', change: '+12.5%', type: 'up', icon: FiTrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { title: 'Active Projects', value: '24', change: '+4', type: 'up', icon: FiActivity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'New Orders', value: '1,284', change: '+18.2%', type: 'up', icon: FiTruck, color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'Client Retention', value: '98.2%', change: '-0.4%', type: 'down', icon: FiUsers, color: 'text-rose-600', bg: 'bg-rose-50' },
];

const revenueData = [
  { name: 'Jan', revenue: 420000, expenses: 310000 },
  { name: 'Feb', revenue: 580000, expenses: 420000 },
  { name: 'Mar', revenue: 720000, expenses: 510000 },
  { name: 'Apr', revenue: 690000, expenses: 480000 },
  { name: 'May', revenue: 840000, expenses: 560000 },
  { name: 'Jun', revenue: 950000, expenses: 620000 },
];

const distributionData = [
  { name: 'Manufacturing', value: 45 },
  { name: 'Consulting', value: 25 },
  { name: 'Maintenance', value: 15 },
  { name: 'Direct Sales', value: 15 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

const DashboardPage = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-500 font-medium">Overview for Arjun Sharma | ERP PRO Enterprise Edition</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">
            Download Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
            + New Operation
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 premium-shadow group hover:border-indigo-200 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.type === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change} {stat.type === 'up' ? <FiArrowUpRight /> : <FiArrowDownRight />}
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold">Revenue Analytics (FY 2025-26)</h3>
            <div className="flex gap-2">
               <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 px-3 py-1 bg-slate-100 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" /> Revenue
               </span>
               <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 px-3 py-1 bg-slate-100 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-slate-300" /> Expenses
               </span>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Business Distribution */}
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold mb-8">Asset Distribution</h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                <span className="text-2xl font-bold">100%</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Efficiency</span>
            </div>
          </div>
          <div className="space-y-4 mt-6">
            {distributionData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BPA & Workflow Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Workflow Automation Progress</h3>
          <div className="space-y-6">
            {[
              { label: 'Automated Invoicing', progress: 85, status: 'Healthy' },
              { label: 'Supply Chain Tracking', progress: 62, status: 'Optimizing' },
              { label: 'Staff Payroll (BPA)', progress: 100, status: 'Completed' },
              { label: 'Inventory Forecasting', progress: 45, status: 'Dev Mode' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold">{item.label}</span>
                  <span className="text-xs font-bold text-indigo-600">{item.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className="bg-indigo-600 h-full rounded-full" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Recent Indian Enterprise Alerts</h3>
          <div className="space-y-4">
            {[
              { title: 'GST Filing Deadline', desc: 'Q3 GSTR-1 filing due in 4 days.', icon: FiCreditCard, color: 'text-amber-500' },
              { title: 'Vendor Onboarding', desc: 'New manufacturing partner from Pune added.', icon: FiCheckCircle, color: 'text-emerald-500' },
              { title: 'Stock Alert', desc: 'Critical raw material shortage in Bangalore Unit.', icon: FiTruck, color: 'text-rose-500' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 transition-all hover:bg-white dark:hover:bg-slate-800 cursor-pointer">
                <div className={`p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm ${alert.color}`}>
                  <alert.icon />
                </div>
                <div>
                  <p className="text-sm font-bold">{alert.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
