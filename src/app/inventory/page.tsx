'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, FiSearch, FiSliders, FiAlertTriangle, 
  FiCheckCircle, FiTruck, FiBox, FiLayers, FiClock 
} from 'react-icons/fi';

const initialInventory = [
  { id: 1, name: 'Cold Rolled Steel Coil', sku: 'ST-CR-001', category: 'Raw Materials', warehouse: 'Pune-W1', quantity: 450, unit: 'Tons', reorderLevel: 100, lastUpdated: '2024-03-25' },
  { id: 2, name: 'Aluminum Alloy 6061', sku: 'AL-60-045', category: 'Raw Materials', warehouse: 'Chennai-W2', quantity: 85, unit: 'Tons', reorderLevel: 50, lastUpdated: '2024-03-22' },
  { id: 3, name: 'Micro-Controller Unit X', sku: 'EL-MCU-99', category: 'Electronics', warehouse: 'Bangalore-E1', quantity: 1200, unit: 'Units', reorderLevel: 2000, lastUpdated: '2024-03-26' },
  { id: 4, name: 'Industrial Lubricant VR-4', sku: 'CH-LB-12', category: 'Consumables', warehouse: 'Hyderabad-C3', quantity: 12, unit: 'Barrels', reorderLevel: 15, lastUpdated: '2024-03-20' },
  { id: 5, name: 'Hydraulic Piston Assembly', sku: 'ME-HP-88', category: 'Spare Parts', warehouse: 'Gurugram-N1', quantity: 24, unit: 'Units', reorderLevel: 10, lastUpdated: '2024-03-24' },
];

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStockStatus = (quantity: number, reorderLevel: number) => {
    if (quantity <= reorderLevel) {
      return { label: 'Low Stock', color: 'bg-rose-100 text-rose-700', icon: FiAlertTriangle };
    } else if (quantity <= reorderLevel * 1.5) {
      return { label: 'Reorder Soon', color: 'bg-amber-100 text-amber-700', icon: FiClock };
    } else {
      return { label: 'Optimal', color: 'bg-emerald-100 text-emerald-700', icon: FiCheckCircle };
    }
  };

  const filteredInventory = initialInventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Industrial Inventory</h1>
          <p className="text-slate-500 font-medium tracking-tight">Stock monitoring across PAN-India warehouses</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center gap-2">
            <FiTruck /> Logistics View
          </button>
          <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
            + New Stock Entry
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Value', value: '₹4.2 Cr', icon: FiLayers, color: 'text-indigo-600' },
          { label: 'Critical Items', value: '03', icon: FiAlertTriangle, color: 'text-rose-600' },
          { label: 'Active SKU', value: '1,240', icon: FiPackage, color: 'text-amber-600' },
          { label: 'Units Recieved', value: '45', icon: FiTruck, color: 'text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="p-5 bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider leading-none mb-1">{stat.label}</p>
              <h4 className="text-xl font-bold tracking-tighter">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Product Name, SKU, or Category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
          />
        </div>
        <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-200 transition-all">
          <FiSliders /> Filter Categories
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredInventory.map((item, i) => {
            const status = getStockStatus(item.quantity, item.reorderLevel);
            const StatusIcon = status.icon;
            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="group bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 overflow-hidden premium-shadow hover:border-indigo-200 transition-all cursor-pointer"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em] mb-1 block">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-1">{item.sku}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                      <FiPackage className="w-6 h-6 text-slate-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Stock Level</p>
                      <p className="text-[15px] font-bold">{item.quantity} {item.unit}</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Warehouse</p>
                      <p className="text-[15px] font-bold truncate">{item.warehouse}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${status.color}`}>
                      <StatusIcon size={12} /> {status.label}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Updated</p>
                      <p className="text-[11px] font-bold">{item.lastUpdated}</p>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-4 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800/50 flex justify-between items-center group-hover:bg-indigo-50/50 transition-all">
                  <span className="text-xs font-bold text-slate-500">View Batch Details</span>
                  <FiBox className="text-slate-400 group-hover:text-indigo-500 transition-all" />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InventoryPage;
