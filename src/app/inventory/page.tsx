'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, FiAlertCircle, FiCheckCircle, FiTruck, FiMapPin, 
  FiSearch, FiFilter, FiDownload, FiPlus, FiArrowRight, FiActivity, FiX 
} from 'react-icons/fi';

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stocks, setStocks] = useState([
    { id: 'SKU-001', name: 'Cold Rolled Steel Coil', category: 'Raw Material', stock: 450, unit: 'Tons', warehouse: 'Pune-A', status: 'Optimal', price: '₹75,000/T' },
    { id: 'SKU-005', name: 'Precision Bearings X2', category: 'Components', stock: 12, unit: 'Units', warehouse: 'Chennai-B', status: 'Low Stock', price: '₹1,200/U' },
    { id: 'SKU-009', name: 'Industrial Lubricant Z4', category: 'Chemicals', stock: 8, unit: 'Liters', warehouse: 'Mumbai-Main', status: 'Critical', price: '₹850/L' },
    { id: 'SKU-012', name: 'Aluminium Extrusions', category: 'Raw Material', stock: 1200, unit: 'Meters', warehouse: 'Pune-B', status: 'Optimal', price: '₹420/M' },
  ]);

  const [newItem, setNewItem] = useState({ name: '', category: 'Raw Material', stock: '', unit: 'Units', warehouse: 'Pune-A', price: '' });

  const filteredStocks = useMemo(() => {
    return stocks.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [stocks, searchTerm]);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `SKU-${Math.floor(Math.random() * 900 + 100)}`;
    const status = parseInt(newItem.stock) < 10 ? 'Critical' : parseInt(newItem.stock) < 50 ? 'Low Stock' : 'Optimal';
    setStocks([{ ...newItem, id, status, stock: parseInt(newItem.stock) }, ...stocks]);
    setIsModalOpen(false);
    setNewItem({ name: '', category: 'Raw Material', stock: '', unit: 'Units', warehouse: 'Pune-A', price: '' });
  };

  const inventorySummary = [
    { label: 'Total Value', value: '₹4.2 Cr', icon: <FiPackage />, color: 'indigo' },
    { label: 'Low Stock SKU', value: stocks.filter(s => s.status !== 'Optimal').length, icon: <FiAlertCircle />, color: 'rose' },
    { label: 'Warehouse Load', value: '82%', icon: <FiActivity />, color: 'emerald' },
    { label: 'Transit Batches', value: '08', icon: <FiTruck />, color: 'amber' },
  ];

  const warehouses = [
    { name: 'Pune Logistics Hub', capacity: 92, location: 'Chakan, MH' },
    { name: 'Chennai Unit 2', capacity: 45, location: 'Sriperumbudur, TN' },
    { name: 'Mumbai Central Depot', capacity: 78, location: 'Bhiwandi, MH' },
  ];

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-colors">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Asset & Inventory</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Real-time stock ledger and multi-warehouse distribution center.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold hover:shadow-lg transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <FiDownload /> Export SKU List
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <FiPlus /> Register New Asset
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventorySummary.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm grow"
          >
            <div className={`p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 w-fit mb-4`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Stock Table */}
        <div className="xl:col-span-2 p-6 md:p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-black">SKU Master Ledger</h3>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative group flex-1 md:w-64">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Query SKU code..." 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2.5 pl-10 text-xs focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors">
                <FiFilter className="text-slate-500" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar -mx-6 md:mx-0">
            <div className="inline-block min-w-full align-middle px-6 md:px-0">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 pr-4">Inventory Item</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center px-4">Batch Vol</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Warehouse</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Status</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right pl-4">Asset Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredStocks.map((item, i) => (
                    <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                      <td className="py-5 pr-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-black text-xs uppercase group-hover:scale-110 transition-transform">
                            {item.id.split('-')[1]}
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate max-w-[120px] md:max-w-none">{item.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category} • {item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 text-center px-4">
                        <p className="text-sm font-black text-indigo-600 leading-none">{item.stock}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.unit}</p>
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-slate-300" size={14} />
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{item.warehouse}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block ${
                          item.status === 'Optimal' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 
                          item.status === 'Low Stock' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 animate-pulse'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-5 text-right pl-4">
                        <p className="text-sm font-black text-slate-900 dark:text-white">{item.price}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Warehouse Distribution */}
        <div className="space-y-8 lg:flex lg:flex-row xl:flex-col lg:gap-8 xl:gap-0 lg:space-y-0 xl:space-y-8">
          <div className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
            <h3 className="text-xl font-bold tracking-tight mb-8 text-slate-900 dark:text-white font-black">Capacity Allocation</h3>
            <div className="space-y-8">
              {warehouses.map((wh, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">{wh.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{wh.location}</p>
                    </div>
                    <p className="text-lg font-black text-indigo-600">{wh.capacity}%</p>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${wh.capacity}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className="h-full bg-indigo-600 rounded-full" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-indigo-600 rounded-[40px] text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group flex-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-indigo-600 to-transparent opacity-80" />
            <div className="relative z-10">
              <FiActivity className="mb-6 opacity-80" size={32} />
              <h3 className="text-2xl font-black mb-2 tracking-tight">Automated Replenishment</h3>
              <p className="text-indigo-100 font-medium opacity-80 text-[13px] mb-8 leading-relaxed">AI Predictor has flagged 4 SKUs for upcoming procurement cycles based on machine learning forecasts.</p>
              <button className="w-full py-3.5 bg-white text-indigo-600 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all hover:scale-[1.02] active:scale-95 shadow-lg">
                Run Optimizer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
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
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Register New Asset</h2>
                  <p className="text-slate-500 font-medium text-xs mt-1 uppercase tracking-widest font-black">Stock Ledger Entry</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={addItem} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Chrome Plated Cylinder" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Quantity</label>
                    <input 
                      required
                      type="number" 
                      placeholder="00" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                      value={newItem.stock}
                      onChange={(e) => setNewItem({...newItem, stock: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Warehouse</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                      value={newItem.warehouse}
                      onChange={(e) => setNewItem({...newItem, warehouse: e.target.value})}
                    >
                      <option>Pune-A</option>
                      <option>Mumbai-Main</option>
                      <option>Chennai-B</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Standard Valuation (Price)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. ₹5,000/U" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:scale-[1.01]">
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

export default InventoryPage;

