'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiSettings, FiCpu, FiAlertCircle, FiCheckCircle, 
  FiClock, FiTruck, FiBox, FiTrendingUp 
} from 'react-icons/fi';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';

const productionData = [
  { name: 'Unit A', current: 85, capacity: 100 },
  { name: 'Unit B', current: 92, capacity: 100 },
  { name: 'Unit C', current: 78, capacity: 100 },
  { name: 'Unit D', current: 95, capacity: 100 },
  { name: 'Unit E', current: 60, capacity: 100 },
];

const resourceEfficiency = [
  { time: '08:00', value: 82 },
  { time: '10:00', value: 88 },
  { time: '12:00', value: 92 },
  { time: '14:00', value: 85 },
  { time: '16:00', value: 90 },
  { time: '18:00', value: 94 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

const ManufacturingPage = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manufacturing Operations</h1>
          <p className="text-slate-500 font-medium">Real-time production monitoring & floor management</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2">
            <FiSettings /> Master Schedule
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Lines', value: '18/20', icon: FiCpu, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Efficiency', value: '92.4%', icon: FiTrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Down Time', value: '14m', icon: FiClock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'QC Passed', value: '99.1%', icon: FiCheckCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 premium-shadow"
          >
            <div className={`p-3 w-fit rounded-2xl ${stat.bg} mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Capacity */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
             Production Units Load
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="current" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Status */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Line Announcements</h3>
          <div className="space-y-4">
            {[
              { title: 'Maintenance Overdue', time: 'Line 04 - Unit C', icon: FiAlertCircle, color: 'text-amber-500' },
              { title: 'Shift Handover Ready', time: 'All Units', icon: FiCheckCircle, color: 'text-emerald-500' },
              { title: 'Material Low: Iron Ore', time: 'Inventory System', icon: FiTruck, color: 'text-indigo-500' },
              { title: 'Production Goal Met', time: 'Line 12', icon: FiBox, color: 'text-rose-500' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 transition-all hover:translate-x-1">
                <item.icon className={`w-5 h-5 ${item.color} shrink-0 mt-1`} />
                <div>
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Detail Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold">Active Jobs (Shop Floor)</h3>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-tighter">Live Updates</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Job ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Line No.</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Due In</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { id: 'JOB-9921', name: 'Turbine Component X-1', line: 'L-04', progress: 75, due: '2h 15m', status: 'In Progress' },
                { id: 'JOB-9925', name: 'Precision Gear Shaft', line: 'L-02', progress: 40, due: '5h 40m', status: 'Maintenance' },
                { id: 'JOB-9930', name: 'Alloy Casting Batch B', line: 'L-09', progress: 95, due: '12m', status: 'Final Stage' },
                { id: 'JOB-9932', name: 'Electric Motor Housing', line: 'L-01', progress: 10, due: '14h 20m', status: 'Starting' },
              ].map((job, i) => (
                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-indigo-600">{job.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{job.name}</td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-500">{job.line}</td>
                  <td className="px-6 py-4">
                    <div className="w-32 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${job.progress}%` }} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{job.due}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 group-hover:bg-white transition-colors">
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManufacturingPage;
