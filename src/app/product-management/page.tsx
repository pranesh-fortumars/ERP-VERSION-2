'use client'

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiTag, FiBox, FiDollarSign, FiSearch, FiLayers, FiTruck, FiActivity, FiArchive, FiShield, FiCpu, FiMonitor } from 'react-icons/fi';

const ProductManagementPage = () => {
  const initialProducts = [
    { id: 1, name: 'Precision Turbine Blade X1', category: 'Heavy Machinery', price: 125000, stock: 45, supplier: 'BHEL Industrial', imageUrl: 'media__1774860970866.png' },
    { id: 2, name: 'Hydraulic Cylinder H4', category: 'Components', price: 45000, stock: 120, supplier: 'Tata Steel', imageUrl: 'industrial_turbine_parts_1774861039742.png' },
    { id: 3, name: 'Industrial Control Unit', category: 'Electronics', price: 85000, stock: 85, supplier: 'Reliance Electronics', imageUrl: 'industrial_robotic_arm_line_1774861143413.png' },
    { id: 4, name: 'Alloy Transmission Case', category: 'Automotive', price: 32000, stock: 300, supplier: 'Mahindra Logistics', imageUrl: 'media__1774860970866.png' },
    { id: 5, name: 'High-Torque Servomotor', category: 'Robotics', price: 55000, stock: 25, supplier: 'ABB Industrial', imageUrl: 'industrial_robotic_arm_line_1774861143413.png' },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', supplier: '', category: 'Heavy Machinery', price: '', stock: '' });

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.supplier.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => categoryFilter === 'All' || p.category === categoryFilter)
      .sort((a, b) => {
        if (sortBy === 'price-asc') return Number(a.price) - Number(b.price);
        if (sortBy === 'price-desc') return Number(b.price) - Number(a.price);
        if (sortBy === 'stock-asc') return Number(a.stock) - Number(b.stock);
        if (sortBy === 'stock-desc') return Number(b.stock) - Number(a.stock);
        return a.name.localeCompare(b.name);
      });
  }, [searchTerm, categoryFilter, sortBy, products]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts([{
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      imageUrl: 'media__1774860970866.png'
    }, ...products]);
    setIsModalOpen(false);
    setNewProduct({ name: '', supplier: '', category: 'Heavy Machinery', price: '', stock: '' });
  };

  const categories = ['All', ...Array.from(new Set(initialProducts.map(p => p.category)))];

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-all duration-500">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <FiShield className="animate-pulse" /> SKU Master Integrity Verified
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Product Lifecycle</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-1 flex items-center gap-2">
            <FiCpu className="text-indigo-500" /> Enterprise SKU Orchestration & Strategic Vendor Portfolio Management
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:shadow-lg transition-all active:scale-95 shadow-sm flex items-center gap-2">
            <FiArchive className="w-4 h-4" /> Export Ledger
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95"
          >
            <FiPlus className="w-4 h-4" /> Register SKU
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-8 bg-slate-50/20 dark:bg-slate-800/10">
        <div className="relative flex-1 group w-full">
          <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by SKU designation, tactical ID, or vendor portfolio..."
            className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-5 pl-14 pr-6 text-sm font-black focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all dark:text-white shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 bg-white dark:bg-slate-800 px-6 py-4.5 rounded-2xl border border-black/5 flex-1 md:flex-none shadow-sm group">
            <FiFilter className="text-slate-400 w-5 h-5 group-hover:text-indigo-500 transition-colors" />
            <select 
              className="bg-transparent text-[10px] font-black uppercase tracking-[0.2em] outline-none dark:text-slate-200 appearance-none cursor-pointer min-w-[120px]"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-slate-800 px-6 py-4.5 rounded-2xl border border-black/5 flex-1 md:flex-none shadow-sm group">
            <FiLayers className="text-slate-400 w-5 h-5 group-hover:text-indigo-500 transition-colors" />
            <select 
              className="bg-transparent text-[10px] font-black uppercase tracking-[0.2em] outline-none dark:text-slate-200 appearance-none cursor-pointer min-w-[150px]"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="name">Sorted: Lexical</option>
              <option value="price-asc">Sorted: Valuation (+)</option>
              <option value="price-desc">Sorted: Valuation (-)</option>
              <option value="stock-asc">Sorted: Critical Units</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-[56px] border border-slate-200 dark:border-slate-800 overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/50 transition-all duration-700 flex flex-col h-full ring-1 ring-black/5"
            >
              <div className='w-full h-72 relative overflow-hidden bg-slate-100 dark:bg-slate-950'>
                <Image 
                  src={product.imageUrl.startsWith('http') ? product.imageUrl : `/${product.imageUrl}`} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-8 left-8">
                  <span className="px-5 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] shadow-xl text-indigo-600 dark:text-indigo-400 border border-white dark:border-slate-800">
                    {product.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="p-10 flex flex-col flex-1">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.9] group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                     <FiMonitor className="text-slate-300 dark:text-slate-700 shrink-0 mt-1" />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <FiTruck className="text-indigo-500" /> {product.supplier}
                  </p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/80 flex items-end justify-between">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Unit Valuation</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Units in Node</p>
                    <div className="flex items-center gap-3 justify-end bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl ring-1 ring-black/5 shadow-inner">
                      <span className={`w-2.5 h-2.5 rounded-full ${Number(product.stock) < 100 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500 shadow-lg shadow-emerald-500/20'}`} />
                      <p className={`text-sm font-black tracking-tight ${Number(product.stock) < 100 ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
                        {product.stock}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Register Strategic SKU</h2>
                  <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em]">Catalog Master Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors active:scale-95"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Designation</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Industrial Servo Controller v4" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-black"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Vendor/Supplier Portfolio</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Reliance Industrial Systems" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-black"
                    value={newProduct.supplier}
                    onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Unit Valuation (₹)</label>
                    <input 
                      required
                      type="number" 
                      placeholder="0.00" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-black"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Opening Stock Cluster</label>
                    <input 
                      required
                      type="number" 
                      placeholder="0000" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4.5 px-6 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-black"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-5 bg-indigo-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95">
                  Commit SKU to Master Ledger
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductManagementPage;


