'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiUsers, FiDollarSign, FiSearch, FiFileText, FiAward, FiClock, FiActivity, FiShield, FiBriefcase, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';
import Image from 'next/image';

const initialEmployees = [
  { id: 'EMP-101', name: 'Rajesh Gupta', role: 'Production Head', department: 'Manufacturing', baseSalary: 125000, allowances: 25000, deductions: 12000, status: 'Paid' },
  { id: 'EMP-102', name: 'Pooja Desai', role: 'Sr Accountant', department: 'Finance', baseSalary: 85000, allowances: 15000, deductions: 8000, status: 'Paid' },
  { id: 'EMP-103', name: 'Suresh Yadav', role: 'Quality Analyst', department: 'Engineering', baseSalary: 75000, allowances: 10000, deductions: 7500, status: 'Processing' },
  { id: 'EMP-104', name: 'Meena Kumari', role: 'HR Manager', department: 'HR', baseSalary: 95000, allowances: 20000, deductions: 10500, status: 'Paid' },
  { id: 'EMP-105', name: 'Arun Varma', role: 'Machine Operator', department: 'Manufacturing', baseSalary: 45000, allowances: 5000, deductions: 4000, status: 'Pending' },
];

const PayrollPage = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: '', role: '', department: 'Manufacturing', baseSalary: 0 });

  const calculateNet = (base: number, allow: number, ded: number) => Number(base) + Number(allow || 0) - Number(ded || 0);

  const stats = useMemo(() => {
    const totalPayroll = employees.reduce((acc, emp) => acc + calculateNet(emp.baseSalary, emp.allowances || 0, emp.deductions || 0), 0);
    const avgSalary = employees.length > 0 ? totalPayroll / employees.length : 0;
    
    const deptData: { [key: string]: number } = {};
    employees.forEach(e => {
      deptData[e.department] = (deptData[e.department] || 0) + calculateNet(e.baseSalary, e.allowances || 0, e.deductions || 0);
    });

    const chartData = Object.keys(deptData).map(name => ({ name, value: deptData[name] }));

    return { totalPayroll, avgSalary, count: employees.length, chartData };
  }, [employees]);

  const filteredEmployees = employees.filter(e => {
    const matchesFilter = filter === 'All' || e.status === filter;
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const addEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    setEmployees([{ 
      ...newEmp, 
      id: `EMP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      allowances: Math.floor(newEmp.baseSalary * 0.2),
      deductions: Math.floor(newEmp.baseSalary * 0.1),
      status: 'Pending' 
    }, ...employees]);
    setIsModalOpen(false);
    setNewEmp({ name: '', role: '', department: 'Manufacturing', baseSalary: 0 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-500 text-white';
      case 'Processing': return 'bg-amber-500 text-white';
      case 'Pending': return 'bg-rose-500 text-white animate-pulse';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-colors duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" /> Personnel Fiscal Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Human Capital</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-1 flex items-center gap-2">
            <FiShield className="text-indigo-500" /> Enterprise Disbursement & Statutory Compliance Infrastructure
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <button className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 active:scale-95 shadow-sm">
             <FiFileText className="w-4 h-4" /> Compliance Audit
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95"
          >
            <FiPlus className="w-4 h-4" /> Register Personnel
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Disbursement Pool', value: `₹${(stats.totalPayroll/100000).toFixed(2)}L`, icon: <FiDollarSign className="w-6 h-6 md:w-8 md:h-8" />, color: 'text-indigo-600', bg: 'bg-indigo-500/10' },
          { label: 'Force Count', value: stats.count, icon: <FiUsers className="w-6 h-6 md:w-8 md:h-8" />, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
          { label: 'Avg CTC (Annual)', value: `₹${((stats.avgSalary * 12)/100000).toFixed(1)}L`, icon: <FiTrendingUp className="w-6 h-6 md:w-8 md:h-8" />, color: 'text-amber-600', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <div key={i} className="p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-8 group hover:border-indigo-500/50 transition-all duration-500">
            <div className={`p-6 rounded-[32px] ${stat.bg} ${stat.color} shadow-inner ring-1 ring-black/5 group-hover:rotate-12 transition-transform duration-700`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] leading-none mb-3">{stat.label}</p>
              <h4 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         <div className="xl:col-span-2 p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Functional Costing</h3>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1">Cross-Departmental Expense Trace</p>
               </div>
               <div className="flex gap-4">
                  {['Monthly', 'Quarterly'].map((t, i) => (
                    <button key={i} className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-black/5 ${i === 0 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                      {t}
                    </button>
                  ))}
               </div>
            </div>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                <BarChart data={stats.chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} width={120} />
                  <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#4f46e5" radius={[0, 12, 12, 0]} barSize={40}>
                     {stats.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#10b981'} />
                     ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
         </div>

         <div className="p-10 bg-slate-900 rounded-[48px] overflow-hidden relative group min-h-[400px] flex flex-col justify-between shadow-2xl">
            <Image 
              src="/industrial_erp_hero_1774856751712.png" 
              alt="Workforce Dashboard" 
              fill 
              className="object-cover opacity-30 grayscale group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent p-10 flex flex-col justify-end">
               <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-[24px] flex items-center justify-center mb-8 ring-1 ring-white/20">
                  <FiAward className="text-white w-8 h-8" />
               </div>
               <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-none mb-3">Force Matrix</h3>
               <p className="text-slate-300 font-medium text-sm leading-relaxed mb-10 max-w-[200px]">Optimal workforce utilization is currently at <span className="text-indigo-400 font-black">94.2%</span> across all units.</p>
               <button className="w-full py-5 bg-white text-indigo-600 font-black rounded-3xl text-[10px] uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                  Run Strategy
               </button>
            </div>
         </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/20 dark:bg-slate-800/10">
          <div className="relative w-full md:w-[450px] group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Filter personnel registry by ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-4.5 pl-14 pr-6 text-sm font-black focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all dark:text-white shadow-inner"
            />
          </div>
          <div className="flex gap-3">
            {['All', 'Paid', 'Processing', 'Pending'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilter(s)}
                className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-black/5 active:scale-95'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30 dark:bg-slate-800/30">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Personnel ID</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Designation Matrix</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Net Disbursement</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">Lifecycle State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {filteredEmployees.map((emp, i) => (
                  <motion.tr 
                    layout
                    key={emp.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group cursor-pointer"
                  >
                    <td className="px-10 py-8 text-xs font-black text-slate-400 group-hover:text-indigo-600 transition-colors uppercase tracking-[0.2em]">{emp.id}</td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-[18px] bg-indigo-600 text-white flex items-center justify-center font-black shadow-xl shadow-indigo-600/10 group-hover:scale-110 transition-transform duration-500">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-lg font-black text-slate-900 dark:text-white leading-none tracking-tight uppercase group-hover:text-indigo-600 transition-colors whitespace-nowrap">{emp.name}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 uppercase font-black tracking-[0.2em]">{emp.role} • {emp.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-xl font-black text-right dark:text-white tracking-tighter">
                      ₹{calculateNet(emp.baseSalary, emp.allowances || 0, emp.deductions || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-10 py-8 text-center whitespace-nowrap">
                      <span className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg ring-4 ring-white dark:ring-slate-900 ${getStatusColor(emp.status)}`}>
                        {emp.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[56px] p-10 md:p-14 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
               <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Register Personnel</h2>
                  <p className="text-slate-500 font-black text-[10px] mt-1 uppercase tracking-[0.3em]">Lifecycle Management Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors active:scale-90"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={addEmployee} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Legal Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Arjun Sharma" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                      value={newEmp.name}
                      onChange={(e) => setNewEmp({...newEmp, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Designation Matrix</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Lead Engineer" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                      value={newEmp.role}
                      onChange={(e) => setNewEmp({...newEmp, role: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Statutory Base (INR)</label>
                     <input 
                       required
                       type="number" 
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                       value={newEmp.baseSalary}
                       onChange={(e) => setNewEmp({...newEmp, baseSalary: Number(e.target.value)})}
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Functional Unit</label>
                     <select 
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white appearance-none"
                       value={newEmp.department}
                       onChange={(e) => setNewEmp({...newEmp, department: e.target.value})}
                     >
                       <option>Manufacturing</option>
                       <option>Finance</option>
                       <option>Engineering</option>
                       <option>HR</option>
                       <option>Logistics</option>
                     </select>
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-5 bg-indigo-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95">
                  Commit Personnel to HRM
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PayrollPage;


