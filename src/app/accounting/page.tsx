'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiTrendingUp, FiTrendingDown, FiPieChart, FiDollarSign, FiSearch, FiCalendar, FiCreditCard, FiShield, FiActivity, FiLayers } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, AreaChart, Area } from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';
import Image from 'next/image';

const initialTransactions = [
  { id: 'TXN-00165', date: '2024-03-25', description: 'Raw Material Procurement (Steel)', amount: 1250000, type: 'Expense', category: 'Procurement' },
  { id: 'TXN-00166', date: '2024-03-24', description: 'Enterprise Software Subscription', amount: 85000, type: 'Expense', category: 'Operations' },
  { id: 'TXN-00167', date: '2024-03-23', description: 'Client Payment - Tata Motors', amount: 4500000, type: 'Income', category: 'Sales' },
  { id: 'TXN-00168', date: '2024-03-22', description: 'Factory Electricity Bill (Feb)', amount: 45000, type: 'Expense', category: 'Utilities' },
  { id: 'TXN-00169', date: '2024-03-21', description: 'Consulting Fee - Bharat Tech', amount: 120000, type: 'Income', category: 'Services' },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const AccountingPage = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTxn, setNewTxn] = useState({ description: '', amount: 0, type: 'Expense', category: 'Operations' });

  const stats = useMemo(() => {
    const revenue = transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
    
    const categoryData: { [key: string]: number } = {};
    transactions.forEach(t => {
      categoryData[t.category] = (categoryData[t.category] || 0) + Number(t.amount);
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

  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    setTransactions([{ 
      ...newTxn, 
      id: `TXN-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`,
      date: new Date().toISOString().split('T')[0]
    }, ...transactions]);
    setIsModalOpen(false);
    setNewTxn({ description: '', amount: 0, type: 'Expense', category: 'Operations' });
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-colors duration-500">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <FiShield className="animate-pulse" /> Statutory Compliance Validated
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Fiscal Treasury</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-1 flex items-center gap-2">
            <FiDollarSign className="text-indigo-500" /> Real-time Audit Ledger & Strategic Capital Optimization
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <button className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:shadow-lg transition-all active:scale-95 shadow-sm">
             GST Reconciliation
           </button>
           <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95"
          >
            <FiPlus className="w-4 h-4" /> Commit Capital
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Fiscal Inflow', value: `₹${(stats.revenue/100000).toFixed(1)}L`, icon: <FiTrendingUp className="w-8 h-8" />, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
          { label: 'Fiscal Outflow', value: `₹${(stats.expenses/100000).toFixed(1)}L`, icon: <FiTrendingDown className="w-8 h-8" />, color: 'text-rose-600', bg: 'bg-rose-500/10' },
          { label: 'Net Liquidity', value: `₹${(stats.net/100000).toFixed(1)}L`, icon: <FiShield className="w-8 h-8" />, color: 'text-indigo-600', bg: 'bg-indigo-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-10 group hover:border-indigo-500/50 transition-all duration-500"
          >
            <div className={`p-8 rounded-[32px] ${stat.bg} ${stat.color} shadow-inner group-hover:scale-110 transition-transform duration-700 ring-1 ring-black/5`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] leading-none mb-3">{stat.label}</p>
              <h4 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">{stat.value}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-12">
             <div>
                <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Inflow Vector</h3>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-2">Quarterly Reconciliation Analysis</p>
             </div>
             <div className="flex gap-3">
               <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-500/10 px-4 py-2 rounded-xl ring-1 ring-indigo-500/20">
                  Real-time Data
               </span>
             </div>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={stats.barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={15} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(99, 102, 241, 0.05)'}} />
                <Bar dataKey="income" fill="#6366f1" radius={[12, 12, 0, 0]} barSize={40} animationDuration={2000} />
                <Bar dataKey="expense" fill="#e2e8f0" radius={[12, 12, 0, 0]} barSize={40} className="dark:fill-slate-800" animationDuration={2000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-12">
             <div>
                <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Substrate Distribution</h3>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-2">Portfolio Asset Allocation</p>
             </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <title>Asset Distribution</title>
                  <Pie data={stats.pieData} innerRadius={85} outerRadius={120} paddingAngle={8} dataKey="value" stroke="none">
                    {stats.pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Quantum</p>
                 <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">₹{(stats.revenue/100000).toFixed(1)}L</p>
              </div>
            </div>
            <div className="flex-1 space-y-4 w-full">
              {stats.pieData.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-[28px] border border-transparent hover:border-indigo-500/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-3.5 h-3.5 rounded-full ring-4 ring-black/5" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] group-hover:text-indigo-600 transition-colors uppercase">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900 dark:text-white tracking-tighter whitespace-nowrap">₹{(item.value/1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Ledger */}
      <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex flex-col xl:flex-row justify-between items-center gap-8 bg-slate-50/20 dark:bg-slate-800/10">
          <div className="relative w-full xl:max-w-xl group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search fiscal identifier, registry entry, or quantum..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-4.5 pl-14 pr-6 text-sm font-black focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all dark:text-white shadow-inner"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Income', 'Expense'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilter(s)}
                className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-black/5 hover:bg-slate-100 active:scale-95'}`}
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
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Artifact Descriptor</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Audit Identifier</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Classification</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Settlement Quantum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.map((t, i) => (
                  <motion.tr 
                    layout
                    key={t.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group cursor-pointer"
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-slate-950 ${t.type === 'Income' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-rose-500 text-white shadow-rose-500/20'}`}>
                          {t.type === 'Income' ? <FiTrendingUp size={24} /> : <FiTrendingDown size={24} />}
                        </div>
                        <div>
                          <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none mb-2 group-hover:text-indigo-600 transition-colors">{t.description}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 uppercase font-black tracking-[0.3em] flex items-center gap-2"><FiCalendar className="text-indigo-500" /> {t.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{t.id}</td>
                    <td className="px-10 py-8 whitespace-nowrap">
                      <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 border border-black/5 rounded-xl text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">{t.category}</span>
                    </td>
                    <td className={`px-10 py-8 text-2xl font-black text-right whitespace-nowrap tracking-tighter ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {t.type === 'Income' ? '+' : '-'} ₹{Number(t.amount).toLocaleString('en-IN')}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Modal */}
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
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Fiscal Acquisition</h2>
                  <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em]">Corporate Audit Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors active:scale-95"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={addTransaction} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Descriptor</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Q4 Revenue Settlement Pipeline" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                    value={newTxn.description}
                    onChange={(e) => setNewTxn({...newTxn, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Settlement Quantum (INR)</label>
                     <input 
                       required
                       type="number" 
                       placeholder="0.00"
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                       value={newTxn.amount}
                       onChange={(e) => setNewTxn({...newTxn, amount: Number(e.target.value)})}
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Flow Direction</label>
                     <select 
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white appearance-none"
                       value={newTxn.type}
                       onChange={(e) => setNewTxn({...newTxn, type: e.target.value})}
                     >
                       <option value="Income">Fiscal Inflow (+)</option>
                       <option value="Expense">Fiscal Outflow (-)</option>
                     </select>
                  </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Portfolio Asset Class</label>
                   <select 
                     className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white appearance-none"
                     value={newTxn.category}
                     onChange={(e) => setNewTxn({...newTxn, category: e.target.value})}
                   >
                     <option>Sales Ledger</option>
                     <option>Procurement Pipeline</option>
                     <option>Operations Overhead</option>
                     <option>Infrastructure Utilities</option>
                     <option>Professional Services</option>
                   </select>
                </div>
                <button type="submit" className="w-full mt-6 py-5 bg-indigo-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95">
                  Commit Transaction to Audit Ledger
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountingPage;

