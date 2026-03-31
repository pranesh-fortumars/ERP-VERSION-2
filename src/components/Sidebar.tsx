'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiArchive, FiUsers, FiBriefcase, 
  FiTool, FiFileText, FiBarChart2, FiDollarSign, 
  FiCreditCard, FiTrendingUp, FiSettings, FiActivity,
  FiX, FiMenu, FiServer
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

const Sidebar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64 sidebar-standard p-6 hidden md:flex flex-col h-screen fixed left-0 top-0 z-50 border-r border-slate-200/50 shadow-2xl shadow-blue-900/5">
        <div className="flex items-center gap-4 mb-14 px-2 mt-4 group cursor-pointer">
          <div className="w-11 h-11 bg-blue-600 rounded-[14px] flex items-center justify-center text-white shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform duration-500 ring-4 ring-blue-50">
            <FiServer size={22} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase italic">
              PRO <span className="text-blue-600">ERP</span>
            </h1>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none mt-1">Enterprise Hub</p>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto no-scrollbar pr-1">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-[18px] transition-all duration-300 group ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' 
                        : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <span className={`text-xl transition-all duration-500 ${isActive ? 'text-white scale-110' : 'text-slate-400 group-hover:text-blue-600'}`}>
                      {item.icon}
                    </span>
                    <span className={`text-[11px] font-black uppercase tracking-[0.15em] ${isActive ? 'translate-x-1' : ''}`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100">
          <div className="flex items-center gap-4 px-4 py-5 bg-white/40 rounded-[24px] border border-black/[0.03] hover:border-blue-500/10 transition-all cursor-pointer group shadow-sm">
            <div className="w-12 h-12 rounded-[18px] bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center font-black text-white shadow-lg group-hover:rotate-12 transition-all ring-2 ring-white">
              AS
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-black truncate text-slate-900 uppercase italic leading-tight">Arjun S.</p>
              <p className="text-[9px] text-blue-600 font-black uppercase tracking-widest leading-none mt-1 opacity-70">Fleet Ops</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-6 right-6 z-[100]">
        <button 
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-2xl hover:bg-blue-700 active:scale-90 transition-all border border-blue-400/20 flex items-center justify-center"
        >
          {isNavOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence mode="wait">
        {isNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNavOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl z-[80] md:hidden"
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ type: 'spring', damping: 40, stiffness: 400 }}
              className="fixed top-0 left-0 h-full w-[300px] sidebar-standard p-8 z-[90] md:hidden shadow-2xl border-r border-black/5 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-16 pt-10">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl">
                  <FiServer size={28} />
                </div>
                <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic">PRO <span className="text-blue-600">ERP</span></h1>
              </div>
              <nav className="overflow-y-auto flex-1 no-scrollbar pr-2 mb-8">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link 
                          href={item.href}
                          onClick={() => setIsNavOpen(false)}
                          className={`flex items-center gap-5 px-6 py-4.5 rounded-2xl transition-all ${
                            isActive 
                              ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40 font-bold' 
                              : 'text-slate-500 hover:text-blue-600'
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

