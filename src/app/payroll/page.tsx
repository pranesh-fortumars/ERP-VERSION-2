'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSettings, FiUsers, FiCreditCard, FiZap, FiPlus, FiX, 
  FiSearch, FiFilter, FiActivity, FiGlobe, FiDatabase, FiClock, FiDownload, FiUpload
} from 'react-icons/fi';

const PayrollPage = () => {
  const [employees, setEmployees] = useState([
    { id: 'EMP-001', name: 'Arjun Sharma', role: 'Global Ops Manager', salary: '₹2,50,000', status: 'Processed', lastPaid: '2024-03-31' },
    { id: 'EMP-012', name: 'Priya Sharma', role: 'Lead Data Architect', salary: '₹1,85,000', status: 'Processed', lastPaid: '2024-03-31' },
    { id: 'EMP-024', name: 'Rahul Kumar', role: 'Plant Supervisor', salary: '₹95,000', status: 'Pending', lastPaid: '2024-02-28' },
    { id: 'EMP-033', name: 'Anjali Singh', role: 'BPA Orchestrator', salary: '₹1,45,000', status: 'Processed', lastPaid: '2024-03-31' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', salary: '', status: 'Pending' });

  const metrics = [
    { label: 'Network Headcount', value: '850', delta: '+2.4%', icon: <FiUsers /> },
    { label: 'Outward Flux (Payroll)', value: '₹4.2 Cr', delta: '+1.5%', icon: <FiCreditCard /> },
    { label: 'Allocation Velocity', value: '98.4%', delta: '+0.2%', icon: <FiZap /> },
    { label: 'Cycle Duration', value: '2.4d', delta: '-0.3d', icon: <FiClock /> }
  ];

  const filteredEmployees = useMemo(() => {
    return employees.filter(e => 
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      e.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  const addEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `EMP-${Math.floor(Math.random() * 900 + 100)}`;
    setEmployees([{ id, ...newEmployee, lastPaid: 'Never' }, ...employees]);
    setIsModalOpen(false);
    setNewEmployee({ name: '', role: '', salary: '', status: 'Pending' });
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[14px] font-serif-professional tracking-wide  tracking-widest mb-4 border border-indigo-100">
            <FiGlobe className="animate-spin-slow" /> Workforce Governance Infrastructure Active
          </div>
          <h1 className="text-3xl font-black text-slate-950 uppercase tracking-tight leading-none">Payroll Matrix</h1>
          <p className="text-slate-950 font-bold text-xl mt-2 flex items-center gap-2">
            <FiSettings className="text-indigo-500" /> Automated Human Capital Resource Allocation
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-[24px] text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
             <FiUpload /> Ledger Sync
           </button>
           <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-[24px] text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
             <FiDownload /> Audit Export
           </button>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-10 py-3.5 bg-indigo-600 text-white rounded-[24px] text-[14px] font-serif-professional tracking-wide  tracking-[0.3em] shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2"
           >
             <FiPlus /> Register Contributor
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="industrial-card animate-fade-up p-8 flex flex-col justify-between bg-white border border-slate-100 shadow-sm rounded-[32px] hover:shadow-2xl transition-all relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
             <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20 group-hover:rotate-12 transition-transform text-xl">
                   {m.icon}
                </div>
                <span className="text-[14px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">{m.delta}</span>
             </div>
             <div className="relative z-10">
                <p className="text-[14px] font-black text-slate-950 uppercase tracking-widest mb-1">{m.label}</p>
                <h3 className="text-3xl font-black text-slate-950 tracking-tight">{m.value}</h3>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 industrial-card animate-fade-up flex flex-col bg-white border border-slate-100 shadow-sm rounded-[40px] overflow-hidden">
           <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-slate-50/20">
              <div>
                 <h3 className="text-md font-black tracking-widest text-slate-950 uppercase">Contributor Ledger</h3>
                 <p className="text-[13px] font-bold text-slate-950 uppercase tracking-widest mt-1">Multi-Node Personnel Infrastructure</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                 <div className="relative group flex-1 md:w-64">
                    <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-950 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="ID / Name Query..." 
                      className="w-full bg-slate-100/50 border-none rounded-[24px] py-3.5 pl-14 pr-6 text-base font-black outline-none focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all text-slate-950"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
                 <button className="p-3.5 bg-white border border-slate-100 rounded-[24px] text-slate-950 hover:text-indigo-600 transition-all shadow-sm"><FiFilter size={18} /></button>
              </div>
           </div>
           
           <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/20 text-[13px] font-serif-professional tracking-wide  tracking-widest text-slate-950">
                       <th className="py-3 px-10">Contributor Reference</th>
                       <th className="py-3 px-6">Role / Cluster</th>
                       <th className="py-3 px-6">Allocation Cycle</th>
                       <th className="py-3 px-6">Status</th>
                       <th className="py-3 px-10 text-right">Last Cycle</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {filteredEmployees.map(e => (
                       <tr key={e.id} className="group hover:bg-indigo-50/30 transition-all">
                          <td className="py-4 px-10">
                             <div className="flex items-center gap-4">
                               <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-[14px] font-black">
                                  {e.name.charAt(0)}
                               </div>
                               <div>
                                  <p className="text-base font-black text-slate-950 uppercase">{e.name}</p>
                                  <p className="text-[14px] font-bold text-indigo-600 uppercase tracking-widest">{e.id}</p>
                               </div>
                             </div>
                          </td>
                          <td className="py-4 px-6">
                             <p className="text-[14px] font-black text-slate-950 uppercase leading-none mb-1">{e.role}</p>
                             <p className="text-[14px] font-bold text-slate-950 uppercase tracking-widest ">Node Cluster Alpha</p>
                          </td>
                          <td className="py-4 px-6">
                             <p className="text-base font-black text-slate-950 tracking-tight whitespace-nowrap">{e.salary} / Cycle</p>
                          </td>
                          <td className="py-4 px-6">
                             <span className={`px-4 py-1.5 rounded-xl text-[12px] font-serif-professional tracking-wide  tracking-widest border ${
                               e.status === 'Processed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                             }`}>
                                {e.status}
                             </span>
                          </td>
                          <td className="py-4 px-10 text-right text-[14px] font-black text-slate-950">
                             {e.lastPaid}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="industrial-card animate-fade-up p-10 bg-indigo-600 text-white flex flex-col justify-between relative overflow-hidden group min-h-[400px] rounded-[40px] shadow-3xl">
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
           <div className="relative z-10">
              <div className="w-14 h-14 bg-white rounded-[24px] flex items-center justify-center mb-8 shadow-lg group-hover:rotate-12 transition-transform">
                 <FiActivity className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-4">Capital Allocation Protocol</h3>
              <p className="text-indigo-50 text-base font-bold leading-relaxed">Automated cycle optimization has reduced outward flux latency by <span className="text-white font-black">1.2d</span> for all Indian nodes.</p>
           </div>
           <button className="relative z-10 w-full py-3 bg-white text-indigo-600 rounded-[32px] font-black text-[14px] uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">Deploy Batch Process</button>
        </div>
      </div>

      {/* Register Modal */}
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
              className="relative w-full max-w-xl bg-white rounded-[40px] p-10 md:p-10 border border-indigo-500/10 shadow-3xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-950 uppercase">Register Contributor</h2>
                  <p className="text-slate-950 font-black text-[14px] mt-2 uppercase tracking-[0.3em]">Workforce Ledger Infrastructure</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-50 rounded-[24px] text-slate-950 transition-colors active:scale-95"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={addEmployee} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Member Nomenclature (Name)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Arjun Sharma" 
                    className="w-full bg-slate-50 border-none rounded-[24px] py-3 px-8 text-xl outline-none focus:ring-4 focus:ring-indigo-600/5 font-black text-slate-950"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Functional Vector (Role)</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Node Operator" 
                      className="w-full bg-slate-50 border-none rounded-[24px] py-3 px-8 text-xl outline-none focus:ring-4 focus:ring-indigo-600/5 font-black text-slate-950"
                      value={newEmployee.role}
                      onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Cycle Quantum (Salary)</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. ₹1,20,000" 
                      className="w-full bg-slate-50 border-none rounded-[24px] py-3 px-8 text-xl outline-none focus:ring-4 focus:ring-indigo-600/5 font-black text-slate-950"
                      value={newEmployee.salary}
                      onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-[24px] font-black text-[13px] uppercase tracking-[0.4em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-90 flex items-center justify-center gap-3">
                   Commit Contributor to Ledger
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PayrollPage;
