
'use client'

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiFilter, FiX } from 'react-icons/fi';

const TasksPage = () => {
  const initialTasks = [
    { id: 1, title: 'Follow up with leads', dueDate: '2023-10-10', priority: 'High', status: 'In Progress' },
    { id: 2, title: 'Prepare monthly sales report', dueDate: '2023-10-15', priority: 'Medium', status: 'Not Started' },
    { id: 3, title: 'Onboard new customer', dueDate: '2023-10-12', priority: 'High', status: 'In Progress' },
    { id: 4, title: 'Team meeting', dueDate: '2023-10-09', priority: 'Low', status: 'Completed' },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    let tempTasks = tasks;

    if (priorityFilter !== 'All') {
      tempTasks = tempTasks.filter(task => task.priority === priorityFilter);
    }

    if (statusFilter !== 'All') {
      tempTasks = tempTasks.filter(task => task.status === statusFilter);
    }

    return tempTasks;
  }, [priorityFilter, statusFilter, tasks]);

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const dueDate = (form.elements.namedItem('dueDate') as HTMLInputElement).value;
    const priority = (form.elements.namedItem('priority') as HTMLSelectElement).value;

    const newTask = {
      id: tasks.length + 1,
      title,
      dueDate,
      priority,
      status: 'Not Started',
    };

    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Not Started': return 'text-gray-600 bg-gray-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 lg:p-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Tasks</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center"
        >
          <FiPlus className="mr-2" /> New Task
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center space-x-4">
          <FiFilter className="text-gray-500" />
          <div className="flex items-center space-x-2">
            <label htmlFor="priority" className="text-sm font-medium">Priority:</label>
            <select 
              id="priority"
              className="border rounded-lg p-2"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="status" className="text-sm font-medium">Status:</label>
            <select 
              id="status" 
              className="border rounded-lg p-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>In Progress</option>
              <option>Not Started</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Due Date</th>
              <th className="py-3 px-4 text-left">Priority</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <motion.tr
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hover:bg-gray-100 border-b"
              >
                <td className="py-3 px-4">{task.title}</td>
                <td className="py-3 px-4">{task.dueDate}</td>
                <td className={`py-3 px-4 font-semibold ${getPriorityColor(task.priority)}`}>{task.priority}</td>
                <td className="py-3 px-4">
                  <span className={`py-1 px-3 rounded-full text-sm ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Task</h2>
              <button onClick={() => setIsModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateTask}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                <input type="text" id="title" name="title" className="w-full border rounded-lg p-2" required />
              </div>
              <div className="mb-4">
                <label htmlFor="dueDate" className="block text-sm font-medium mb-1">Due Date</label>
                <input type="date" id="dueDate" name="dueDate" className="w-full border rounded-lg p-2" required />
              </div>
              <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium mb-1">Priority</label>
                <select id="priority" name="priority" className="w-full border rounded-lg p-2">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TasksPage;
