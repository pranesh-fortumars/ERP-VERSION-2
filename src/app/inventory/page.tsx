'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, FiAlertCircle, FiCheckCircle, FiTruck, FiMapPin, 
  FiSearch, FiFilter, FiDownload, FiPlus, FiArrowRight, FiActivity, FiX, FiDatabase, FiLayers, FiGlobe
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
    { label: 'Asset Value', value: '₹4.2 Cr', icon: <FiPackage className="w-5 h-5" />, color: 'blue' },
    { label: 'Critical SKU', value: stocks.filter(s => s.status !== 'Optimal').length, icon: <FiAlertCircle className="w-5 h-5" />, color: 'rose' },
    { label: 'Load Factor', value: '82%', icon: <FiDatabase className="w-5 h-5" />, color: 'emerald' },
    { label: 'In-Transit', value: '08', icon: <FiTruck className="w-5 h-5" />, color: 'amber' },
  ];

  const warehouses = [
    { name: 'Pune Logistics Hub', capacity: 92, location: 'Chakan, MH' },
    { name: 'Chennai Unit 2', capacity: 45, location: 'Sriperumbudur, TN' },
    { name: 'Mumbai Central Depot', capacity: 78, location: 'Bhiwandi, MH' },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Professional Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase leading-none">Asset Inventory</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 flex items-center gap-2">
            <FiLayers className="text-blue-600" /> Multi-Unit Stock Ledger & Warehouse Intelligence
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 shadow-sm">
            <FiDownload className="w-4 h-4" /> Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" /> Register SKU
          </button>
        </div>
      </div>

      {/* Tighter Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventorySummary.map((stat, i) => (
          <div key={i} className="industrial-card p-6 flex flex-col justify-between">
            <div className={`p-3 rounded-lg ${
              stat.color === 'blue' ? 'bg-blue-600/10 text-blue-600' :
              stat.color === 'rose' ? 'bg-rose-600/10 text-rose-600' :
              stat.color === 'emerald' ? 'bg-emerald-600/10 text-emerald-600' :
              'bg-amber-600/10 text-amber-600'
            } w-fit mb-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Stock Ledger */}
        <div className="xl:col-span-2 industrial-card flex flex-col overflow-hidden">
          <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <div>
               <h3 className="text-sm font-black tracking-widest text-slate-900 dark:text-white uppercase leading-none">SKU Master Ledger</h3>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative group flex-1 md:w-64">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Query SKU identifier..." 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-11 pr-4 text-xs focus:ring-1 focus:ring-blue-500/50 outline-none transition-all dark:text-white font-bold"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-500 transition-all active:scale-95">
                <FiFilter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/20">
                  <th className="py-4 px-8 text-[9px] font-black uppercase tracking-widest text-slate-400">Inventory Asset</th>
                  <th className="py-4 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">Batch Vol</th>
                  <th className="py-4 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Location</th>
                  <th className="py-4 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="py-4 px-8 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Valuation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStocks.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer data-table-row">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center font-black text-sm uppercase tracking-tighter shadow-sm">
                          {item.id.split('-')[1]}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 tracking-tight uppercase leading-none mb-1">{item.name}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-center">
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-tighter leading-none">{item.stock}</p>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.unit}</p>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-slate-400" size={10} />
                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">{item.warehouse}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest ${
                        item.status === 'Optimal' ? 'bg-emerald-500 text-white' : 
                        item.status === 'Low Stock' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white animate-pulse'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-5 px-8 text-right">
                      <p className="text-sm font-bold text-slate-900 dark:text-white tracking-tighter">{item.price}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Warehouse Distribution */}
        <div className="space-y-6 flex flex-col">
          {/* Professional Distribution Viz (Replaces Image) */}
          <div className="h-64 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 p-8 flex flex-col justify-between relative group">
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
             <div className="relative z-10">
                <FiGlobe className="text-blue-500 mb-6" size={24} />
                <h4 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-2">Global Distribution</h4>
                <p className="text-slate-400 text-[10px] font-medium max-w-[200px]">Stock flow synchronized across 4 enterprise-grade logistics hubs.</p>
             </div>
             <div className="relative z-10 flex gap-1 items-end h-16">
                {[40, 70, 90, 50, 80].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-500/20 rounded-t group-hover:bg-blue-500/40 transition-all" style={{ height: `${h}%` }} />
                ))}
             </div>
          </div>

          <div className="industrial-card p-10 flex-1 flex flex-col">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-10">Capacity Allocation</h3>
            <div className="space-y-8 flex-1">
              {warehouses.map((wh, i) => (
                <div key={i} className="space-y-3 group cursor-pointer">
                  <div className="flex justify-between items-end px-1">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-blue-600 transition-colors">{wh.name}</h4>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{wh.location}</p>
                    </div>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400 tracking-tighter">{wh.capacity}%</p>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${wh.capacity}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className="h-full bg-blue-600 rounded-full" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Replenish Banner */}
      <div className="industrial-card p-8 bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.05 }} />
        <div className="relative z-10 flex items-center gap-6">
           <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-lg flex items-center justify-center shadow-lg">
              <FiActivity className="text-white" size={28} />
           </div>
           <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-1">AI Replenishment Active</h3>
              <p className="text-blue-100 text-xs font-medium">Predictive algorithms flagged 4 critical SKUs for immediate procurement cycles.</p>
           </div>
        </div>
        <button className="relative z-10 bg-white text-blue-600 px-8 py-3.5 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:scale-105 active:scale-95 transition-all">
          Initialize Procurement
        </button>
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white uppercase leading-none">Register Asset</h2>
                  <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Stock Ledger Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={addItem} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Asset Nomenclature</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Chrome Plated Cylinder Unit" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white font-bold"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quantum</label>
                    <input 
                      required
                      type="number" 
                      placeholder="00" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white font-bold"
                      value={newItem.stock}
                      onChange={(e) => setNewItem({...newItem, stock: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unit Zone</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-xs outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white font-bold appearance-none"
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
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Statutory Valuation (Price)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. ₹5,000/U" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white font-bold"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  />
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

export default InventoryPage;

