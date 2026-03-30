'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiTrendingUp, FiTrendingDown, FiPieChart, FiDollarSign, FiSearch, FiCalendar } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';

const initialTransactions = [
  { id: 'TXN-00165', date: '2024-03-25', description: 'Raw Material Procurement (Steel)', amount: 1250000, type: 'Expense', category: 'Procurement' },
  { id: 'TXN-00166', date: '2024-03-24', description: 'Enterprise Software Subscription', amount: 85000, type: 'Expense', category: 'Operations' },
  { id: 'TXN-00167', date: '2024-03-23', description: 'Client Payment - Tata Motors', amount: 4500000, type: 'Income', category: 'Sales' },
  { id: 'TXN-00168', date: '2024-03-22', description: 'Factory Electricity Bill (Feb)', amount: 45000, type: 'Expense', category: 'Utilities' },
  { id: 'TXN-00169', date: '2024-03-21', description: 'Consulting Fee - Bharat Tech', amount: 120000, type: 'Income', category: 'Services' },
  { id: 'TXN-00170', date: '2024-03-20', description: 'Staff Salary - March Cycle', amount: 850000, type: 'Expense', category: 'Payroll' },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const AccountingPage = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = useMemo(() => {
    const revenue = transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
    
    const categoryData: { [key: string]: number } = {};
    transactions.forEach(t => {
      categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
    });

    const pieData = Object.keys(categoryData).map(name => ({ name, value: categoryData[name] }));
    
    const barData = [
      { name: 'Jan', income: 3200000, expense: 2100000 },
      { name: 'Feb', income: 4500000, expense: 2800000 },
      { name: 'Mar', income: 3800000, expense: 3100000 },
    ];

    return { revenue, expenses, net: revenue - expenses, pieData, barData };
  }, [transactions]);

  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = filter === 'All' || t.type === filter;
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Treasury</h1>
          <p className="text-slate-500 font-medium tracking-tight">Corporate accounts, GST reconciliation, and cash flow</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <FiPlus /> New Asset Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Inflow', value: `₹${(stats.revenue/100000).toFixed(1)}L`, icon: FiTrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Total Outflow', value: `₹${(stats.expenses/100000).toFixed(1)}L`, icon: FiTrendingDown, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Net Profit', value: `₹${(stats.net/100000).toFixed(1)}L`, icon: FiDollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold mb-8">Cash Flow Analysis</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="income" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="expense" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold mb-8">Expense Distribution</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-[250px] w-full md:w-1/2 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {stats.pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              {stats.pieData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-xs font-bold text-slate-500">{item.name}</span>
                  </div>
                  <span className="text-xs font-black">₹{(item.value/1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by TXN ID or Description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none rounded-xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Income', 'Expense'].map(s => (
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
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTransactions.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-5 text-sm font-black text-slate-400">{t.id}</td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold leading-none">{t.description}</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-medium flex items-center gap-1"><FiCalendar /> {t.date}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold text-slate-500">{t.category}</span>
                  </td>
                  <td className={`px-6 py-5 text-sm font-black ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'Income' ? '+' : '-'} ₹{t.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-glow shadow-emerald-500/50" />
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
