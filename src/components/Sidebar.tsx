
'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiArchive, FiUsers, FiBriefcase, 
  FiTool, FiFileText, FiBarChart2, FiDollarSign, 
  FiCreditCard, FiTrendingUp, FiSettings, FiActivity,
  FiX, FiMenu
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
      <div className="w-64 sidebar-gradient text-white p-6 hidden md:flex flex-col h-screen fixed left-0 top-0 z-50 border-r border-slate-700/50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="p-2 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
            <FiActivity className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">ERP <span className="text-indigo-400">PRO</span></h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto no-scrollbar">
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-medium' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span className={`text-xl transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-200 shadow-glow"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-700/50">
          <div className="flex items-center gap-3 px-2 py-3 bg-slate-800/50 rounded-2xl border border-slate-700/30">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold">
              AS
            </div>
            <div>
              <p className="text-sm font-semibold">Arjun Sharma</p>
              <p className="text-xs text-slate-500">Operation Head</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-[60]">
        <button 
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-700 active:scale-95 transition-all"
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
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] md:hidden"
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-80 sidebar-gradient text-white p-6 z-[60] md:hidden shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-10 px-2 pt-14">
                <div className="p-2 bg-indigo-500 rounded-lg">
                  <FiActivity className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-extrabold tracking-tight">ERP <span className="text-indigo-400">PRO</span></h1>
              </div>
              <nav className="overflow-y-auto max-h-[80vh] no-scrollbar">
                <ul className="space-y-1.5">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link 
                          href={item.href}
                          onClick={() => setIsNavOpen(false)}
                          className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                            isActive 
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-base font-medium">{item.label}</span>
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
