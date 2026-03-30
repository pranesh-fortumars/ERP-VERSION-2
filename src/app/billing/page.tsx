
'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiSearch, FiFileText, FiDownload, FiDollarSign, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
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
      case 'Paid': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Overdue': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800';
    }
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Accounts Receivable</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Invoice orchestration, GST compliance, and recurring billing settlement.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black hover:shadow-lg transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200 uppercase tracking-widest">
            <FiDownload /> Tax Ledger
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2 uppercase tracking-widest"
          >
            <FiPlus /> Dispatch Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Invoiced', value: `₹${(stats.total/100000).toFixed(1)}L`, icon: FiFileText, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
          { label: 'Settled Funds', value: `₹${(stats.paid/100000).toFixed(1)}L`, icon: FiCheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Pending Liquidity', value: `₹${(stats.pending/100000).toFixed(1)}L`, icon: FiClock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        ].map((stat, i) => (
          <div key={i} className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all">
            <div className={`p-5 rounded-[24px] ${stat.bg} ${stat.color} group-hover:rotate-12 transition-transform`}>
              <stat.icon size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <h4 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
          <div className="relative w-full md:w-96 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search invoice registry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Paid', 'Pending', 'Overdue'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilter(s)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Descriptor</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantum (INR)</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Maturation</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Lifecycle State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {filteredInvoices.map((inv, i) => (
                  <motion.tr 
                    layout
                    key={inv.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-indigo-500 transition-colors">
                          <FiFileText />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{inv.clientName}</p>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">ID: {inv.id} • GST: {inv.gst}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-black dark:text-white">₹{inv.amount.toLocaleString('en-IN')}</td>
                    <td className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase tracking-widest">{inv.dueDate}</td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(inv.status)}`}>
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[40px] p-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
               <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Dispatch Invoice</h2>
                  <p className="text-slate-500 font-medium text-xs mt-1 uppercase tracking-widest font-black">Billing Registry</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={addInvoice} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Entity Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                    value={newInv.clientName}
                    onChange={(e) => setNewInv({...newInv, clientName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Quantum (INR)</label>
                     <input 
                       required
                       type="number" 
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                       value={newInv.amount}
                       onChange={(e) => setNewInv({...newInv, amount: Number(e.target.value)})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Maturity Date</label>
                     <input 
                       required
                       type="date" 
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                       value={newInv.dueDate}
                       onChange={(e) => setNewInv({...newInv, dueDate: e.target.value})}
                     />
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Entity GSTIN</label>
                   <input 
                     required
                     type="text" 
                     placeholder="e.g. 27AAAAA0000A1Z5"
                     className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500/10 dark:text-white"
                     value={newInv.gst}
                     onChange={(e) => setNewInv({...newInv, gst: e.target.value})}
                   />
                </div>
                <button type="submit" className="w-full mt-4 py-5 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:scale-[1.02]">
                  Dispatch Legal Instrument
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

