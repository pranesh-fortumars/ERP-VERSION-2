'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiArchive, FiUsers, FiBriefcase, 
  FiTool, FiFileText, FiBarChart2, FiDollarSign, 
  FiCreditCard, FiTrendingUp, FiSettings, FiActivity,
  FiX, FiMenu, FiServer, FiChevronDown, FiGlobe
} from 'react-icons/fi';

const navItems = [
  { href: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
  { href: '/manufacturing', icon: <FiActivity />, label: 'Manufacturing' },
  { href: '/inventory', icon: <FiArchive />, label: 'Inventory' },
  { href: '/customers', icon: <FiUsers />, label: 'Customers' },
  { href: '/workflow', icon: <FiBriefcase />, label: 'Workflow' },
  { href: '/tasks', icon: <FiTool />, label: 'Tasks' },
  { href: '/billing', icon: <FiCreditCard />, label: 'Billing' },
  { href: '/product-management', icon: <FiBarChart2 />, label: 'Products' },
  { href: '/report-generation', icon: <FiFileText />, label: 'Reports' },
  { href: '/accounting', icon: <FiDollarSign />, label: 'Accounting' },
  { href: '/sales', icon: <FiTrendingUp />, label: 'Sales' },
  { href: '/payroll', icon: <FiSettings />, label: 'Payroll' },
];

const instances = [
  { id: 'INST-01', name: 'Pune Manufacturing Hub', location: 'Maharashtra' },
  { id: 'INST-02', name: 'Chennai Logistics Node', location: 'Tamil Nadu' },
  { id: 'INST-03', name: 'Global R&D Center', location: 'Bangalore' },
];

const Sidebar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeInstance, setActiveInstance] = useState(instances[0]);
  const [isInstanceSelectorOpen, setIsInstanceSelectorOpen] = useState(false);
  const pathname = usePathname();

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-72 sidebar-standard p-6 hidden lg:flex flex-col h-screen fixed left-0 top-0 z-50 border-r border-blue-500/10 shadow-2xl bg-white">
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-8 px-2 mt-4 group">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-[12px] flex items-center justify-center text-white shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform duration-500 ring-4 ring-blue-50">
               <FiServer size={20} />
             </div>
             <div>
               <h1 className="text-lg font-black tracking-tighter text-slate-900 uppercase italic leading-none">PRO <span className="text-blue-600">ERP</span></h1>
               <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] leading-none mt-1">Industrial Command</p>
             </div>
          </div>
        </div>

        {/* Multi-Instance Selector (Tenant Switcher) */}
        <div className="mb-8 relative">
           <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-3 mb-3">Enterprise Node</p>
           <button 
             onClick={() => setIsInstanceSelectorOpen(!isInstanceSelectorOpen)}
             className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 ${isInstanceSelectorOpen ? 'bg-blue-50 border-blue-200' : 'bg-slate-50/50 border-slate-100 hover:border-blue-500/20'}`}
           >
              <div className="flex items-center gap-3 overflow-hidden text-left">
                 <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-black shrink-0 shadow-lg">
                    {activeInstance.id.split('-')[1]}
                 </div>
                 <div className="overflow-hidden">
                    <p className="text-[10px] font-black text-slate-900 uppercase truncate leading-none mb-1">{activeInstance.name}</p>
                    <p className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.1em]">{activeInstance.location}</p>
                 </div>
              </div>
              <FiChevronDown className={`text-slate-600 transition-transform duration-300 ${isInstanceSelectorOpen ? 'rotate-180 text-blue-600' : ''}`} />
           </button>

           <AnimatePresence>
             {isInstanceSelectorOpen && (
               <motion.div
                 initial={{ opacity: 0, y: -10, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: -10, scale: 0.95 }}
                 className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden"
               >
                 {instances.map((instance) => (
                   <button
                     key={instance.id}
                     onClick={() => {
                       setActiveInstance(instance);
                       setIsInstanceSelectorOpen(false);
                     }}
                     className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group hover:bg-blue-50 ${activeInstance.id === instance.id ? 'bg-blue-50' : ''}`}
                   >
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-colors ${activeInstance.id === instance.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                        {instance.id.split('-')[1]}
                     </div>
                     <div className="overflow-hidden">
                        <p className={`text-[10px] font-black uppercase leading-none mb-1 ${activeInstance.id === instance.id ? 'text-blue-600' : 'text-slate-600 group-hover:text-blue-600'}`}>{instance.name}</p>
                        <p className="text-[8px] font-bold text-slate-600 uppercase">{instance.location}</p>
                     </div>
                   </button>
                 ))}
                 <div className="mt-1 p-2 border-t border-slate-50">
                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                       <FiGlobe className="w-3 h-3" /> Connect New Node
                    </button>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
        
        <nav className="flex-1 overflow-y-auto no-scrollbar pr-1">
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 group relative ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50/50' 
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50/50'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="nav-pill"
                        className="absolute left-0 top-2 bottom-2 w-1.5 bg-blue-600 rounded-r-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                      />
                    )}
                    <span className={`text-xl transition-all duration-500 ${isActive ? 'text-blue-600 scale-110 drop-shadow-[0_0_8px_rgba(37,99,235,0.2)]' : 'text-slate-600 group-hover:text-blue-600 group-hover:scale-110'}`}>
                      {item.icon}
                    </span>
                    <span className={`text-[11px] font-black uppercase tracking-[0.15em] shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-700 font-bold'}`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-4 px-4 py-4 bg-slate-50/50 rounded-[22px] border border-transparent hover:border-blue-500/20 hover:bg-white transition-all cursor-pointer group shadow-sm">
            <div className="w-11 h-11 rounded-[14px] bg-blue-600 flex items-center justify-center font-black text-white shadow-xl shadow-blue-600/20 group-hover:rotate-12 transition-all">
              AS
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-black truncate text-slate-900 uppercase italic leading-tight">Arjun S.</p>
              <p className="text-[8px] text-blue-600 font-black uppercase tracking-widest leading-none mt-1 opacity-60">Global Ops Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header & Bottom Tab Bar */}
      <div className="lg:hidden">
        {/* Mobile Top Bar */}
        <div className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-[60] flex items-center justify-between px-6">
           <div className="flex items-center gap-3">
             <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <FiServer size={18} />
             </div>
             <h1 className="text-lg font-black tracking-tighter text-slate-900 uppercase italic">PRO <span className="text-blue-600">ERP</span></h1>
           </div>
           {/* Multi-Industry Quick Switcher (Mobile) */}
           <button 
             onClick={() => setIsInstanceSelectorOpen(!isInstanceSelectorOpen)}
             className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-600 active:scale-90 transition-all font-black text-[10px]"
           >
              {activeInstance.id.split('-')[1]}
           </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isNavOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsNavOpen(false)}
                className="fixed inset-0 bg-white/40 backdrop-blur-xl z-[80]"
              />
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={sidebarVariants}
                transition={{ type: 'spring', damping: 40, stiffness: 400 }}
                className="fixed top-0 left-0 h-full w-[320px] bg-white p-8 z-[90] shadow-2xl border-r border-black/5 flex flex-col"
              >
                 {/* Instance Switcher in Mobile Drawer */}
                 <div className="mb-10 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-600/30 mx-auto mb-4 font-black text-xl">
                       {activeInstance.id.split('-')[1]}
                    </div>
                    <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">{activeInstance.name}</h2>
                    <p className="text-[9px] text-slate-600 font-bold uppercase mt-1">Cluster {activeInstance.id}</p>
                 </div>

                 <nav className="overflow-y-auto flex-1 no-scrollbar pr-2 mb-8">
                  <ul className="space-y-1.5">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.href}>
                          <Link 
                            href={item.href}
                            onClick={() => setIsNavOpen(false)}
                            className={`flex items-center gap-5 px-6 py-4 rounded-2xl transition-all ${
                              isActive 
                                ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' 
                                : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                            }`}
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-xs font-black uppercase tracking-[0.2em]">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                
                <div className="mt-6 p-4 bg-slate-50 rounded-[24px] border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">AS</div>
                    <div>
                       <p className="text-xs font-black text-slate-900 uppercase">Arjun S.</p>
                       <p className="text-[9px] text-blue-600 font-bold uppercase">Node Operator</p>
                    </div>
                    <button className="ml-auto w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600">
                       <FiSettings size={14} />
                    </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating Toggle (Mobile) */}
        {!isNavOpen && (
          <motion.button 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setIsNavOpen(true)}
            className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 text-white rounded-3xl shadow-3xl shadow-blue-600/40 z-[70] flex items-center justify-center active:scale-90 transition-all border border-blue-400/20"
          >
            <FiMenu size={32} />
          </motion.button>
        )}
      </div>

      {/* Instance Switcher Modal for Mobile */}
      <AnimatePresence>
         {isInstanceSelectorOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 lg:hidden">
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 onClick={() => setIsInstanceSelectorOpen(false)}
                 className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="relative w-full max-w-sm bg-white rounded-[40px] p-8 shadow-3xl overflow-hidden"
               >
                  <div className="flex justify-between items-start mb-8">
                     <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Select Instance</h3>
                        <p className="text-[9px] font-black text-slate-600 mt-2 uppercase tracking-[0.2em]">Global EPR Deployment Switcher</p>
                     </div>
                     <button onClick={() => setIsInstanceSelectorOpen(false)} className="p-3 bg-slate-50 rounded-2xl"><FiX /></button>
                  </div>
                  <div className="space-y-4">
                     {instances.map(instance => (
                        <button 
                          key={instance.id}
                          onClick={() => { setActiveInstance(instance); setIsInstanceSelectorOpen(false); }}
                          className={`w-full p-6 rounded-3xl border transition-all flex items-center gap-4 ${activeInstance.id === instance.id ? 'bg-blue-50 border-blue-600/30' : 'bg-white border-slate-100 hover:border-blue-500/20'}`}
                        >
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${activeInstance.id === instance.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'bg-slate-100 text-slate-600'}`}>
                              {instance.id.split('-')[1]}
                           </div>
                           <div className="text-left overflow-hidden">
                              <p className="font-black text-slate-900 uppercase text-sm leading-none mb-1 truncate">{instance.name}</p>
                              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{instance.location}</p>
                           </div>
                        </button>
                     ))}
                  </div>
                  <button className="w-full mt-8 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] active:scale-95 transition-all">New Deployment</button>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
