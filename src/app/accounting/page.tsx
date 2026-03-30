'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiTrendingUp, FiTrendingDown, FiPieChart, FiDollarSign, FiSearch, FiCalendar, FiCreditCard } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, AreaChart, Area } from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';

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
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Financial Treasury</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Real-time fiscal ledger, GST reconciliation, and asset management.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2 uppercase tracking-widest"
        >
          <FiPlus /> New Asset Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Fiscal Inflow', value: `₹${(stats.revenue/100000).toFixed(1)}L`, icon: FiTrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Fiscal Outflow', value: `₹${(stats.expenses/100000).toFixed(1)}L`, icon: FiTrendingDown, color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20' },
          { label: 'Net Liquidity', value: `₹${(stats.net/100000).toFixed(1)}L`, icon: FiDollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8 tracking-tight">Cash Flow Vector</h3>
          <div style={{ width: '100%', minWidth: 0, minHeight: 300 }}>
            <ResponsiveContainer width="100%" height={300} minHeight={300}>
              <BarChart data={stats.barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="income" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={32} />
                <Bar dataKey="expense" fill="#e2e8f0" radius={[8, 8, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8 tracking-tight">Substrate Allocation</h3>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div style={{ width: '100%', maxWidth: '250px', minHeight: 250 }}>
              <ResponsiveContainer width="100%" height={250} minHeight={250}>
                <PieChart>
                  <Pie data={stats.pieData} innerRadius={70} outerRadius={100} paddingAngle={8} dataKey="value" stroke="none">
                    {stats.pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-4">
              {stats.pieData.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-sm font-black dark:text-white">₹{(item.value/1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
          <div className="relative w-full md:w-96 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search transaction registry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Income', 'Expense'].map(s => (
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
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Descriptor</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Audit ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Class</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Quantum (INR)</th>
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
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'Income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                          {t.type === 'Income' ? <FiTrendingUp /> : <FiTrendingDown />}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{t.description}</p>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest flex items-center gap-1.5"><FiCalendar className="text-indigo-500" /> {t.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs font-black text-slate-400 group-hover:text-indigo-500 transition-colors">{t.id}</td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest">{t.category}</span>
                    </td>
                    <td className={`px-8 py-6 text-sm font-black text-right ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[40px] p-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
               <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Financial Asset Entry</h2>
                  <p className="text-slate-500 font-medium text-xs mt-1 uppercase tracking-widest font-black">Audit Registry</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={addTransaction} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Descriptor</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Q4 Revenue Settlement" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                    value={newTxn.description}
                    onChange={(e) => setNewTxn({...newTxn, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Quantum (INR)</label>
                     <input 
                       required
                       type="number" 
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                       value={newTxn.amount}
                       onChange={(e) => setNewTxn({...newTxn, amount: Number(e.target.value)})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Flow</label>
                     <select 
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                       value={newTxn.type}
                       onChange={(e) => setNewTxn({...newTxn, type: e.target.value})}
                     >
                       <option value="Income">Income Vector</option>
                       <option value="Expense">Expense Vector</option>
                     </select>
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Category</label>
                   <select 
                     className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                     value={newTxn.category}
                     onChange={(e) => setNewTxn({...newTxn, category: e.target.value})}
                   >
                     <option>Sales</option>
                     <option>Procurement</option>
                     <option>Operations</option>
                     <option>Utilities</option>
                     <option>Services</option>
                   </select>
                </div>
                <button type="submit" className="w-full mt-4 py-5 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:scale-[1.02]">
                  Commit Asset to Ledger
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

