'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiShoppingCart, FiTrendingUp, FiDollarSign, FiSearch, FiFileText, FiTarget, FiBox, FiCheckCircle } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from '@/components/CustomTooltip';
import Image from 'next/image';

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
      case 'Completed': return 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20';
      case 'Processing': return 'bg-amber-500 text-white shadow-lg shadow-amber-500/20';
      case 'Shipped': return 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-colors duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Revenue Velocity Positive
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Sales Revenue</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-1 flex items-center gap-2">
            <FiTarget className="text-indigo-500" /> Enterprise Contract Management & Fiscal Fulfillment
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 active:scale-95 shadow-sm">
            <FiFileText className="w-4 h-4" /> Export Ledger
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95"
          >
            <FiPlus className="w-4 h-4" /> Record Contract
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Quarterly Revenue', value: `₹${(stats.totalRevenue/100000).toFixed(2)}L`, icon: <FiTrendingUp className="w-6 h-6 md:w-8 md:h-8" />, color: 'text-indigo-600', bg: 'bg-indigo-500/10' },
          { label: 'Invoice Count', value: stats.count, icon: <FiFileText className="w-6 h-6 md:w-8 md:h-8" />, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
          { label: 'Avg Contract', value: `₹${(stats.avgOrder/1000).toFixed(1)}k`, icon: <FiDollarSign className="w-6 h-6 md:w-8 md:h-8" />, color: 'text-amber-600', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-8 group hover:border-indigo-500/50 transition-all duration-500"
          >
            <div className={`p-6 rounded-[32px] ${stat.bg} ${stat.color} shadow-inner ring-1 ring-black/5 group-hover:rotate-12 transition-transform duration-700`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] leading-none mb-3">{stat.label}</p>
              <h4 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">{stat.value}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="xl:col-span-2 p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-10">
             <div>
                <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Revenue Trajectory</h3>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1">Cross-Sectoral Yield Analysis</p>
             </div>
             <div className="flex gap-3">
               <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-xl ring-1 ring-emerald-500/20">
                  <FiTrendingUp /> +14.2% Growth
               </span>
             </div>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} tickFormatter={(v) => `₹${v/1000}k`} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={6} fill="url(#salesGrad)" animationDuration={2000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-10 bg-slate-900 rounded-[48px] overflow-hidden relative group min-h-[450px] flex flex-col justify-between shadow-2xl">
          <Image 
            src="/media__1774860970866.png" 
            alt="Sales Analysis" 
            fill 
            className="object-cover opacity-40 grayscale group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-10 flex flex-col justify-end">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-[24px] flex items-center justify-center mb-8 ring-1 ring-white/20 shadow-inner">
                <FiBox className="text-white w-8 h-8" />
             </div>
             <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-none mb-3">Order Flux</h3>
             <p className="text-slate-300 font-medium text-sm leading-relaxed mb-10 max-w-[220px]">Real-time demand sensing has identified <span className="text-indigo-400 font-black">8 high-priority</span> bulk contracts for dispatch.</p>
             <button className="w-full py-5 bg-white text-indigo-600 font-black rounded-3xl text-[10px] uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                Audit fulfillment
             </button>
          </div>
        </div>
      </div>

      {/* Table & Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex flex-col xl:flex-row justify-between items-center gap-8 bg-slate-50/20 dark:bg-slate-800/10">
          <div className="relative w-full xl:max-w-xl group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by Invoice ID or Customer portfolio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-4.5 pl-14 pr-6 text-sm font-black focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all dark:text-white shadow-inner"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Completed', 'Processing', 'Shipped'].map(s => (
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
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Invoice ID</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Client Matrix</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Base Valuation</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">Taxation</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Settlements</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">Lifecycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group cursor-pointer">
                  <td className="px-10 py-8 text-xs font-black text-indigo-600 uppercase tracking-widest">{sale.id}</td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-[18px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                          <FiShoppingCart size={20} />
                       </div>
                       <div>
                          <p className="text-lg font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none mb-2 group-hover:text-indigo-600 transition-colors whitespace-nowrap">{sale.customer}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-[0.2em]">{sale.product}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-sm font-black text-slate-500 dark:text-slate-400 tracking-tight">₹{sale.baseAmount.toLocaleString('en-IN')}</td>
                  <td className="px-10 py-8 text-center whitespace-nowrap">
                     <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg italic">
                        {sale.gstRate}% Statutory
                     </span>
                  </td>
                  <td className="px-10 py-8 text-xl font-black text-right text-slate-900 dark:text-white tracking-tighter whitespace-nowrap">₹{calculateTotal(sale.baseAmount, sale.gstRate).toLocaleString('en-IN')}</td>
                  <td className="px-10 py-8 text-center whitespace-nowrap">
                    <span className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg ring-4 ring-white dark:ring-slate-900 ${getStatusColor(sale.status)}`}>
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
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Record Engagement</h2>
                  <p className="text-slate-500 font-black text-[10px] mt-1 uppercase tracking-[0.3em]">Fiscal Revenue Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors active:scale-90"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={addSale} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Client Organization Portfolio</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Bharat Petroleum Corp Ltd" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                    value={newSale.customer}
                    onChange={(e) => setNewSale({...newSale, customer: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Engagement Core (Product/Service)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Enterprise Automation Architecture" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                    value={newSale.product}
                    onChange={(e) => setNewSale({...newSale, product: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Base Fiscal Valuation</label>
                    <input 
                      required
                      type="number" 
                      placeholder="0.00" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                      value={newSale.baseAmount}
                      onChange={(e) => setNewSale({...newSale, baseAmount: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Statutory GST (%)</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white appearance-none"
                      value={newSale.gstRate}
                      onChange={(e) => setNewSale({...newSale, gstRate: parseInt(e.target.value)})}
                    >
                      <option value="5">5% (Essential Commodities)</option>
                      <option value="12">12% (Standard Assets)</option>
                      <option value="18">18% (Industrial Services)</option>
                      <option value="28">28% (Luxury Capital)</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-5 bg-indigo-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95">
                  Commit Transaction to Ledger
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
SalesPage;

