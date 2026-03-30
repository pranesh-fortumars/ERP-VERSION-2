'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiFilter, FiPlus, FiPhone, FiMail, FiMapPin, FiBriefcase } from 'react-icons/fi';

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
    status: 'In Review',
    notes: 'Reviewing the pricing proposal for the enterprise suite.' 
  },
  { 
    id: 5, 
    name: 'Sunita Rao', 
    company: 'HealthFirst Diagnostics', 
    email: 'sunita.rao@healthfirst.in', 
    phone: '+91 54321-09876', 
    lastContact: '2024-03-01', 
    location: 'Hyderabad, TS',
    gstin: '36AAAPH7890E5Z8',
    status: 'Onboarding',
    notes: 'Awaiting deployment of the HR payroll module.' 
  },
];

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredCustomers = useMemo(() => {
    return initialCustomers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        customer.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'All' || customer.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enterprise Clients</h1>
          <p className="text-slate-500 font-medium tracking-tight">Manage your Indian business partnerships and relationships</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all">
          <FiPlus /> Add Enterprise Client
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 group">
          <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, company, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <FiX />
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          {['All', 'Active', 'Lead', 'Onboarding'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterStatus === status 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCustomers.map((customer, i) => (
            <motion.div
              layout
              key={customer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="group bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 premium-shadow hover:border-indigo-200 dark:hover:border-indigo-900 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-950/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="flex items-center gap-4 mb-6 relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold group-hover:text-indigo-600 transition-colors">{customer.name}</h2>
                  <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                    <FiBriefcase className="text-xs" /> {customer.company}
                  </p>
                </div>
              </div>

              <div className="space-y-4 relative">
                <div className="flex items-start gap-3">
                  <FiMail className="mt-1 text-slate-400" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Corporate Email</p>
                    <a href={`mailto:${customer.email}`} className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600">
                      {customer.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiPhone className="mt-1 text-slate-400" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Direct Phone</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{customer.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-2">
                  <div className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                     <p className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Location</p>
                     <p className="text-xs font-bold flex items-center gap-1"><FiMapPin className="text-[10px]" /> {customer.location}</p>
                  </div>
                  <div className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                     <p className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">GSTIN</p>
                     <p className="text-xs font-bold text-indigo-600">{customer.gstin}</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    customer.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                    customer.status === 'Lead' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomersPage;
