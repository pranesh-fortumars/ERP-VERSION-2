'use client'

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiTag, FiBox, FiDollarSign, FiSearch, FiLayers, FiTruck } from 'react-icons/fi';

const ProductManagementPage = () => {
  const initialProducts = [
    { id: 1, name: 'Santoor Soap Pack', category: 'Toiletries', price: 40, stock: 100, supplier: 'Wipro Enterprises', imageUrl: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Parle-G Gold', category: 'Snacks', price: 10, stock: 500, supplier: 'Parle Products', imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Tata Tea Gold', category: 'Beverages', price: 200, stock: 200, supplier: 'Tata Consumer Products', imageUrl: 'https://images.unsplash.com/photo-1544787210-2211d7c9ad82?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Amul Salted Butter', category: 'Dairy', price: 50, stock: 150, supplier: 'Amul India', imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400' },
    { id: 5, name: 'Maggi 2-Min Noodles', category: 'Snacks', price: 12, stock: 300, supplier: 'Nestle India', imageUrl: 'https://images.unsplash.com/photo-1526234140026-66380c5cff9d?auto=format&fit=crop&q=80&w=400' },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', supplier: '', category: 'Toiletries', price: '', stock: '' });

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.supplier.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => categoryFilter === 'All' || p.category === categoryFilter)
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'stock-asc') return a.stock - b.stock;
        if (sortBy === 'stock-desc') return b.stock - a.stock;
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
      imageUrl: 'https://via.placeholder.com/400'
    }, ...products]);
    setIsModalOpen(false);
    setNewProduct({ name: '', supplier: '', category: 'Toiletries', price: '', stock: '' });
  };

  const categories = ['All', ...Array.from(new Set(initialProducts.map(p => p.category)))];

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Product Catalog</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Enterprise SKU management and vendor portfolio synchronization.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2 uppercase tracking-widest"
        >
          <FiPlus /> Register New Product
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search SKUs or Suppliers..."
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex-1 md:flex-none">
            <FiFilter className="text-slate-400" size={14} />
            <select 
              className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none dark:text-slate-200"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex-1 md:flex-none">
            <FiLayers className="text-slate-400" size={14} />
            <select 
              className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none dark:text-slate-200"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="name">Name A-Z</option>
              <option value="price-asc">Price Asc</option>
              <option value="price-desc">Price Desc</option>
              <option value="stock-asc">Stock Asc</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/5 transition-all"
            >
              <div className='w-full h-56 relative overflow-hidden bg-slate-100 dark:bg-slate-800'>
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-1">{product.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <FiTruck size={10} /> {product.supplier}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-end justify-between mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">MSRP / Unit</p>
                    <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">₹{product.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Stock</p>
                    <p className={`text-sm font-black ${product.stock < 100 ? 'text-rose-500 animate-pulse' : 'text-slate-900 dark:text-white'}`}>
                      {product.stock} Units
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Modal */}
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
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Register New Product</h2>
                  <p className="text-slate-500 font-medium text-xs mt-1 uppercase tracking-widest font-black">Catalog Master Entry</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Product Designation</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Precision Ball Bearing X1" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Supplier / Vendor</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. SKF India Ltd" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                    value={newProduct.supplier}
                    onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Unit Price (₹)</label>
                    <input 
                      required
                      type="number" 
                      placeholder="0.00" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Closing Stock</label>
                    <input 
                      required
                      type="number" 
                      placeholder="0" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full mt-4 py-4 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:scale-[1.01]">
                  Commit SKU to Catalog
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

