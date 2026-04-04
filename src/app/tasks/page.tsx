'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTool, FiCheckCircle, FiClock, FiAlertTriangle, FiPlus, FiX, 
  FiSearch, FiFilter, FiActivity, FiUser, FiCalendar, FiGlobe, FiDatabase
} from 'react-icons/fi';

const TasksPage = () => {
  const [tasks, setTasks] = useState([
    { id: 'TSK-201', title: 'Calibrate Precision Press 07', priority: 'High', status: 'Pending', assignedTo: 'Rahul Kumar', deadline: '2024-03-31' },
    { id: 'TSK-184', title: 'Audit Logistics Node Delta', priority: 'Med', status: 'In Progress', assignedTo: 'Anjali Singh', deadline: '2024-04-02' },
    { id: 'TSK-092', title: 'Update BPA Logic Flow', priority: 'Low', status: 'Completed', assignedTo: 'Priya Sharma', deadline: '2024-03-25' },
    { id: 'TSK-215', title: 'Emergency Node De-sync Repair', priority: 'Critical', status: 'In Progress', assignedTo: 'Vikram Mehta', deadline: '2024-03-30' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Low', assignedTo: 'Arjun Sharma', deadline: '' });

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TSK-${Math.floor(Math.random() * 900 + 100)}`;
    setTasks([{ id, ...newTask, status: 'Pending' }, ...tasks]);
    setIsModalOpen(false);
    setNewTask({ title: '', priority: 'Low', assignedTo: 'Arjun Sharma', deadline: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'In Progress': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'Pending': return 'bg-slate-50 text-slate-950 border-slate-200';
      default: return 'bg-slate-100 text-slate-950';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-rose-600 bg-rose-50';
      case 'High': return 'text-amber-600 bg-amber-50';
      case 'Med': return 'text-indigo-600 bg-indigo-50';
      default: return 'text-slate-950 bg-slate-50';
    }
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-12 transition-all">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-6 border-b border-slate-100">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[14px] font-serif-professional tracking-wide  tracking-widest mb-4 border border-indigo-100">
             <FiGlobe className="animate-spin-slow" /> Global Task Network Active
          </div>
          <h1 className="text-3xl font-black text-slate-950 uppercase tracking-tight leading-none">Task Matrix</h1>
          <p className="text-slate-950 font-bold text-xl mt-2 flex items-center gap-2">
            <FiActivity className="text-indigo-500" /> Real-time Operational Execution & Service Maintenance
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-8 py-3.5 bg-indigo-600 text-white rounded-[24px] text-[14px] font-serif-professional tracking-wide  tracking-[0.3em] shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2"
           >
             <FiPlus /> Initialize Task
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        {/* Main Task List */}
        <div className="xl:col-span-3 space-y-8">
           <div className="industrial-card p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
              <div className="relative group flex-1 w-full">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-950 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Query task identifier, nomenclature, or priority..."
                  className="w-full bg-slate-50 border-none rounded-[24px] py-3 pl-16 pr-6 text-xl font-black focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all text-slate-950"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                 <button className="padding-6 py-3.5 bg-white border border-slate-100 rounded-[24px] text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 hover:text-indigo-600 transition-all active:scale-95 px-6">
                    Audit Log
                 </button>
                 <button className="p-3.5 bg-indigo-50 text-indigo-600 rounded-[24px] hover:bg-indigo-600 hover:text-white transition-all active:scale-95 border border-indigo-100">
                    <FiFilter size={20} />
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-1 gap-6">
              <AnimatePresence>
                {filteredTasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all flex flex-col md:flex-row items-center justify-between gap-8 group"
                  >
                    <div className="flex items-center gap-6 flex-1 w-full overflow-hidden">
                       <div className={`w-14 h-14 rounded-[24px] flex items-center justify-center font-black text-base shrink-0 shadow-lg ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0)}
                       </div>
                       <div className="overflow-hidden">
                          <h3 className="text-base font-black text-slate-950 uppercase tracking-tight truncate group-hover:text-indigo-600 transition-colors leading-none mb-1">{task.title}</h3>
                          <p className="text-[14px] font-black text-slate-950 uppercase tracking-widest flex items-center gap-2">
                             <FiTool className="text-indigo-500" /> {task.id} • Assigned to {task.assignedTo}
                          </p>
                       </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 w-full md:w-auto justify-end">
                       <div className="text-right flex flex-col items-end">
                          <p className="text-[13px] font-black text-slate-950 uppercase tracking-widest leading-none mb-1">Target Deadline</p>
                          <p className="text-[14px] font-black text-slate-950 flex items-center gap-2"><FiCalendar className="text-indigo-600" /> {task.deadline}</p>
                       </div>
                       <span className={`px-6 py-2 rounded-xl text-[13px] font-serif-professional tracking-wide  tracking-widest border ${getStatusColor(task.status)} shadow-sm`}>
                          {task.status}
                       </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
           <div className="p-10 bg-indigo-600 rounded-[40px] overflow-hidden relative group min-h-[400px] flex flex-col justify-between shadow-2xl">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              <div className="relative z-10 flex flex-col flex-1 justify-between">
                 <div>
                    <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center shadow-2xl mb-8 group-hover:rotate-12 transition-transform ring-8 ring-white/10">
                       <FiActivity className="text-indigo-600 w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-4">Throughput Matrix</h3>
                    <p className="text-indigo-50 text-base font-bold leading-relaxed">Task resolution velocity has increased by <span className="text-white font-black">22.4%</span> this procurement cycle.</p>
                 </div>
                 <button className="w-full py-3 bg-white text-indigo-600 font-black rounded-[32px] text-[14px] uppercase tracking-[0.4em] active:scale-95 transition-all shadow-2xl">
                    Performance Stats
                 </button>
              </div>
           </div>

           <div className="industrial-card p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm">
              <h4 className="text-base font-black text-slate-950 uppercase tracking-tight mb-6 flex items-center gap-3">
                 <FiDatabase className="text-indigo-600" /> Network Nodes
              </h4>
              <div className="space-y-6">
                 {[
                   { node: 'Node-4 Alpha', load: '88%', status: 'Active' },
                   { node: 'Node-7 Delta', load: '42%', status: 'Active' },
                   { node: 'Node-2 Omega', load: '95%', status: 'Warning' }
                 ].map((n, i) => (
                   <div key={i} className="space-y-2 group cursor-pointer">
                      <div className="flex justify-between items-center text-[14px] font-serif-professional tracking-wide   text-slate-950">
                         <span>{n.node}</span>
                         <span className={n.status === 'Warning' ? 'text-amber-500' : 'text-indigo-600'}>{n.load}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-200/20">
                         <motion.div initial={{ width: 0 }} animate={{ width: n.load }} transition={{ duration: 1, delay: i * 0.1 }} className={`h-full ${n.status === 'Warning' ? 'bg-amber-500' : 'bg-indigo-600'}`} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
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
              className="relative w-full max-w-xl bg-white rounded-[40px] p-10 md:p-10 border border-indigo-500/10 shadow-3xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-950 uppercase leading-none">Initialize Task</h2>
                  <p className="text-slate-950 font-black text-[14px] mt-2 uppercase tracking-[0.3em]">Operational Network Ledger</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-4 hover:bg-slate-50 rounded-[24px] text-slate-950 transition-colors active:scale-95"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={addTask} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Task Nomenclature</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Audit Node Cluster Velocity" 
                    className="w-full bg-slate-50 border-none rounded-[24px] py-3 px-8 text-xl outline-none focus:ring-4 focus:ring-indigo-600/5 font-black text-slate-950"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Priority Vector</label>
                    <select 
                      className="w-full bg-slate-50 border-none rounded-[24px] py-3 px-8 text-xl outline-none focus:ring-4 focus:ring-indigo-600/5 font-black text-slate-950 appearance-none"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    >
                      <option>Low</option>
                      <option>Med</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[14px] font-serif-professional tracking-wide  tracking-widest text-slate-950 ml-1">Execution Deadline</label>
                    <input 
                      required
                      type="date" 
                      className="w-full bg-slate-50 border-none rounded-[24px] py-3 px-8 text-xl outline-none focus:ring-4 focus:ring-indigo-600/5 font-black text-slate-950"
                      value={newTask.deadline}
                      onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-[24px] font-black text-[13px] uppercase tracking-[0.4em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-90 flex items-center justify-center gap-3">
                   <FiCheckCircle size={20} /> Deploy Operational Artifact
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksPage;
