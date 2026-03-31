'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiSearch, FiFileText, FiDownload, FiDollarSign, FiClock, FiCheckCircle, FiAlertCircle, FiShield, FiPercent, FiLayers, FiUpload } from 'react-icons/fi';
import CustomTooltip from '@/components/CustomTooltip';

const initialInvoices = [
  { id: 'INV-10294', clientName: 'Innovate Solutions MH', amount: 500000, dueDate: '2024-04-15', status: 'Paid', gst: '27AAAAA0000A1Z5' },
  { id: 'INV-10295', clientName: 'Tech Giants KA', amount: 1250000, dueDate: '2024-04-20', status: 'Pending', gst: '29BBBBB0000B1Z6' },
  { id: 'INV-10296', clientName: 'Creative Designs TN', amount: 75000, dueDate: '2024-03-30', status: 'Overdue', gst: '33CCCCC0000C1Z7' },
  { id: 'INV-10297', clientName: 'Data Weavers DL', amount: 900000, dueDate: '2024-04-25', status: 'Pending', gst: '07DDDDD0000D1Z8' },
  { id: 'INV-10298', clientName: 'Health First GJ', amount: 350000, dueDate: '2024-04-10', status: 'Paid', gst: '24EEEEE0000E1Z9' },
];

const BillingPage = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInv, setNewInv] = useState({ clientName: '', amount: 0, dueDate: '', gst: '' });

  const stats = useMemo(() => {
    const total = invoices.reduce((acc, inv) => acc + Number(inv.amount), 0);
    const paid = invoices.filter(inv => inv.status === 'Paid').reduce((acc, inv) => acc + Number(inv.amount), 0);
    const pending = invoices.filter(inv => inv.status === 'Pending').reduce((acc, inv) => acc + Number(inv.amount), 0);
    return { total, paid, pending };
  }, [invoices]);

  const filteredInvoices = invoices.filter(inv => {
    const matchesFilter = filter === 'All' || inv.status === filter;
    const matchesSearch = inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const addInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setInvoices([{ 
      ...newInv, 
      id: `INV-${Math.floor(Math.random() * 90000 + 10000)}`,
      status: 'Pending' 
    }, ...invoices]);
    setIsModalOpen(false);
    setNewInv({ clientName: '', amount: 0, dueDate: '', gst: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Pending': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Overdue': return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0 transition-all duration-500">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <FiShield className="animate-pulse" /> Fiscal Integrity Protocol Active
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 text-slate-900 uppercase leading-none">Accounts Receivable</h1>
          <p className="text-slate-500 text-slate-500 font-medium tracking-tight mt-1 flex items-center gap-2">
            <FiFileText className="text-blue-500" /> Automated Invoice Orchestration & GST Compliance Master
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
             <FiUpload /> Ledger Sync
           </button>
           <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
             <FiDownload /> Fiscal Export
           </button>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-10 py-3.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
           >
             <FiPlus /> Dispatch Invoice
           </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Invoiced', value: `₹${(stats.total/100000).toFixed(1)}L`, icon: <FiLayers className="w-8 h-8" />, color: 'text-blue-600', bg: 'bg-blue-500/10' },
          { label: 'Settled Funds', value: `₹${(stats.paid/100000).toFixed(1)}L`, icon: <FiCheckCircle className="w-8 h-8" />, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
          { label: 'Pending Liquidity', value: `₹${(stats.pending/100000).toFixed(1)}L`, icon: <FiClock className="w-8 h-8" />, color: 'text-amber-600', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-10 bg-white  rounded-[48px] border border-slate-200 border-slate-200 shadow-sm flex items-center gap-10 group hover:border-blue-500/50 transition-all duration-500"
          >
            <div className={`p-8 rounded-[32px] ${stat.bg} ${stat.color} shadow-inner group-hover:scale-110 transition-transform duration-700 ring-1 ring-black/5`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] leading-none mb-3">{stat.label}</p>
              <h4 className="text-4xl font-black tracking-tighter text-slate-900 text-slate-900 leading-none">{stat.value}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Invoice Ledger */}
      <div className="bg-white  rounded-[48px] border border-slate-200 border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-10 border-b border-slate-100 border-slate-200 flex flex-col xl:flex-row justify-between items-center gap-8 bg-slate-50/20 /10">
          <div className="relative w-full xl:max-w-xl group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search invoice registry, client descriptor, or GST identifier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white  border-none rounded-2xl py-4.5 pl-14 pr-6 text-sm font-black focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-slate-900 shadow-inner"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Paid', 'Pending', 'Overdue'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilter(s)}
                className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'bg-white  text-slate-500 text-slate-500 border border-black/5 hover:bg-slate-100 active:scale-95 shadow-sm'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30 /30">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Asset Descriptor</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Quantum (INR)</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Maturity Target</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">Lifecycle State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 divide-slate-100">
              <AnimatePresence mode="popLayout">
                {filteredInvoices.map((inv, i) => (
                  <motion.tr 
                    layout
                    key={inv.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group cursor-pointer"
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100  flex items-center justify-center text-slate-500 group-hover:text-blue-500 transition-colors shadow-inner border border-black/5">
                          <FiFileText size={24} />
                        </div>
                        <div>
                          <p className="text-xl font-black text-slate-900 text-slate-900 tracking-tighter uppercase leading-none mb-2 group-hover:text-blue-600 transition-colors">{inv.clientName}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 uppercase font-black tracking-[0.3em] flex items-center gap-2">
                             <span className="text-blue-500">ID:</span> {inv.id} • <span className="text-blue-500 text-[8px]">GST:</span> {inv.gst}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-2xl font-black text-slate-900 text-slate-900 tracking-tighter whitespace-nowrap">₹{inv.amount.toLocaleString('en-IN')}</p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Settlement Value</p>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-sm font-black text-slate-600 text-slate-600 tracking-tight uppercase">{inv.dueDate}</p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Fiscal Deadline</p>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${getStatusColor(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-white/60 /80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white  rounded-[56px] p-10 md:p-14 border border-slate-200 border-slate-200 shadow-2xl"
            >
               <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 text-slate-900 uppercase leading-none">Dispatch Legal Instrument</h2>
                  <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em]">Corporate Billing Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors active:scale-95"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={addInvoice} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Client/Entity Portfolio</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Tata Advanced Systems Ltd"
                    className="w-full bg-slate-50  border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-900"
                    value={newInv.clientName}
                    onChange={(e) => setNewInv({...newInv, clientName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Settlement Quantum (INR)</label>
                     <input 
                       required
                       type="number" 
                       placeholder="0.00"
                       className="w-full bg-slate-50  border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-900"
                       value={newInv.amount}
                       onChange={(e) => setNewInv({...newInv, amount: Number(e.target.value)})}
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Maturity Target Date</label>
                     <input 
                       required
                       type="date" 
                       className="w-full bg-slate-50  border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-900"
                       value={newInv.dueDate}
                       onChange={(e) => setNewInv({...newInv, dueDate: e.target.value})}
                     />
                  </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Corporate GSTIN Identifier</label>
                   <input 
                     required
                     type="text" 
                     placeholder="e.g. 27AAAAA0000A1Z5"
                     className="w-full bg-slate-50  border-none rounded-2xl py-4.5 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-900 uppercase"
                     value={newInv.gst}
                     onChange={(e) => setNewInv({...newInv, gst: e.target.value})}
                   />
                </div>
                <button type="submit" className="w-full mt-6 py-5 bg-blue-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95">
                  Commit Invoice to Ledger
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BillingPage;


