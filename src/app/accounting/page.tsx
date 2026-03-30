'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiTrendingUp, FiTrendingDown, FiPieChart, FiDollarSign, FiSearch, FiCalendar, FiCreditCard, FiShield, FiActivity, FiLayers } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, AreaChart, Area } from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';

const initialTransactions = [
  { id: 'TXN-00165', date: '2024-03-25', description: 'Raw Material Procurement (Steel)', amount: 1250000, type: 'Expense', category: 'Procurement' },
  { id: 'TXN-00166', date: '2024-03-24', description: 'Enterprise Software Subscription', amount: 85000, type: 'Expense', category: 'Operations' },
  { id: 'TXN-00167', date: '2024-03-23', description: 'Client Payment - Tata Motors', amount: 4500000, type: 'Income', category: 'Sales' },
  { id: 'TXN-00168', date: '2024-03-22', description: 'Factory Electricity Bill (Feb)', amount: 45000, type: 'Expense', category: 'Utilities' },
  { id: 'TXN-00169', date: '2024-03-21', description: 'Consulting Fee - Bharat Tech', amount: 120000, type: 'Income', category: 'Services' },
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

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
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Professional Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase leading-none">Fiscal Treasury</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 flex items-center gap-2">
            <FiShield className="text-blue-600" /> Enterprise Audit Ledger • Treasury Node 01
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <button className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 shadow-sm transition-all">
             GST RECONCILIATION
           </button>
           <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" /> Commit Capital
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Fiscal Inflow', value: `₹${(stats.revenue/100000).toFixed(1)}L`, icon: <FiTrendingUp className="w-5 h-5" />, color: 'emerald' },
          { label: 'Fiscal Outflow', value: `₹${(stats.expenses/100000).toFixed(1)}L`, icon: <FiTrendingDown className="w-5 h-5" />, color: 'rose' },
          { label: 'Net Liquidity', value: `₹${(stats.net/100000).toFixed(1)}L`, icon: <FiShield className="w-5 h-5" />, color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="industrial-card p-8 flex items-center gap-6 group">
            <div className={`p-4 rounded-lg bg-${stat.color === 'emerald' ? 'emerald' : stat.color === 'rose' ? 'rose' : 'blue'}-600/10 text-${stat.color === 'emerald' ? 'emerald' : stat.color === 'rose' ? 'rose' : 'blue'}-600 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="industrial-card p-10 flex flex-col">
          <div className="flex items-center justify-between mb-12">
             <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Inflow Vector</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Quarterly Reconciliation Analysis</p>
             </div>
             <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 bg-blue-600/10 px-3 py-1.5 rounded">
                Real-time Data
             </span>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={stats.barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} dy={15} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(37, 99, 235, 0.05)'}} />
                <Bar dataKey="income" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="expense" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={32} className="dark:fill-slate-800" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="industrial-card p-10">
          <div className="flex items-center justify-between mb-12">
             <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Substrate Distribution</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Portfolio Asset Allocation</p>
             </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <title>Asset Distribution</title>
                  <Pie data={stats.pieData} innerRadius={80} outerRadius={110} paddingAngle={4} dataKey="value" stroke="none">
                    {stats.pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total</p>
                 <p className="text-xl font-bold text-slate-900 dark:text-white tracking-tighter uppercase leading-none">₹{(stats.revenue/100000).toFixed(1)}L</p>
              </div>
            </div>
            <div className="flex-1 space-y-3 w-full">
              {stats.pieData.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-transparent hover:border-blue-500/30 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">₹{(item.value/1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Ledger */}
      <div className="industrial-card flex flex-col overflow-hidden">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col xl:flex-row justify-between items-center gap-6 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full xl:max-w-md group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search Fiscal Identifier or Quantum..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-11 pr-4 text-xs font-bold outline-none focus:ring-1 focus:ring-blue-500/50 transition-all dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Income', 'Expense'].map(s => (
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
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Artifact Descriptor</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Audit ID</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Classification</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Settlement Quantum</th>
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
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group cursor-pointer data-table-row"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded flex items-center justify-center shadow-lg ${t.type === 'Income' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                          {t.type === 'Income' ? <FiTrendingUp size={20} /> : <FiTrendingDown size={20} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white uppercase leading-none group-hover:text-blue-600 transition-colors">{t.description}</p>
                          <p className="text-[8px] text-slate-400 mt-1.5 uppercase font-black tracking-widest flex items-center gap-2"><FiCalendar className="text-blue-500" /> {t.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-bold text-blue-600 uppercase tracking-tight">{t.id}</td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.category}</span>
                    </td>
                    <td className={`px-8 py-6 text-xl font-black text-right tracking-tighter ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
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
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white uppercase leading-none">Fiscal Acquisition</h2>
                  <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Corporate Audit Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={addTransaction} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Asset Descriptor</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Revenue Settlement" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white"
                    value={newTxn.description}
                    onChange={(e) => setNewTxn({...newTxn, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quantum (INR)</label>
                     <input 
                       required
                       type="number" 
                       placeholder="0.00"
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white"
                       value={newTxn.amount}
                       onChange={(e) => setNewTxn({...newTxn, amount: Number(e.target.value)})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Flow Direction</label>
                     <select 
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-[10px] font-bold outline-none appearance-none focus:ring-1 focus:ring-blue-500/50 dark:text-white"
                       value={newTxn.type}
                       onChange={(e) => setNewTxn({...newTxn, type: e.target.value})}
                     >
                       <option value="Income">Fiscal Inflow (+)</option>
                       <option value="Expense">Fiscal Outflow (-)</option>
                     </select>
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Asset Class</label>
                   <select 
                     className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-[10px] font-bold outline-none appearance-none focus:ring-1 focus:ring-blue-500/50 dark:text-white"
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
                <button type="submit" className="w-full mt-4 py-4 bg-blue-600 text-white rounded-lg font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
                  Commit Transaction
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

