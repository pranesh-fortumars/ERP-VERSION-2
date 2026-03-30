'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiUsers, FiDollarSign, FiSearch, FiFileText, FiAward, FiClock } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';

const initialEmployees = [
  { id: 'EMP-101', name: 'Rajesh Gupta', role: 'Production Head', department: 'Manufacturing', baseSalary: 125000, allowances: 25000, deductions: 12000, status: 'Paid' },
  { id: 'EMP-102', name: 'Pooja Desai', role: 'Sr Accountant', department: 'Finance', baseSalary: 85000, allowances: 15000, deductions: 8000, status: 'Paid' },
  { id: 'EMP-103', name: 'Suresh Yadav', role: 'Quality Analyst', department: 'Engineering', baseSalary: 75000, allowances: 10000, deductions: 7500, status: 'Processing' },
  { id: 'EMP-104', name: 'Meena Kumari', role: 'HR Manager', department: 'HR', baseSalary: 95000, allowances: 20000, deductions: 10500, status: 'Paid' },
  { id: 'EMP-105', name: 'Arun Varma', role: 'Machine Operator', department: 'Manufacturing', baseSalary: 45000, allowances: 5000, deductions: 4000, status: 'Pending' },
];

const AccountingPage = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateNet = (base: number, allow: number, ded: number) => base + allow - ded;

  const stats = useMemo(() => {
    const totalPayroll = employees.reduce((acc, emp) => acc + calculateNet(emp.baseSalary, emp.allowances, emp.deductions), 0);
    const avgSalary = employees.length > 0 ? totalPayroll / employees.length : 0;
    
    const deptData: { [key: string]: number } = {};
    employees.forEach(e => {
      deptData[e.department] = (deptData[e.department] || 0) + calculateNet(e.baseSalary, e.allowances, e.deductions);
    });

    const chartData = Object.keys(deptData).map(name => ({ name, value: deptData[name] }));

    return { totalPayroll, avgSalary, count: employees.length, chartData };
  }, [employees]);

  const filteredEmployees = employees.filter(e => {
    const matchesFilter = filter === 'All' || e.status === filter;
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-100 text-emerald-700';
      case 'Processing': return 'bg-amber-100 text-amber-700';
      case 'Pending': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Human Capital & Payroll</h1>
          <p className="text-slate-500 font-medium tracking-tight">Manage salaries, statutory compliance (PF/ESIC), and employee benefits</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <FiPlus /> Run Payroll Cycle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Monthly Disbursement', value: `₹${(stats.totalPayroll/100000).toFixed(2)}L`, icon: FiDollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Active Workforce', value: stats.count, icon: FiUsers, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg CTC (Annual)', value: `₹${((stats.avgSalary * 12)/100000).toFixed(1)}L`, icon: FiAward, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 premium-shadow flex items-center gap-6">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <h4 className="text-3xl font-bold tracking-tighter">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-bold mb-8">Disbursement by Department</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Employee ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none rounded-xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Paid', 'Processing', 'Pending'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === s ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Employee ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Name & Role</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Base Salary</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Net Pay (INR)</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredEmployees.map((emp, i) => (
                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-5 text-sm font-black text-slate-400">{emp.id}</td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold leading-none">{emp.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-medium">{emp.role}</p>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-600">₹{emp.baseSalary.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-5 text-sm font-medium text-rose-500">-₹{emp.deductions.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-5 text-sm font-black text-right">
                    ₹{calculateNet(emp.baseSalary, emp.allowances, emp.deductions).toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusColor(emp.status)}`}>
                      {emp.status}
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

export default AccountingPage;
