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

  const calculateTotal = (base: number, gst: number) => base + (base * gst / 100);

  const stats = useMemo(() => {
    const totalRevenue = sales.reduce((acc, s) => acc + calculateTotal(s.baseAmount, s.gstRate), 0);
    const avgOrder = sales.length > 0 ? totalRevenue / sales.length : 0;
    
    // Simple chart data mapping
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      case 'Processing': return 'bg-amber-100 text-amber-700';
      case 'Shipped': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales & Revenue</h1>
          <p className="text-slate-500 font-medium tracking-tight">Manage enterprise contracts and GST-compliant invoices</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <FiPlus /> Record New Contract
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Quarterly Revenue', value: `₹${(stats.totalRevenue/100000).toFixed(2)}L`, icon: FiTrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Total Invoices', value: stats.count, icon: FiFileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg Contract Value', value: `₹${(stats.avgOrder/1000).toFixed(1)}k`, icon: FiDollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 premium-shadow flex items-center gap-6">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <h4 className="text-3xl font-bold tracking-tighter">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-bold mb-8">Revenue Growth (Weekly Portfolio)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.chartData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fill="url(#salesGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table & Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Invoice ID or Customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none rounded-xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Completed', 'Processing', 'Shipped'].map(s => (
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
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Base Value</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">GST (%)</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Total (INR)</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSales.map((sale, i) => (
                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-5 text-sm font-black text-indigo-600">{sale.id}</td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold leading-none">{sale.customer}</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-medium">{sale.product}</p>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-600">₹{sale.baseAmount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-400">{sale.gstRate}%</td>
                  <td className="px-6 py-5 text-sm font-black">₹{calculateTotal(sale.baseAmount, sale.gstRate).toLocaleString('en-IN')}</td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-500">{sale.date}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusColor(sale.status)}`}>
                      {sale.status}
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

export default SalesPage;
