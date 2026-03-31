'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, FiAlertCircle, FiTruck, FiDatabase, FiPlus, FiX, 
  FiSearch, FiFilter, FiActivity, FiGlobe, FiLayers, FiDownload, FiUpload, FiMapPin, FiBarChart2
} from 'react-icons/fi';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([
    { id: 'SKU-7701', name: 'Precision Alloy Plate', category: 'Raw Materials', stock: 1240, status: 'Stable', color: 'text-blue-600 bg-blue-50', warehouse: 'Pune Hub', price: '₹75,000' },
    { id: 'SKU-8824', name: 'Neural Logic Core v2', category: 'WIP Goods', stock: 85, status: 'Low Stock', color: 'text-amber-600 bg-amber-50', warehouse: 'Chennai U2', price: '₹12,400' },
    { id: 'SKU-0091', name: 'Steel Housing - Node 7', category: 'Finished Goods', stock: 450, status: 'Stable', color: 'text-blue-600 bg-blue-50', warehouse: 'Pune Hub', price: '₹5,200' },
    { id: 'SKU-2150', name: 'High-Tensile Fasteners', category: 'Consumables', stock: 12, status: 'Critical', color: 'text-rose-600 bg-rose-50', warehouse: 'Mumbai Depot', price: '₹850' }
  ]);

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'Raw Materials', stock: '', warehouse: 'Pune Hub', price: '' });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('SUCCESS: Inventory Audit CSV generated and encrypted for transmission.');
    }, 1500);
  };

  const handleImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      alert('PROTOCOL COMPLETE: 124 new SKU artifacts synchronized with the main ledger.');
    }, 2000);
  };

  const filteredStocks = useMemo(() => {
    return inventory.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [inventory, searchTerm]);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `SKU-${Math.floor(Math.random() * 9000 + 1000)}`;
    const newEntry = { 
      ...newItem, 
      id, 
      stock: parseInt(newItem.stock) || 0, 
      status: (parseInt(newItem.stock) || 0) < 20 ? 'Critical' : 'Stable',
      color: (parseInt(newItem.stock) || 0) < 20 ? 'text-rose-600 bg-rose-50' : 'text-blue-600 bg-blue-50'
    };
    setInventory([newEntry, ...inventory]);
    setIsModalOpen(false);
    setNewItem({ name: '', category: 'Raw Materials', stock: '', warehouse: 'Pune Hub', price: '' });
  };

  const inventorySummary = [
    { label: 'Total Assets', value: inventory.reduce((acc, curr) => acc + curr.stock, 0).toLocaleString(), icon: <FiPackage className="w-5 h-5" />, color: 'blue' },
    { label: 'Critical SKU', value: inventory.filter(s => s.status !== 'Stable').length, icon: <FiAlertCircle className="w-5 h-5" />, color: 'sky' },
    { label: 'Load Factor', value: '82%', icon: <FiDatabase className="w-5 h-5" />, color: 'blue' },
    { label: 'In-Transit', value: '08', icon: <FiTruck className="w-5 h-5" />, color: 'blue' },
  ];

  const warehouses = [
    { name: 'Pune Logistics Hub', capacity: 92, location: 'Chakan, MH', color: 'bg-blue-600' },
    { name: 'Chennai Unit 2', capacity: 45, location: 'Sriperumbudur, TN', color: 'bg-indigo-600' },
    { name: 'Mumbai Central Depot', capacity: 78, location: 'Bhiwandi, MH', color: 'bg-sky-500' },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
            <FiGlobe className="animate-spin-slow" /> Supply Chain Infrastructure Active
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">Asset Inventory</h1>
          <p className="text-slate-500 font-bold text-sm mt-2 flex items-center gap-2">
            <FiLayers className="text-blue-600" /> Multi-Unit Stock Ledger & Warehouse Intelligence
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <button 
             onClick={handleImport}
             disabled={isImporting}
             className="px-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
           >
             {isImporting ? <div className="w-3 h-3 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" /> : <FiUpload />} {isImporting ? 'Syncing...' : 'Bulk Sync'}
           </button>
           <button 
             onClick={handleExport}
             disabled={isExporting}
             className="px-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
           >
             {isExporting ? <div className="w-3 h-3 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" /> : <FiDownload />} {isExporting ? 'Generating...' : 'Audit Export'}
           </button>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-10 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95"
           >
             <FiPlus /> Register Artifact
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventorySummary.map((stat, i) => (
          <div key={i} className="industrial-card p-10 flex flex-col justify-between bg-white border border-slate-100 shadow-sm rounded-[40px] hover:shadow-xl transition-all group overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
             <div className="flex justify-between items-start mb-10 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${i === 1 ? 'bg-amber-500 shadow-amber-500/20' : 'bg-blue-600 shadow-blue-600/20'} group-hover:rotate-12 transition-transform`}>
                   {stat.icon}
                </div>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 uppercase tracking-widest">Live Audit</span>
             </div>
             <div className="relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</h3>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 industrial-card flex flex-col bg-white border border-slate-100 shadow-sm rounded-[48px] overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-slate-50/20">
            <div>
               <h3 className="text-lg font-black tracking-widest text-slate-900 uppercase italic">Stock Ledger</h3>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Multi-Node SKU Identification</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
               <div className="relative group flex-1 md:w-80">
                  <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search logic identifiers..." 
                    className="w-full bg-slate-100/50 border-none rounded-2xl py-4 pl-16 pr-6 text-xs font-black outline-none focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:text-blue-600 transition-all shadow-sm active:scale-95"><FiFilter size={20} /></button>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/40 text-[9px] font-black uppercase tracking-widest text-slate-400">
                  <th className="py-5 px-10">Asset Designation</th>
                  <th className="py-5 px-6 italic">Category</th>
                  <th className="py-5 px-6">Valuation</th>
                  <th className="py-5 px-10 text-right">Stock Level / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStocks.map((item) => (
                  <tr key={item.id} className="group hover:bg-blue-50/30 transition-all cursor-pointer">
                    <td className="py-8 px-10">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600 shadow-sm relative">
                           <FiPackage size={24} />
                           <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white border border-slate-200 rounded-full flex items-center justify-center text-[7px] font-black text-slate-900 shadow-sm">
                              {item.id.split('-')[1].charAt(0)}
                           </div>
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 uppercase leading-none group-hover:text-blue-600 transition-colors">{item.name}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                             <FiMapPin size={10} /> {item.warehouse} • {item.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-8 px-6">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.category}</span>
                    </td>
                    <td className="py-8 px-6">
                       <span className="text-xs font-black text-slate-900 italic tracking-tighter">{item.price}</span>
                    </td>
                    <td className="py-8 px-10 text-right">
                        <div className="flex items-center gap-8 justify-end">
                           <div className="text-right">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Units</p>
                              <p className="text-sm font-black text-slate-900 leading-none">{item.stock.toLocaleString()}</p>
                           </div>
                           <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-black/5 shadow-sm min-w-[100px] text-center ${item.color}`}>
                              {item.status}
                           </span>
                           <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm">
                              <FiBarChart2 size={16} />
                           </button>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-10">
           <div className="industrial-card p-10 bg-blue-600 text-white rounded-[48px] overflow-hidden relative group min-h-[450px] flex flex-col justify-between shadow-2xl">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              <div className="relative z-10 flex flex-col h-full justify-between">
                 <div>
                    <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center shadow-2xl mb-8 group-hover:rotate-12 transition-transform ring-8 ring-white/10">
                       <FiActivity className="text-blue-600 w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-4">Capacity Vector</h3>
                    <p className="text-blue-50 text-xs font-medium leading-relaxed">Storage utilization is at <span className="text-white font-black italic">Theoretical Peak</span>. Scalability check recommended.</p>
                 </div>
                 <div className="space-y-6">
                    {warehouses.map((wh, i) => (
                      <div key={i} className="space-y-2.5">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-blue-100">
                          <span>{wh.name}</span>
                          <span className="text-white">{wh.capacity}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-blue-700/50 rounded-full overflow-hidden border border-white/5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${wh.capacity}%` }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                            className={`h-full ${wh.color} rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]`} 
                          />
                        </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-10 py-5 bg-white text-blue-600 font-black rounded-3xl text-[10px] uppercase tracking-[0.4em] active:scale-95 transition-all shadow-2xl hover:scale-[1.02]">
                    Audit Node Map
                 </button>
              </div>
           </div>
        </div>
      </div>

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
              className="relative w-full max-w-2xl bg-white rounded-[56px] p-10 md:p-14 border border-blue-500/10 shadow-3xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase leading-none">Register Artifact</h2>
                  <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em]">Supply Chain Ledger Entry</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors active:scale-95"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={addItem} className="space-y-8">
                 <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Nomenclature</label>
                   <input 
                     required
                     type="text" 
                     placeholder="e.g. Precision Alloy Cast v4" 
                     className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm font-black outline-none focus:ring-4 focus:ring-blue-600/5 text-slate-900 shadow-inner"
                     value={newItem.name}
                     onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                   />
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Domain Classification</label>
                     <select 
                       className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm font-black outline-none focus:ring-4 focus:ring-blue-600/5 text-slate-900 appearance-none shadow-inner"
                       value={newItem.category}
                       onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                     >
                       <option>Raw Materials</option>
                       <option>WIP Goods</option>
                       <option>Finished Goods</option>
                       <option>Consumables</option>
                     </select>
                   </div>
                   <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Batch Quantum (Quantity)</label>
                     <input 
                       required
                       type="number" 
                       placeholder="0.00" 
                       className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm font-black outline-none focus:ring-4 focus:ring-blue-600/5 text-slate-900 shadow-inner"
                       value={newItem.stock}
                       onChange={(e) => setNewItem({...newItem, stock: e.target.value})}
                     />
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Target Cluster (Warehouse)</label>
                     <select 
                       className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm font-black outline-none focus:ring-4 focus:ring-blue-600/5 text-slate-900 appearance-none shadow-inner"
                       value={newItem.warehouse}
                       onChange={(e) => setNewItem({...newItem, warehouse: e.target.value})}
                     >
                       <option>Pune Hub</option>
                       <option>Chennai U2</option>
                       <option>Mumbai Depot</option>
                     </select>
                   </div>
                   <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Market Valuation</label>
                     <input 
                       required
                       type="text" 
                       placeholder="₹0.00" 
                       className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm font-black outline-none focus:ring-4 focus:ring-blue-600/5 text-slate-900 shadow-inner"
                       value={newItem.price}
                       onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                     />
                   </div>
                 </div>
                 <button type="submit" className="w-full mt-6 py-6 bg-blue-600 text-white rounded-[32px] font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-90 flex items-center justify-center gap-3">
                    Commit Artifact to Ledger
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
