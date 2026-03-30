'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiShoppingCart, FiTrendingUp, FiDollarSign, FiSearch, FiFileText, FiTarget, FiBox, FiCheckCircle, FiActivity } from 'react-icons/fi';
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
      case 'Completed': return 'bg-emerald-500 text-white';
      case 'Processing': return 'bg-amber-500 text-white';
      case 'Shipped': return 'bg-blue-600 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Professional Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase leading-none">Sales Revenue</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 flex items-center gap-2">
            <FiTarget className="text-blue-600" /> Enterprise Contract Orchestration • Performance Node 01
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 shadow-sm">
            <FiFileText className="w-4 h-4" /> Ledger
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" /> Record Contract
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Quarterly Revenue', value: `₹${(stats.totalRevenue/100000).toFixed(2)}L`, icon: <FiTrendingUp className="w-5 h-5" />, color: 'blue' },
          { label: 'Invoice Count', value: stats.count, icon: <FiFileText className="w-5 h-5" />, color: 'emerald' },
          { label: 'Avg Contract', value: `₹${(stats.avgOrder/1000).toFixed(1)}k`, icon: <FiDollarSign className="w-5 h-5" />, color: 'amber' },
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
        {/* Chart Section */}
        <div className="xl:col-span-2 industrial-card p-10 flex flex-col">
          <div className="flex items-center justify-between mb-10">
             <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Revenue Trajectory</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Cross-Sectoral Yield Analysis</p>
             </div>
             <div className="flex gap-2">
               <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded">
                  <FiTrendingUp /> +14.2% Growth
               </span>
             </div>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} tickFormatter={(v) => `₹${v/1000}k`} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={4} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="industrial-card p-10 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden group min-h-[450px]">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="relative z-10">
             <div className="w-14 h-14 bg-blue-600 rounded flex items-center justify-center mb-8 shadow-lg group-hover:rotate-12 transition-transform">
                <FiBox className="w-7 h-7" />
             </div>
             <h3 className="text-3xl font-black tracking-tighter uppercase leading-none mb-4">Flux Matrix</h3>
             <p className="text-slate-400 font-medium text-xs leading-relaxed mb-10 max-w-[220px]">Real-time demand sensing has identified <span className="text-blue-400 font-black">08 high-intensity</span> bulk contracts for dispatch synchronization.</p>
             <div className="space-y-3">
               {[45, 82, 60].map((w, i) => (
                 <div key={i} className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${w}%` }} />
                 </div>
               ))}
             </div>
          </div>
          <button className="w-full py-4 bg-white text-slate-900 font-black rounded-lg text-[10px] uppercase tracking-[0.4em] shadow-xl hover:bg-slate-100 transition-all active:scale-95 z-10">
            Audit Fulfillment
          </button>
        </div>
      </div>

      {/* Table & Filters */}
      <div className="industrial-card flex flex-col overflow-hidden">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col xl:flex-row justify-between items-center gap-6 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full xl:max-w-md group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search Invoice ID or Customer Matrix..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-11 pr-4 text-xs font-bold outline-none focus:ring-1 focus:ring-blue-500/50 transition-all dark:text-white"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'Completed', 'Processing', 'Shipped'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded text-[9px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-blue-500 active:scale-95'}`}
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
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Client Engagement</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Base Valuation</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Taxation</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Settlements</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group cursor-pointer data-table-row">
                  <td className="px-8 py-6 text-[10px] font-bold text-blue-600 uppercase tracking-tight">{sale.id}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                          <FiShoppingCart size={18} />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white uppercase leading-none mb-1.5 group-hover:text-blue-600 transition-colors">{sale.customer}</p>
                          <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">{sale.product}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-500 tracking-tight">₹{sale.baseAmount.toLocaleString('en-IN')}</td>
                  <td className="px-8 py-6 text-center">
                     <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                        {sale.gstRate}% Statutory
                     </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-right text-slate-900 dark:text-white tracking-tighter">₹{calculateTotal(sale.baseAmount, sale.gstRate).toLocaleString('en-IN')}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1 rounded text-[8px] font-black uppercase tracking-widest ${getStatusColor(sale.status)}`}>
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white uppercase leading-none">Record Engagement</h2>
                  <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Fiscal Revenue Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={addSale} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Client Organization Portfolio</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Tata Steel Ltd" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white"
                    value={newSale.customer}
                    onChange={(e) => setNewSale({...newSale, customer: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Engagement Core</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Precision Components" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white"
                    value={newSale.product}
                    onChange={(e) => setNewSale({...newSale, product: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Base Valuation</label>
                    <input 
                      required
                      type="number" 
                      placeholder="0.00" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white"
                      value={newSale.baseAmount}
                      onChange={(e) => setNewSale({...newSale, baseAmount: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Statutory GST (%)</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-[10px] font-bold outline-none appearance-none focus:ring-1 focus:ring-blue-500/50 dark:text-white"
                      value={newSale.gstRate}
                      onChange={(e) => setNewSale({...newSale, gstRate: parseInt(e.target.value)})}
                    >
                      <option value="5">GST 5%</option>
                      <option value="12">GST 12%</option>
                      <option value="18">GST 18%</option>
                      <option value="28">GST 28%</option>
                    </select>
                  </div>
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

export default SalesPage;

