
'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiBarChart2, FiPieChart, FiChevronDown } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ReportGenerationPage = () => {
  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 },
  ];

  const inventoryData = [
    { name: 'Toiletries', value: 400 },
    { name: 'Snacks', value: 300 },
    { name: 'Beverages', value: 300 },
    { name: 'Dairy', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const [reportType, setReportType] = useState('Sales');
  const [dateRange, setDateRange] = useState('Last 6 Months');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 lg:p-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Report Generation</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Generate New Report</h2>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="flex-1 mb-4 md:mb-0">
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <div className="relative">
              <select id="reportType" value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sales Report</option>
                <option>Inventory Report</option>
                <option>Customer Report</option>
                <option>Financial Report</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FiChevronDown />
              </div>
            </div>
          </div>
          <div className="flex-1 mb-4 md:mb-0">
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="relative">
                <select id="dateRange" value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Last 6 Months</option>
                    <option>Last 3 Months</option>
                    <option>Last Month</option>
                    <option>All Time</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FiChevronDown />
                </div>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center justify-center">
            <FiFileText className="mr-2" /> Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center"><FiBarChart2 className="mr-2 text-blue-500" /> Monthly Sales Report</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center"><FiPieChart className="mr-2 text-green-500" /> Inventory Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={inventoryData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => entry.name}>
                {inventoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default ReportGenerationPage;
