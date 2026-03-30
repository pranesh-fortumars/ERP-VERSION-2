'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiShoppingCart, FiTrendingUp, FiDollarSign, FiSearch, FiFileText } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';

const initialSales = [
  { id: 'INV-2024-001', customer: 'Tata Motors Ltd', product: 'Precision Gear Shafts', quantity: 150, baseAmount: 450000, gstRate: 18, date: '2024-03-01', status: 'Completed' },
  { id: 'INV-2024-002', customer: 'Reliance Industries', product: 'Industrial Lubricants', quantity: 45, baseAmount: 125000, gstRate: 12, date: '2024-03-05', status: 'Processing' },
  { id: 'INV-2024-003', customer: 'Bharat Electronics', product: 'Micro-Controller Kits', quantity: 2000, baseAmount: 840000, gstRate: 18, date: '2024-03-10', status: 'Completed' },
  { id: 'INV-2024-004', customer: 'Adani Logistics', product: 'Hydraulic Systems', quantity: 12, baseAmount: 210000, gstRate: 28, date: '2024-03-15', status: 'Shipped' },
  { id: 'INV-2024-005', customer: 'L&T Construction', product: 'Steel Brackets', quantity: 500, baseAmount: 65000, gstRate: 18, date: '2024-03-20', status: 'Processing' },
];

const SalesPage = () => {
  const [sales, setSales] = useState(initialSales);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSale, setNewSale] = useState({ customer: '', product: '', baseAmount: '', gstRate: 18 });

  const calculateTotal = (base: number, gst: number) => base + (base * gst / 100);

  const stats = useMemo(() => {
    const totalRevenue = sales.reduce((acc, s) => acc + calculateTotal(s.baseAmount, s.gstRate), 0);
    const avgOrder = sales.length > 0 ? totalRevenue / sales.length : 0;
    
    const chartData = [
      { name: 'Week 1', revenue: 450000 },
      { name: 'Week 2', revenue: 620000 },
      { name: 'Week 3', revenue: 840000 },
      { name: 'Week 4', revenue: 710000 },
    ];

    return { totalRevenue, avgOrder, count: sales.length, chartData };
  }, [sales]);

  const filteredSales = sales.filter(s => {
    const matchesFilter = filter === 'All' || s.status === filter;
    const matchesSearch = s.customer.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const addSale = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `INV-2024-${Math.floor(Math.random() * 900 + 100)}`;
    setSales([{ 
      ...newSale, 
      id, 
      baseAmount: parseFloat(newSale.baseAmount), 
      gstRate: parseFloat(newSale.gstRate.toString()),
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      quantity: 1
    }, ...sales]);
    setIsModalOpen(false);
    setNewSale({ customer: '', product: '', baseAmount: '', gstRate: 18 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Processing': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Shipped': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Sales & Revenue</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Manage enterprise contracts and GST-compliant invoices</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2 uppercase tracking-widest"
        >
          <FiPlus /> Record New Contract
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Quarterly Revenue', value: `₹${(stats.totalRevenue/100000).toFixed(2)}L`, icon: FiTrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
          { label: 'Total Invoices', value: stats.count, icon: FiFileText, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Avg Contract Value', value: `₹${(stats.avgOrder/1000).toFixed(1)}k`, icon: FiDollarSign, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-6"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <h3 className="text-xl font-black tracking-tight mb-10 text-slate-900 dark:text-white">Revenue Growth (Weekly Portfolio)</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%" minHeight={0} minWidth={0}>
            <AreaChart data={stats.chartData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} tickFormatter={(v) => `₹${v/1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fill="url(#salesGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table & Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col xl:flex-row justify-between items-center gap-6 bg-slate-50/30 dark:bg-slate-800/20">
          <div className="relative w-full xl:max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Invoice ID or Customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all dark:text-white"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'Completed', 'Processing', 'Shipped'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilter(s)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Portfolio</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Asset</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">GST</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Settlements</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Lifecycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                  <td className="px-8 py-6 text-xs font-black text-indigo-600">{sale.id}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100">{sale.customer}</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">{sale.product}</p>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-600 dark:text-slate-400">₹{sale.baseAmount.toLocaleString('en-IN')}</td>
                  <td className="px-8 py-6 text-[10px] font-black text-slate-400 text-center uppercase tracking-widest bg-slate-50/30 dark:bg-slate-800/10 italic">{sale.gstRate}% TAX</td>
                  <td className="px-8 py-6 text-sm font-black text-right text-slate-900 dark:text-white">₹{calculateTotal(sale.baseAmount, sale.gstRate).toLocaleString('en-IN')}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contract Modal */}
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
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[40px] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Record New Contract</h2>
                  <p className="text-slate-500 font-medium text-xs mt-1 uppercase tracking-widest font-black">Fiscal Ledger Entry</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={addSale} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Client Organization</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Bharat Petroleum Corp" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                    value={newSale.customer}
                    onChange={(e) => setNewSale({...newSale, customer: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Engagement Portfolio (Product)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Industrial Automation Suite" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                    value={newSale.product}
                    onChange={(e) => setNewSale({...newSale, product: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Base Asset Value</label>
                    <input 
                      required
                      type="number" 
                      placeholder="0.00" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                      value={newSale.baseAmount}
                      onChange={(e) => setNewSale({...newSale, baseAmount: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">GST Surcharge (%)</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                      value={newSale.gstRate}
                      onChange={(e) => setNewSale({...newSale, gstRate: parseInt(e.target.value)})}
                    >
                      <option value="5">5% (Essential)</option>
                      <option value="12">12% (Standard)</option>
                      <option value="18">18% (Services)</option>
                      <option value="28">28% (Luxury)</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full mt-4 py-4 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:scale-[1.01]">
                  Validate & Commit
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SalesPage;

