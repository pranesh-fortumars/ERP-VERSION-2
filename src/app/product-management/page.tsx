'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiTag, FiBox, FiDollarSign, FiSearch, FiLayers, FiTruck, FiActivity, FiArchive, FiShield, FiCpu, FiMonitor } from 'react-icons/fi';

const ProductManagementPage = () => {
  const initialProducts = [
    { id: 1, name: 'Precision Turbine Blade X1', category: 'Heavy Machinery', price: 125000, stock: 45, supplier: 'BHEL Industrial' },
    { id: 2, name: 'Hydraulic Cylinder H4', category: 'Components', price: 45000, stock: 120, supplier: 'Tata Steel' },
    { id: 3, name: 'Industrial Control Unit', category: 'Electronics', price: 85000, stock: 85, supplier: 'Reliance Electronics' },
    { id: 4, name: 'Alloy Transmission Case', category: 'Automotive', price: 32000, stock: 300, supplier: 'Mahindra Logistics' },
    { id: 5, name: 'High-Torque Servomotor', category: 'Robotics', price: 55000, stock: 25, supplier: 'ABB Industrial' },
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
    }, ...products]);
    setIsModalOpen(false);
    setNewProduct({ name: '', supplier: '', category: 'Heavy Machinery', price: '', stock: '' });
  };

  const categories = ['All', ...Array.from(new Set(initialProducts.map(p => p.category)))];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Professional Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 border-slate-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 text-slate-900 uppercase leading-none">Product Lifecycle</h1>
          <p className="text-slate-900 text-slate-900 text-sm font-bold mt-1 flex items-center gap-2">
            <FiCpu className="text-blue-600" /> Enterprise SKU Orchestration • Catalog Master 01
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-6 py-2.5 bg-white  border border-slate-200 border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-900 text-slate-900 hover:bg-slate-50 shadow-sm transition-all">
            EXPORT LEDGER
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" /> Register SKU
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="industrial-card p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-1 group w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by SKU designation or vendor portfolio..."
            className="w-full bg-white  border border-slate-200 border-slate-200 rounded-lg py-3 pl-11 pr-4 text-xs font-bold outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-slate-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="flex items-center gap-3 bg-white  px-4 py-3 rounded-lg border border-slate-200 border-slate-200 shadow-sm group">
            <FiFilter className="text-slate-900 group-hover:text-blue-500 transition-colors" />
            <select 
              className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none dark:text-slate-200 appearance-none cursor-pointer min-w-[120px]"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 bg-white  px-4 py-3 rounded-lg border border-slate-200 border-slate-200 shadow-sm group">
            <FiLayers className="text-slate-900 group-hover:text-blue-500 transition-colors" />
            <select 
              className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none dark:text-slate-200 appearance-none cursor-pointer min-w-[140px]"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="industrial-card overflow-hidden group flex flex-col h-full"
            >
              {/* CSS Schematic Visualization */}
              <div className="w-full h-48 relative bg-white border-b border-slate-800 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                <div className="absolute top-1/2 left-0 w-full h-px bg-blue-500/20" />
                <div className="absolute top-0 left-1/2 w-px h-full bg-blue-500/20" />
                
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-24 h-24 border-2 border-blue-500/30 rounded-full animate-spin-slow" />
                  <div className="absolute w-16 h-16 border border-blue-400/20 rounded-lg transform rotate-45" />
                </motion.div>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded shadow-lg">
                    {product.category}
                  </span>
                </div>
                
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                   <span className="text-[8px] font-black text-blue-500/80 uppercase tracking-widest">Active Matrix</span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex-1">
                   <h3 className="text-lg font-bold text-slate-900 text-slate-900 uppercase leading-none group-hover:text-blue-600 transition-colors mb-3">{product.name}</h3>
                   <p className="text-[9px] font-bold text-slate-900 dark:text-slate-900 uppercase tracking-widest flex items-center gap-2">
                     <FiTruck className="text-blue-500" /> {product.supplier}
                   </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100 border-slate-200/80 flex items-end justify-between">
                  <div>
                    <p className="text-[8px] font-black text-slate-900 uppercase tracking-widest mb-1.5">UNIT VALUATION</p>
                    <p className="text-xl font-bold text-slate-900 text-slate-900 tracking-tight">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black text-slate-900 uppercase tracking-widest mb-1.5">UNITS IN NODE</p>
                    <div className="flex items-center gap-2 justify-end px-3 py-1 bg-slate-50  rounded">
                      <span className={`w-1.5 h-1.5 rounded-full ${Number(product.stock) < 100 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                      <p className={`text-xs font-bold ${Number(product.stock) < 100 ? 'text-rose-600' : 'text-slate-900 text-slate-900'}`}>
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
              className="absolute inset-0 bg-white/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white  rounded-2xl p-10 border border-slate-200 border-slate-200 shadow-2xl"
            >
               <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 text-slate-900 uppercase leading-none">Register Strategic SKU</h2>
                  <p className="text-[9px] font-bold text-slate-900 mt-1 uppercase tracking-widest">Catalog Master Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">Asset Designation</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Industrial Transformer" 
                    className="w-full bg-slate-50  border-none rounded-lg py-4 px-6 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500/50 text-slate-900"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">Vendor Portfolio</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Tata Systems" 
                    className="w-full bg-slate-50  border-none rounded-lg py-4 px-6 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500/50 text-slate-900"
                    value={newProduct.supplier}
                    onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">Valuation (₹)</label>
                    <input 
                      required
                      type="number" 
                      placeholder="0.00" 
                      className="w-full bg-slate-50  border-none rounded-lg py-4 px-6 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500/50 text-slate-900"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">Opening Stock</label>
                    <input 
                      required
                      type="number" 
                      placeholder="000" 
                      className="w-full bg-slate-50  border-none rounded-lg py-4 px-6 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500/50 text-slate-900"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full mt-4 py-4 bg-blue-600 text-white rounded-lg font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
                  Commit SKU to Ledger
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


