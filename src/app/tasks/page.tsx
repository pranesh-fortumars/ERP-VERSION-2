'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiX, FiCheckCircle, FiClock, FiAlertCircle, FiCalendar, FiSearch } from 'react-icons/fi';

const initialTasks = [
  { id: 1, title: 'Finalize GST Reconciliation (Q4)', dueDate: '2024-03-30', priority: 'High', status: 'In Progress', category: 'Finance' },
  { id: 2, title: 'Warehouse Audit - Sector 7', dueDate: '2024-04-05', priority: 'Medium', status: 'Not Started', category: 'Logistics' },
  { id: 3, title: 'Vendor Onboarding: Tata Steel', dueDate: '2024-03-28', priority: 'High', status: 'In Progress', category: 'Procurement' },
  { id: 4, title: 'Update BPA Workflow Nodes', dueDate: '2024-03-25', priority: 'Low', status: 'Completed', category: 'Operations' },
];

const TasksPage = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', priority: 'Medium', category: 'Operations' });

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(t => priorityFilter === 'All' || t.priority === priorityFilter)
      .filter(t => statusFilter === 'All' || t.status === statusFilter);
  }, [priorityFilter, statusFilter, searchTerm, tasks]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([{ 
      ...newTask, 
      id: Date.now(), 
      status: 'Not Started' 
    }, ...tasks]);
    setIsModalOpen(false);
    setNewTask({ title: '', dueDate: '', priority: 'Medium', category: 'Operations' });
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-rose-600 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400';
      case 'Medium': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400';
      case 'Low': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400';
      default: return 'text-slate-600 bg-slate-50 dark:bg-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <FiCheckCircle className="text-emerald-500" />;
      case 'In Progress': return <FiClock className="text-blue-500 animate-spin-slow" />;
      case 'Not Started': return <FiAlertCircle className="text-slate-300" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 px-4 md:px-0">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Active Tasks</h1>
          <p className="text-slate-500 font-medium tracking-tight mt-1">Orchestrate mission-critical enterprise operations and milestones.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2 uppercase tracking-widest"
        >
          <FiPlus /> New Operational Task
        </button>
      </div>

      {/* Control Bar */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col xl:flex-row items-center gap-6">
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search task registry..."
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-blue-500/10 outline-none transition-all dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4 w-full xl:w-auto">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-5 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <FiFilter className="text-slate-400" size={14} />
            <select 
              className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none dark:text-slate-200"
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priority</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-5 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <FiCalendar className="text-slate-400" size={14} />
            <select 
              className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none dark:text-slate-200"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Ledger */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operational Task</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Horizon (Due)</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Urgency</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Lifecycle State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task, index) => (
                  <motion.tr
                    layout
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <FiCheckCircle />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 dark:text-white">{task.title}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">{task.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-600 dark:text-slate-400">{task.dueDate}</td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${getPriorityStyles(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-3 text-sm font-black text-slate-900 dark:text-white">
                        {task.status}
                        {getStatusIcon(task.status)}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Modal */}
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
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[40px] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">New Operational Task</h2>
                  <p className="text-slate-500 font-medium text-xs mt-1 uppercase tracking-widest font-black">Registry Entry</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Task Designation</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Q3 Compliance Audit" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 dark:text-white font-bold"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Completion Horizon</label>
                    <input 
                      required
                      type="date" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 dark:text-white font-bold"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Urgency Level</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 dark:text-white font-bold"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    >
                      <option value="High">High Urgency</option>
                      <option value="Medium">Medium Urgency</option>
                      <option value="Low">Low Urgency</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Functional Category</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Strategic Finance" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 px-5 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 dark:text-white font-bold"
                    value={newTask.category}
                    onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full mt-4 py-4 bg-blue-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all hover:scale-[1.01]">
                  Commit Task to Registry
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TasksPage;

