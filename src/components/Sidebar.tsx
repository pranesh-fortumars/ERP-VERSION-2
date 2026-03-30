
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
      <style jsx global>{`
        .sidebar {
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
        }
        .dark .sidebar {
          background: linear-gradient(180deg, #0f172a 0%, #020617 100%);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Desktop Sidebar */}
      <div className="w-64 sidebar text-white p-6 hidden md:flex flex-col h-screen fixed left-0 top-0 z-50 border-r border-slate-700/50">
        <div className="flex items-center gap-3 mb-10 px-2 mt-4">
          <div className="p-2.5 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20">
            <FiActivity className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black tracking-tighter">
            ERP <span className="text-indigo-400">PRO</span>
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/40' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span className={`text-xl transition-all duration-300 group-hover:scale-125 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`}>
                      {item.icon}
                    </span>
                    <span className={`text-sm font-bold tracking-tight ${isActive ? 'translate-x-1' : ''}`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-700/50">
          <div className="flex items-center gap-4 px-3 py-4 bg-slate-800/40 rounded-3xl border border-white/5 hover:border-white/10 transition-all cursor-pointer">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center font-black text-white shadow-lg">
              AS
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-black truncate">Arjun Sharma</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Admin Panel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-5 left-5 z-[100]">
        <button 
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="p-3.5 bg-indigo-600 text-white rounded-2xl shadow-2xl hover:bg-indigo-700 active:scale-90 transition-all border border-indigo-400/20"
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
              className="fixed top-0 left-0 h-full w-[85%] sidebar text-white p-6 z-[90] md:hidden shadow-2xl border-r border-white/5 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-12 px-2 pt-16">
                <div className="p-3 bg-indigo-500 rounded-2xl shadow-xl">
                  <FiActivity className="w-7 h-7" />
                </div>
                <h1 className="text-2xl font-black tracking-tighter">ERP <span className="text-indigo-400 font-light">PRO</span></h1>
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
                          className={`flex items-center gap-5 px-6 py-4 rounded-[24px] transition-all duration-300 ${
                            isActive 
                              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/40 font-bold' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-lg tracking-tight">{item.label}</span>
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

