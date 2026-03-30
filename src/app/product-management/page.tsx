
'use client'

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiTag, FiBox, FiDollarSign } from 'react-icons/fi';

const ProductManagementPage = () => {
  const initialProducts = [
    { id: 1, name: 'Santoor Soap', category: 'Toiletries', price: 40, stock: 100, supplier: 'Wipro Enterprises', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Parle-G Biscuits', category: 'Snacks', price: 10, stock: 500, supplier: 'Parle Products', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Tata Tea', category: 'Beverages', price: 200, stock: 200, supplier: 'Tata Consumer Products', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Amul Butter', category: 'Dairy', price: 50, stock: 150, supplier: 'Amul', imageUrl: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Maggi Noodles', category: 'Snacks', price: 12, stock: 300, supplier: 'Nestle', imageUrl: 'https://via.placeholder.com/150' },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const tempProducts = products
      .filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(product => categoryFilter === 'All' || product.category === categoryFilter);

    return [...tempProducts].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'stock-asc') return a.stock - b.stock;
      if (sortBy === 'stock-desc') return b.stock - a.stock;
      return a.name.localeCompare(b.name);
    });
  }, [searchTerm, categoryFilter, sortBy, products]);

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const category = (form.elements.namedItem('category') as HTMLInputElement).value;
    const price = parseFloat((form.elements.namedItem('price') as HTMLInputElement).value);
    const stock = parseInt((form.elements.namedItem('stock') as HTMLInputElement).value, 10);
    const supplier = (form.elements.namedItem('supplier') as HTMLInputElement).value;

    const newProduct = {
      id: products.length + 1,
      name,
      category,
      price,
      stock,
      supplier,
      imageUrl: 'https://via.placeholder.com/150',
    };
    setProducts([...products, newProduct]);
    setIsModalOpen(false);
  };

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 lg:p-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Product Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center"
        >
          <FiPlus className="mr-2" /> Add Product
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border rounded-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto flex items-center space-x-2">
          <FiFilter className="text-gray-500" />
          <select 
            className="border rounded-lg p-2"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="w-full md:w-auto flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium">Sort by:</label>
          <select id="sort" className="border rounded-lg p-2" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="stock-asc">Stock (Low to High)</option>
            <option value="stock-desc">Stock (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className='w-full h-48 object-cover relative'>
                <Image src={product.imageUrl} alt={product.name} layout='fill' objectFit='cover' />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.supplier}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <FiTag className="mr-2"/> {product.category}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-lg font-semibold">
                  <FiDollarSign className="text-green-500"/> {product.price}
                </div>
                <div className="flex items-center text-sm">
                  <FiBox className="mr-2"/> {product.stock} units
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="grid grid-cols-1 gap-4">
                <input type="text" name="name" placeholder="Product Name" className="w-full border rounded-lg p-2" required />
                <input type="text" name="supplier" placeholder="Supplier" className="w-full border rounded-lg p-2" required />
                <input type="text" name="category" placeholder="Category" className="w-full border rounded-lg p-2" required />
                <input type="number" name="price" placeholder="Price" className="w-full border rounded-lg p-2" required />
                <input type="number" name="stock" placeholder="Stock" className="w-full border rounded-lg p-2" required />
              </div>
              <div className="flex justify-end mt-6">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductManagementPage;
