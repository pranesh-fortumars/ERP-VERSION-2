'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiUsers, FiDollarSign, FiSearch, FiFileText, FiAward, FiClock, FiActivity, FiShield, FiBriefcase } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
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
      case 'Paid': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Processing': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Pending': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800';
    }
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Human Capital</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Manage workforce disbursement, statutory compliance, and payroll cycles.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2 uppercase tracking-widest"
        >
          <FiPlus /> Register Personnel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Disbursement Pool', value: `₹${(stats.totalPayroll/100000).toFixed(2)}L`, icon: FiDollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
          { label: 'Personnel Count', value: stats.count, icon: FiUsers, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Avg CTC (Annual)', value: `₹${((stats.avgSalary * 12)/100000).toFixed(1)}L`, icon: FiShield, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        ].map((stat, i) => (
          <div key={i} className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all">
            <div className={`p-5 rounded-[24px] ${stat.bg} ${stat.color} group-hover:rotate-12 transition-transform`}>
              <stat.icon size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <h4 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8 tracking-tight">Functional Disbursement</h3>
        <div style={{ width: '100%', minWidth: 0, minHeight: 300 }}>
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <BarChart data={stats.chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 8, 8, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
          <div className="relative w-full md:w-96 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search personnel registry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Paid', 'Processing', 'Pending'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilter(s)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Personnel ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Designation</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Net Disbursement</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Lifecycle State</th>
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
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-8 py-6 text-xs font-black text-slate-400 group-hover:text-indigo-500 transition-colors uppercase tracking-widest">{emp.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                          <FiUsers />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{emp.name}</p>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">{emp.role} • {emp.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-black text-right dark:text-white">
                      ₹{calculateNet(emp.baseSalary, emp.allowances || 0, emp.deductions || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(emp.status)}`}>
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[40px] p-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
               <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Register Personnel</h2>
                  <p className="text-slate-500 font-medium text-xs mt-1 uppercase tracking-widest font-black">HRM Registry</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={addEmployee} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Arjun Sharma" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                      value={newEmp.name}
                      onChange={(e) => setNewEmp({...newEmp, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Designation</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Lead Engineer" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                      value={newEmp.role}
                      onChange={(e) => setNewEmp({...newEmp, role: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Base Salary (INR)</label>
                     <input 
                       required
                       type="number" 
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                       value={newEmp.baseSalary}
                       onChange={(e) => setNewEmp({...newEmp, baseSalary: Number(e.target.value)})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Department</label>
                     <select 
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
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
                <button type="submit" className="w-full mt-4 py-5 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:scale-[1.02]">
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

