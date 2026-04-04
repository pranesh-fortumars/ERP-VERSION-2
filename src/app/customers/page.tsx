'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiBarChart2, FiPieChart, FiChevronDown, FiDownload, FiArrowUpRight, FiSearch, FiPlus, FiX, FiLayers, FiUpload, FiPhone, FiMail, FiMapPin, FiBriefcase, FiCreditCard, FiUsers, FiActivity, FiGlobe } from 'react-icons/fi';

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
    engagement: 88,
    color: 'bg-indigo-600',
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
    engagement: 42,
    color: 'bg-indigo-600',
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
    engagement: 95,
    color: 'bg-sky-500',
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
    engagement: 15,
    color: 'bg-indigo-400',
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
      engagement: 10,
      color: 'bg-emerald-500',
      lastContact: new Date().toISOString().split('T')[0],
      notes: 'Newly added enterprise client.'
    }, ...customers]);
    setIsModalOpen(false);
    setNewCustomer({ name: '', company: '', email: '', phone: '', location: 'Mumbai, MH', gstin: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20';
      case 'Lead': return 'bg-amber-500 text-white shadow-lg shadow-amber-500/20';
      case 'Onboarding': return 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20';
      case 'Reviewing': return 'bg-rose-500 text-white shadow-lg shadow-rose-500/20';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-colors duration-500">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-[14px] font-serif-professional tracking-wide  tracking-[0.2em] mb-4">
            <FiGlobe className="animate-spin-slow" /> Global Entity Registry Operational
          </div>
          <h1 className="text-3xl md:text-3xl font-black tracking-tight text-slate-950 uppercase leading-none">Client Matrix</h1>
          <p className="text-slate-950 font-bold tracking-tight mt-1 flex items-center gap-2">
            <FiUsers className="text-indigo-500" /> CRM Infrastructure & Strategic Partner Lifecycle Management
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-[24px] text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
             <FiUpload /> Batch Upload
           </button>
           <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-[24px] text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
             <FiDownload /> Audit Export
           </button>
           <button 
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-3 bg-indigo-600 text-white rounded-[24px] text-[14px] font-serif-professional tracking-wide  tracking-[0.3em] shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95"
          >
            <FiPlus className="w-4 h-4" /> Register Identity
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Search & Filters */}
        <div className="xl:col-span-3 space-y-8">
           <div className="industrial-card p-8 bg-white rounded-[40px] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
              <div className="relative flex-1 group w-full">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-950 group-focus-within:text-indigo-500 transition-colors w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by contact identity, organization, or corporate link..."
                  className="w-full bg-slate-50 border-none rounded-[24px] py-4.5 pl-16 pr-6 text-xl font-black focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all text-slate-950 shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {['All', 'Active', 'Lead', 'Onboarding', 'Reviewing'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-6 py-2.5 rounded-[24px] text-[14px] font-serif-professional tracking-wide  tracking-widest transition-all ${
                      filterStatus === status 
                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' 
                        : 'bg-white text-slate-950 border border-black/5 hover:bg-slate-100 active:scale-95'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredCustomers.map((customer, i) => (
                  <motion.div
                    layout
                    key={customer.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="industrial-card group bg-white rounded-[40px] border border-slate-200 p-10 shadow-sm hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
                    
                    <div className="flex items-start justify-between mb-10 relative z-10">
                      <div className="flex items-center gap-6">
                        <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center text-white font-black text-3xl shadow-2xl transition-transform duration-700 ring-4 ring-slate-100 ${customer.color || 'bg-indigo-600'}`}>
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-3xl font-black text-slate-950 tracking-tight uppercase leading-none mb-2">{customer.name}</h2>
                          <p className="text-[14px] font-black text-slate-950 uppercase tracking-[0.2em] flex items-center gap-2">
                             <FiBriefcase className="text-indigo-500" /> {customer.company}
                          </p>
                        </div>
                      </div>
                      <span className={`px-5 py-1.5 rounded-full text-[13px] font-serif-professional tracking-wide  tracking-widest shadow-lg ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </div>

                    <div className="space-y-8 relative z-10">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-5 px-6 py-4 bg-slate-50 rounded-[24px] border border-transparent group-hover:border-indigo-500/20 transition-all">
                          <FiMail className="text-indigo-500 w-5 h-5" />
                          <div className="flex-1 overflow-hidden">
                            <p className="text-[13px] font-serif-professional tracking-wide  text-slate-950 tracking-[0.2em] leading-none mb-2">Corporate Artifact</p>
                            <p className="text-base font-black text-slate-950 truncate">{customer.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-5 px-6 py-4 bg-slate-50 rounded-[24px] border border-transparent group-hover:border-indigo-500/20 transition-all">
                          <FiPhone className="text-indigo-500 w-5 h-5" />
                          <div>
                            <p className="text-[13px] font-serif-professional tracking-wide  text-slate-950 tracking-[0.2em] leading-none mb-2">Secure Link</p>
                            <p className="text-base font-black text-slate-950">{customer.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="px-6 py-4 bg-slate-50 rounded-[24px] flex flex-col justify-center">
                           <p className="text-[13px] font-serif-professional tracking-wide  text-slate-950 tracking-widest mb-2">Geospatial Node</p>
                           <p className="text-base font-black text-slate-950 flex items-center gap-2"><FiMapPin className="text-rose-500" /> {customer.location}</p>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 rounded-[24px] flex flex-col justify-center text-right overflow-hidden">
                           <p className="text-[13px] font-serif-professional tracking-wide  text-slate-950 tracking-widest mb-2 text-right">Fiscal Signature</p>
                           <p className="text-[14px] font-black text-indigo-600 truncate tracking-tight uppercase">{customer.gstin || 'PENDING EXECUTION'}</p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                         <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                               <p className="text-[13px] font-black text-slate-950 uppercase tracking-widest underline decoration-indigo-500/30">Relational Velocity</p>
                               <p className="text-[14px] font-black text-indigo-600">{customer.engagement}%</p>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${customer.engagement}%` }}
                                 transition={{ delay: 0.5, duration: 1 }}
                                 className={`h-full rounded-full bg-gradient-to-r ${
                                    customer.engagement > 80 ? 'from-emerald-500 to-indigo-600' :
                                    customer.engagement > 40 ? 'from-indigo-400 to-indigo-600' :
                                    'from-rose-400 to-amber-500'
                                  }`} 
                               />
                            </div>
                         </div>
                         <div className="text-right pl-10">
                            <p className="text-[13px] font-black text-slate-950 uppercase tracking-widest mb-1 whitespace-nowrap">Last Pulse</p>
                            <p className="text-[14px] font-black text-slate-950">{customer.lastContact}</p>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
           <div className="p-10 bg-white rounded-[40px] overflow-hidden relative group min-h-[400px] flex flex-col justify-end shadow-xl border border-slate-100">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              <div className="absolute top-10 right-10 flex gap-1 items-end h-24">
                 {[60, 90, 40, 70, 100].map((h, i) => (
                   <div key={i} className="w-2 bg-indigo-600/20 group-hover:bg-indigo-500/50 transition-all rounded-t" style={{ height: `${h}%` }} />
                 ))}
              </div>
              <div className="relative z-10 space-y-6">
                 <div className="w-16 h-16 bg-indigo-600 rounded-[24px] flex items-center justify-center ring-4 ring-indigo-600/10 shadow-xl shadow-indigo-600/20 group-hover:rotate-6 transition-transform">
                    <FiActivity className="text-white w-8 h-8" />
                 </div>
                 <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tight leading-none mb-2">Churn Matrix</h3>
                 <p className="text-slate-950 text-base font-bold leading-relaxed max-w-[200px]">Strategic analysis shows a <span className="text-indigo-600 font-black">98.4% retention rate</span> for Q1 2024 enterprise clients.</p>
                 <button className="w-full py-4 bg-indigo-600 text-white font-black rounded-[24px] text-[14px] uppercase tracking-[0.3em] active:scale-95 transition-all shadow-xl hover:bg-indigo-700">
                    Generate Analysis
                 </button>
              </div>
           </div>

           <div className="industrial-card p-8 bg-white rounded-[40px] border border-slate-200 shadow-sm">
              <h4 className="text-base font-black text-slate-950 uppercase tracking-tight mb-6 flex items-center gap-3">
                 <FiLayers className="text-indigo-600" /> Key Accounts
              </h4>
              <div className="space-y-6">
                 {[
                   { name: 'Tata Motors', value: '₹14.2Cr', delta: '+12%' },
                   { name: 'Reliance Ind.', value: '₹8.4Cr', delta: '+5%' },
                   { name: 'Adani Group', value: '₹3.1Cr', delta: '+22%' }
                 ].map((account, i) => (
                   <div key={i} className="flex justify-between items-center group cursor-pointer">
                      <div>
                         <p className="text-base font-black text-slate-950 group-hover:text-indigo-600 transition-colors uppercase">{account.name}</p>
                         <p className="text-[13px] font-black text-slate-950 uppercase tracking-widest">{account.value} YTD</p>
                      </div>
                      <span className="text-[14px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-lg">
                        {account.delta}
                      </span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
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
              className="absolute inset-0 bg-white/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] p-10 md:p-10 border border-slate-200 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-950 uppercase leading-none">Register Identity</h2>
                  <p className="text-slate-950 font-black text-[14px] mt-1 uppercase tracking-[0.3em]">CRM Ledger Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-100 rounded-[24px] text-slate-950 transition-colors active:scale-95"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={addCustomer} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Principal Executive</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Arjun Mehta" 
                      className="w-full bg-slate-50 border-none rounded-[24px] py-4.5 px-6 text-xl font-black outline-none focus:ring-2 focus:ring-indigo-500/10 text-slate-950"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Corporate Entity</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Blue Star Systems Ltd" 
                      className="w-full bg-slate-50 border-none rounded-[24px] py-4.5 px-6 text-xl font-black outline-none focus:ring-2 focus:ring-indigo-500/10 text-slate-950"
                      value={newCustomer.company}
                      onChange={(e) => setNewCustomer({...newCustomer, company: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Official Comms Matrix (Email)</label>
                  <input 
                    required
                    type="email" 
                    placeholder="executive@entity.com" 
                    className="w-full bg-slate-50 border-none rounded-[24px] py-4.5 px-6 text-xl font-black outline-none focus:ring-2 focus:ring-indigo-500/10 text-slate-950"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Direct Secure Line</label>
                    <input 
                      required
                      type="text" 
                      placeholder="+91 XXXXX-XXXXX" 
                      className="w-full bg-slate-50 border-none rounded-[24px] py-4.5 px-6 text-xl font-black outline-none focus:ring-2 focus:ring-indigo-500/10 text-slate-950"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Statutory GSTIN Signature</label>
                    <input 
                      type="text" 
                      placeholder="Fiscal ID (Optional)" 
                      className="w-full bg-slate-50 border-none rounded-[24px] py-4.5 px-6 text-xl font-black outline-none focus:ring-2 focus:ring-indigo-500/10 text-slate-950"
                      value={newCustomer.gstin}
                      onChange={(e) => setNewCustomer({...newCustomer, gstin: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-[32px] font-black text-[13px] uppercase tracking-[0.4em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95">
                  Commit Identity to CRM Matrix
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
