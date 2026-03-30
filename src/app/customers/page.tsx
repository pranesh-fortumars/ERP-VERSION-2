'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiFilter, FiPlus, FiPhone, FiMail, FiMapPin, FiBriefcase, FiCreditCard } from 'react-icons/fi';

const initialCustomers = [
  { 
    id: 1, 
    name: 'Priya Sharma', 
    company: 'Innovate Solutions Pvt Ltd', 
    email: 'priya.sharma@innovate.in', 
    phone: '+91 98765-43210', 
    lastContact: '2024-03-15', 
    location: 'Mumbai, MH',
    gstin: '27AAACI1234A1Z5',
    status: 'Active',
    notes: 'Primary contact for the Cloud Infrastructure project.' 
  },
  { 
    id: 2, 
    name: 'Rahul Kumar', 
    company: 'Bharat Technologies', 
    email: 'rahul.kumar@bharattech.com', 
    phone: '+91 87654-32109', 
    lastContact: '2024-03-10', 
    location: 'Bangalore, KA',
    gstin: '29ABBCH5678B2Z1',
    status: 'Lead',
    notes: 'Interested in AI-driven BPA solutions.' 
  },
  { 
    id: 3, 
    name: 'Anjali Singh', 
    company: 'Creative Designs Hub', 
    email: 'anjali.singh@cdhub.in', 
    phone: '+91 76543-21098', 
    lastContact: '2024-02-28', 
    location: 'Delhi, DL',
    gstin: '07AAECR9012C3Z2',
    status: 'Active',
    notes: 'Needs periodic reports on manufacturing efficiency.' 
  },
  { 
    id: 4, 
    name: 'Vikram Mehta', 
    company: 'Data Weavers & Logistics', 
    email: 'vikram.mehta@dataweavers.com', 
    phone: '+91 65432-10987', 
    lastContact: '2024-03-05', 
    location: 'Ahmedabad, GJ',
    gstin: '24AAADW3456D4Z9',
    status: 'Reviewing',
    notes: 'Reviewing the pricing proposal for the enterprise suite.' 
  },
];

const CustomersPage = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', company: '', email: '', phone: '', location: 'Mumbai, MH', gstin: '' });

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        customer.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'All' || customer.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus, customers]);

  const addCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomers([{ 
      ...newCustomer, 
      id: Date.now(), 
      status: 'Onboarding', 
      lastContact: new Date().toISOString().split('T')[0],
      notes: 'Newly added enterprise client.'
    }, ...customers]);
    setIsModalOpen(false);
    setNewCustomer({ name: '', company: '', email: '', phone: '', location: 'Mumbai, MH', gstin: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Lead': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Onboarding': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'Reviewing': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Enterprise Clients</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Manage your Indian business partnerships and relationships</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2 uppercase tracking-widest"
        >
          <FiPlus /> Add Enterprise Client
        </button>
      </div>

      {/* Filters & Search */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, company, or email..."
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {['All', 'Active', 'Lead', 'Onboarding', 'Reviewing'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filterStatus === status 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredCustomers.map((customer, i) => (
            <motion.div
              layout
              key={customer.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="w-16 h-16 rounded-[24px] bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors leading-tight">{customer.name}</h2>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-1">
                    <FiBriefcase className="text-indigo-500" /> {customer.company}
                  </p>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4 px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent group-hover:border-slate-100 dark:group-hover:border-slate-700 transition-colors">
                    <FiMail className="text-indigo-500" />
                    <div className="overflow-hidden">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Corporate Link</p>
                      <p className="text-xs font-black text-slate-700 dark:text-slate-300 truncate">{customer.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent group-hover:border-slate-100 dark:group-hover:border-slate-700 transition-colors">
                    <FiPhone className="text-indigo-500" />
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Direct Comms</p>
                      <p className="text-xs font-black text-slate-700 dark:text-slate-300">{customer.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent">
                     <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Node</p>
                     <p className="text-[11px] font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5"><FiMapPin className="text-rose-500" /> {customer.location}</p>
                  </div>
                  <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent">
                     <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Fiscal ID</p>
                     <p className="text-[11px] font-black text-indigo-600 dark:text-indigo-400">{customer.gstin || 'PENDING'}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(customer.status)}`}>
                    {customer.status}
                  </span>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Touch</p>
                    <p className="text-[11px] font-black text-slate-900 dark:text-slate-100">{customer.lastContact}</p>
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
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Register Enterprise Client</h2>
                  <p className="text-slate-500 font-medium text-xs mt-1 uppercase tracking-widest font-black">CRM Ledger Entry</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={addCustomer} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Contact Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Arjun Mehta" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Organization</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Blue Star Ltd" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                      value={newCustomer.company}
                      onChange={(e) => setNewCustomer({...newCustomer, company: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Corporate Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                    <input 
                      required
                      type="text" 
                      placeholder="+91 XXXXX-XXXXX" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">GSTIN (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="GST Identification No" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white font-bold"
                      value={newCustomer.gstin}
                      onChange={(e) => setNewCustomer({...newCustomer, gstin: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full mt-4 py-4 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:scale-[1.01]">
                  Commit Client to CRM
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomersPage;

