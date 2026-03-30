'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiUsers, FiDollarSign, FiSearch, FiFileText, FiAward, FiClock, FiActivity, FiShield, FiBriefcase, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';

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
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Professional Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase leading-none">Human Capital</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 flex items-center gap-2">
            <FiShield className="text-blue-600" /> Enterprise Disbursement • Force Node 01
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <button className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 shadow-sm">
             <FiFileText className="w-4 h-4" /> Compliance Audit
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" /> Register Personnel
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Disbursement Pool', value: `₹${(stats.totalPayroll/100000).toFixed(2)}L`, icon: <FiDollarSign className="w-5 h-5" />, color: 'blue' },
          { label: 'Force Count', value: stats.count, icon: <FiUsers className="w-5 h-5" />, color: 'emerald' },
          { label: 'Avg CTC (Annual)', value: `₹${((stats.avgSalary * 12)/100000).toFixed(1)}L`, icon: <FiTrendingUp className="w-5 h-5" />, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="industrial-card p-8 flex items-center gap-6 group">
            <div className={`p-4 rounded-lg bg-${stat.color === 'blue' ? 'blue' : stat.color === 'emerald' ? 'emerald' : 'amber'}-600/10 text-${stat.color === 'blue' ? 'blue' : stat.color === 'emerald' ? 'emerald' : 'amber'}-600 group-hover:bg-blue-600 group-hover:text-white transition-all`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         <div className="xl:col-span-2 industrial-card p-10 flex flex-col">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Functional Costing</h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Cross-Departmental Expense Trace</p>
               </div>
               <div className="flex gap-2">
                  {['Monthly', 'Quarterly'].map((t, i) => (
                    <button key={i} className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded bg-${i === 0 ? 'blue-600 text-white shadow-lg' : 'slate-100 dark:bg-slate-800 text-slate-400'}`}>
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
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} width={120} />
                  <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={32}>
                     {stats.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2563eb' : '#10b981'} />
                     ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
         </div>

         <div className="industrial-card p-10 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden group min-h-[400px]">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <div className="relative z-10">
               <div className="w-14 h-14 bg-blue-600 rounded flex items-center justify-center mb-8 shadow-lg group-hover:rotate-12 transition-transform">
                  <FiAward className="w-7 h-7" />
               </div>
               <h3 className="text-3xl font-black tracking-tighter uppercase leading-none mb-4">Force Matrix</h3>
               <p className="text-slate-400 font-medium text-xs leading-relaxed mb-10 max-w-[200px]">Optimal workforce utilization is currently at <span className="text-blue-400 font-black">94.2%</span> across all units.</p>
               <div className="space-y-3">
                 {[78, 92, 65].map((w, i) => (
                   <div key={i} className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${w}%` }} />
                   </div>
                 ))}
               </div>
            </div>
            <button className="w-full py-4 bg-white text-slate-900 font-black rounded-lg text-[10px] uppercase tracking-[0.4em] shadow-xl hover:bg-slate-100 transition-all active:scale-95 z-10">
              Run Strategy
            </button>
         </div>
      </div>

      <div className="industrial-card flex flex-col overflow-hidden">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full md:w-[400px] group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search Personnel Registry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-11 pr-4 text-xs font-bold outline-none focus:ring-1 focus:ring-blue-500/50 transition-all dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Paid', 'Processing', 'Pending'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded text-[9px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-blue-500 active:scale-95'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/20 dark:bg-slate-900/20">
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">ID Trace</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Designation Matrix</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Net Disbursement</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
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
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group cursor-pointer data-table-row"
                  >
                    <td className="px-8 py-6 text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest">{emp.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-blue-600 text-white flex items-center justify-center font-black shadow-lg group-hover:rotate-6 transition-transform">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white uppercase leading-none mb-1.5 group-hover:text-blue-600 transition-colors">{emp.name}</p>
                          <p className="text-[8px] text-slate-400 mt-1 uppercase font-bold tracking-widest">{emp.role} • {emp.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-black text-right dark:text-white tracking-tighter">
                      ₹{calculateNet(emp.baseSalary, emp.allowances || 0, emp.deductions || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1 rounded text-[8px] font-black uppercase tracking-widest ${getStatusColor(emp.status)}`}>
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
               <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white uppercase leading-none">Register Personnel</h2>
                  <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Lifecycle Management Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={addEmployee} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Legal Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Arjun Sharma" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white"
                      value={newEmp.name}
                      onChange={(e) => setNewEmp({...newEmp, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Designation Matrix</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Lead Engineer" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white"
                      value={newEmp.role}
                      onChange={(e) => setNewEmp({...newEmp, role: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Statutory Base (INR)</label>
                     <input 
                       required
                       type="number" 
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white"
                       value={newEmp.baseSalary}
                       onChange={(e) => setNewEmp({...newEmp, baseSalary: Number(e.target.value)})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Functional Unit</label>
                     <select 
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-[10px] font-bold outline-none appearance-none focus:ring-1 focus:ring-blue-500/50 dark:text-white"
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
                <button type="submit" className="w-full mt-4 py-4 bg-blue-600 text-white rounded-lg font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
                  Commit Personnel
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


