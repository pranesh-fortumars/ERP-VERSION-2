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
      <style jsx global>{`
        .sidebar-standard {
          background-color: #1e293b;
        }
        .dark .sidebar-standard {
          background-color: #020617;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Desktop Sidebar */}
      <div className="w-64 sidebar-standard text-white p-6 hidden md:flex flex-col h-screen fixed left-0 top-0 z-50 border-r border-slate-700/50">
        <div className="flex items-center gap-3 mb-10 px-2 mt-4">
          <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center text-white shadow-lg">
            <FiServer size={20} />
          </div>
          <h1 className="text-xl font-black tracking-tighter">
            PRO <span className="text-blue-500">ERP</span>
          </h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto no-scrollbar">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span className={`text-lg transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`}>
                      {item.icon}
                    </span>
                    <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'translate-x-1' : ''}`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-700/50">
          <div className="flex items-center gap-4 px-3 py-4 bg-slate-800/40 rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white shadow-lg group-hover:scale-105 transition-transform">
              AS
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-black truncate">Arjun Sharma</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Admin Panel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-5 left-5 z-[100]">
        <button 
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="p-3.5 bg-blue-600 text-white rounded-xl shadow-2xl hover:bg-blue-700 active:scale-90 transition-all border border-blue-400/20"
        >
          {isNavOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNavOpen(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[80] md:hidden"
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-[280px] sidebar-standard text-white p-6 z-[90] md:hidden shadow-2xl border-r border-white/5 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-12 px-2 pt-16">
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white shadow-xl">
                  <FiServer size={24} />
                </div>
                <h1 className="text-2xl font-black tracking-tighter">PRO <span className="text-blue-500">ERP</span></h1>
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
                          className={`flex items-center gap-5 px-5 py-3.5 rounded-xl transition-all ${
                            isActive 
                              ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/40 font-bold' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
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

