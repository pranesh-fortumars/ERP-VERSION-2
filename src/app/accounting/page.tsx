'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiDollarSign, FiCreditCard, FiTrendingUp, FiArrowUpRight, FiArrowDownRight,
  FiPlus, FiX, FiSearch, FiFilter, FiActivity, FiGlobe, FiLayers, FiBriefcase
} from 'react-icons/fi';

const AccountingPage = () => {
  const [transactions, setTransactions] = useState([
    { id: 'TXN-901', description: 'Vendor Payment: Node Steel Corp', amount: '₹1,24,000', type: 'Debit', status: 'Cleared', date: '2024-03-31' },
    { id: 'TXN-842', description: 'Inward Credit: Reliance Logistics Node', amount: '₹4,50,000', type: 'Credit', status: 'Cleared', date: '2024-03-30' },
    { id: 'TXN-715', description: 'Utility Node Cluster 7A Subscription', amount: '₹12,400', type: 'Debit', status: 'Pending', date: '2024-03-29' },
    { id: 'TXN-650', description: 'Corporate Tax Settlement Q1', amount: '₹15,00,000', type: 'Debit', status: 'Reviewing', date: '2024-03-28' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTxn, setNewTxn] = useState({ description: '', amount: '', type: 'Debit', status: 'Pending' });

  const summary = [
    { label: 'Cluster Balance', value: '₹45.2 Lakh', delta: '+12%', isUp: true, icon: <FiDollarSign /> },
    { label: 'Outward Flux', value: '₹8.4 Lakh', delta: '-5%', isUp: false, icon: <FiTrendingUp /> },
    { label: 'Treasury Reserves', value: '₹1.2 Cr', delta: '+2%', isUp: true, icon: <FiLayers /> },
    { label: 'System P&L', value: '₹4.2 Lakh', delta: '+8%', isUp: true, icon: <FiActivity /> }
  ];

  const filteredTxns = useMemo(() => {
    return transactions.filter(t => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [transactions, searchTerm]);

  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TXN-${Math.floor(Math.random() * 900 + 100)}`;
    setTransactions([{ id, ...newTxn, date: new Date().toISOString().split('T')[0] }, ...transactions]);
    setIsModalOpen(false);
    setNewTxn({ description: '', amount: '', type: 'Debit', status: 'Pending' });
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
            <FiGlobe className="animate-spin-slow" /> Financial Governance Matrix Active
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">Treasury Hub</h1>
          <p className="text-slate-500 font-bold text-sm mt-2 flex items-center gap-2">
            <FiCreditCard className="text-blue-500" /> Real-time Capital Flux & Operational Accounting
          </p>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
           >
             <FiPlus /> Record Flux
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summary.map((stat, i) => (
          <div key={i} className="industrial-card p-10 flex flex-col justify-between bg-white border border-slate-100 shadow-sm rounded-[40px] hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
             <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20 group-hover:rotate-12 transition-transform text-2xl">
                   {stat.icon}
                </div>
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 ${stat.isUp ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                   {stat.isUp ? <FiArrowUpRight /> : <FiArrowDownRight />} {stat.delta}
                </span>
             </div>
             <div className="relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</h3>
             </div>
          </div>
        ))}
      </div>

      <div className="industrial-card flex flex-col bg-white border border-slate-100 shadow-sm rounded-[48px] overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-slate-50/20">
          <div>
             <h3 className="text-lg font-black tracking-widest text-slate-900 uppercase italic">Transaction Ledger</h3>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Multi-Node Capital Correlation</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <div className="relative group flex-1 md:w-80">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="ID / Nomenclature Query..." 
                  className="w-full bg-slate-100/50 border-none rounded-2xl py-4 pl-16 pr-6 text-xs font-black outline-none focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:text-blue-600 transition-all shadow-sm active:scale-95"><FiFilter size={20} /></button>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/40 text-[9px] font-black uppercase tracking-widest text-slate-400">
                <th className="py-5 px-10">Flux Reference</th>
                <th className="py-5 px-6">Description Artifact</th>
                <th className="py-5 px-6">Quantum</th>
                <th className="py-5 px-6">Status Vector</th>
                <th className="py-5 px-10 text-right">Commit Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTxns.map((t) => (
                <tr key={t.id} className="group hover:bg-blue-50/30 transition-all cursor-pointer">
                  <td className="py-6 px-10">
                     <span className="text-xs font-black text-blue-600 uppercase tracking-tighter">{t.id}</span>
                  </td>
                  <td className="py-6 px-6">
                     <p className="text-xs font-black text-slate-900 uppercase group-hover:text-blue-600 transition-colors">{t.description}</p>
                     <p className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">Corporate Node X-1</p>
                  </td>
                  <td className="py-6 px-6">
                     <span className={`text-xs font-black italic ${t.type === 'Credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {t.type === 'Credit' ? '+' : '-'}{t.amount}
                     </span>
                  </td>
                  <td className="py-6 px-6">
                     <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border ${
                       t.status === 'Cleared' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                       t.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                     }`}>
                        {t.status}
                     </span>
                  </td>
                  <td className="py-6 px-10 text-right">
                     <span className="text-[10px] font-black text-slate-400 uppercase">{t.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Initialize Modal */}
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
              className="relative w-full max-w-xl bg-white rounded-[56px] p-10 md:p-14 border border-blue-500/10 shadow-3xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Record Flux</h2>
                  <p className="text-slate-500 font-black text-[10px] mt-2 uppercase tracking-[0.3em]">Treasury Ledger Artifact</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors active:scale-95"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={addTransaction} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Flux Description</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Inward Capital Injection: Node Cluster B" 
                    className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm outline-none focus:ring-4 focus:ring-blue-600/5 font-black text-slate-900"
                    value={newTxn.description}
                    onChange={(e) => setNewTxn({...newTxn, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Flux Quantum (Amount)</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. ₹5,00,000" 
                      className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm outline-none focus:ring-4 focus:ring-blue-600/5 font-black text-slate-900"
                      value={newTxn.amount}
                      onChange={(e) => setNewTxn({...newTxn, amount: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Flux Vector (Type)</label>
                    <select 
                      className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm outline-none focus:ring-4 focus:ring-blue-600/5 font-black text-slate-900 appearance-none"
                      value={newTxn.type}
                      onChange={(e) => setNewTxn({...newTxn, type: e.target.value})}
                    >
                      <option>Debit</option>
                      <option>Credit</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-6 bg-blue-600 text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-90">
                   Commit Flux to Matrix
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountingPage;
