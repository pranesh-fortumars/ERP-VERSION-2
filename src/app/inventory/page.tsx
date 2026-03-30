'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, FiAlertCircle, FiCheckCircle, FiTruck, FiMapPin, 
  FiSearch, FiFilter, FiDownload, FiPlus, FiArrowRight, FiActivity, FiX, FiDatabase, FiLayers
} from 'react-icons/fi';
import Image from 'next/image';

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
    { label: 'Asset Value', value: '₹4.2 Cr', icon: <FiPackage className="w-5 h-5 md:w-6 md:h-6" />, color: 'indigo' },
    { label: 'Critical SKU', value: stocks.filter(s => s.status !== 'Optimal').length, icon: <FiAlertCircle className="w-5 h-5 md:w-6 md:h-6" />, color: 'rose' },
    { label: 'Warehouse Load', value: '82%', icon: <FiDatabase className="w-5 h-5 md:w-6 md:h-6" />, color: 'emerald' },
    { label: 'In-Transit', value: '08', icon: <FiTruck className="w-5 h-5 md:w-6 md:h-6" />, color: 'amber' },
  ];

  const warehouses = [
    { name: 'Pune Logistics Hub', capacity: 92, location: 'Chakan, MH' },
    { name: 'Chennai Unit 2', capacity: 45, location: 'Sriperumbudur, TN' },
    { name: 'Mumbai Central Depot', capacity: 78, location: 'Bhiwandi, MH' },
  ];

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-colors duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" /> Global Supply Distribution
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Asset Inventory</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-1 flex items-center gap-2">
            <FiLayers className="text-indigo-500" /> Multi-Unit Stock Ledger & Warehouse Intelligence
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 active:scale-95 shadow-sm">
            <FiDownload className="w-4 h-4" /> Export Ledger
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95"
          >
            <FiPlus className="w-4 h-4" /> Register Asset
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
            className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-indigo-500/50 transition-all duration-500 flex flex-col justify-between min-h-[160px]"
          >
            <div className={`p-4 rounded-2xl ${
              stat.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-600' :
              stat.color === 'rose' ? 'bg-rose-500/10 text-rose-600' :
              stat.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' :
              'bg-amber-500/10 text-amber-600'
            } w-fit mb-6 shadow-inner ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-500`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 leading-none">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Stock Table */}
        <div className="xl:col-span-2 p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
               <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">SKU Master Ledger</h3>
               <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1">Cross-Warehouse Unit Traceability</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative group flex-1 md:w-80">
                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Query SKU identifier..." 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 pl-12 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all dark:text-white font-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-black/5 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-95">
                <FiFilter className="text-slate-500 w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar -mx-10 md:mx-0 flex-1">
            <div className="inline-block min-w-full align-middle px-10 md:px-0">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400 pr-4">Inventory Asset</th>
                    <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center px-4">Batch Vol</th>
                    <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Location</th>
                    <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Status</th>
                    <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right pl-4">Valuation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredStocks.map((item, i) => (
                    <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer">
                      <td className="py-7 pr-4">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg uppercase group-hover:scale-110 transition-transform shadow-xl shadow-indigo-600/20 tracking-tighter">
                            {item.id.split('-')[1]}
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-lg font-black text-slate-900 dark:text-slate-100 truncate tracking-tight uppercase leading-none mb-1">{item.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{item.category} • {item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-7 text-center px-4">
                        <p className="text-xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter leading-none">{item.stock}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">{item.unit}</p>
                      </td>
                      <td className="py-7 px-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl ring-1 ring-black/5">
                             <FiMapPin className="text-slate-400" size={14} />
                          </div>
                          <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight">{item.warehouse}</span>
                        </div>
                      </td>
                      <td className="py-7 px-4 whitespace-nowrap">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] inline-block shadow-lg ring-4 ring-white dark:ring-slate-900 ${
                          item.status === 'Optimal' ? 'bg-emerald-500 text-white' : 
                          item.status === 'Low Stock' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white animate-pulse'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-7 text-right pl-4">
                        <p className="text-lg font-black text-slate-900 dark:text-white tracking-tighter leading-none">{item.price}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Warehouse Distribution */}
        <div className="space-y-8 flex flex-col">
          {/* Asset Image Card */}
          <div className="relative h-64 w-full rounded-[48px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl group">
             <Image 
               src="/industrial_turbine_parts_1774861039742.png" 
               alt="Turbine Asset Inventory" 
               fill 
               className="object-cover contrast-125 dark:contrast-100 group-hover:scale-110 transition-transform duration-1000 grayscale dark:grayscale-0 brightness-110 dark:brightness-75"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
             <div className="absolute bottom-8 left-8 text-white">
                <h4 className="text-xl font-black uppercase tracking-tighter mb-1">Stock Spotlight</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Precision Machined Core Assets</p>
             </div>
          </div>

          <div className="p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
            <h3 className="text-xl font-black tracking-tighter mb-10 text-slate-900 dark:text-white uppercase leading-none">Capacity Allocation</h3>
            <div className="space-y-8 flex-1">
              {warehouses.map((wh, i) => (
                <div key={i} className="space-y-4 group cursor-pointer">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{wh.name}</h4>
                      <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">{wh.location}</p>
                    </div>
                    <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">{wh.capacity}%</p>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner ring-1 ring-black/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${wh.capacity}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className="h-full bg-indigo-600 rounded-full shadow-glow-indigo" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 bg-indigo-600 rounded-[48px] text-white shadow-2xl shadow-indigo-600/40 relative overflow-hidden group flex-1 flex flex-col justify-between min-h-[350px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-indigo-600 to-transparent opacity-90 transition-opacity group-hover:opacity-100 duration-700" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-[24px] flex items-center justify-center mb-8 ring-1 ring-white/20 group-hover:rotate-12 transition-transform duration-700 shadow-inner">
                <FiActivity className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase leading-none">AI Replenish</h3>
              <p className="text-indigo-100/70 font-medium text-[13px] leading-relaxed mb-10 max-w-[250px]">Intelligence has flagged 4 SKUs for upcoming procurement cycles based on neural demand forecasts.</p>
            </div>
            <button className="w-full py-5 bg-white text-indigo-600 font-black rounded-3xl text-[10px] uppercase tracking-[0.4em] relative z-10 hover:bg-slate-50 transition-all shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-95 mt-4">
              Initialize Logistics Cycle
            </button>
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
              className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[48px] p-10 md:p-14 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Register Asset</h2>
                  <p className="text-slate-500 font-black text-[10px] mt-1 uppercase tracking-[0.3em]">Stock Ledger Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors active:scale-90"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={addItem} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Nomenclature</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Chrome Plated Cylinder Unit" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-black"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Quantum</label>
                    <input 
                      required
                      type="number" 
                      placeholder="00" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-black"
                      value={newItem.stock}
                      onChange={(e) => setNewItem({...newItem, stock: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Unit Zone</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-black appearance-none"
                      value={newItem.warehouse}
                      onChange={(e) => setNewItem({...newItem, warehouse: e.target.value})}
                    >
                      <option>Pune-A</option>
                      <option>Mumbai-Main</option>
                      <option>Chennai-B</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Statutory Valuation (Price)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. ₹5,000/U" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-black"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full mt-6 py-5 bg-indigo-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95">
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


