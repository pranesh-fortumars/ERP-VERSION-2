
'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';

const BillingPage = () => {
  const initialInvoices = [
    { id: 1, invoiceNumber: 'INV-001', clientName: 'Innovate Solutions', amount: 5000, dueDate: '2023-10-15', status: 'Paid' },
    { id: 2, invoiceNumber: 'INV-002', clientName: 'Tech Giants', amount: 12000, dueDate: '2023-10-20', status: 'Pending' },
    { id: 3, invoiceNumber: 'INV-003', clientName: 'Creative Designs', amount: 7500, dueDate: '2023-09-30', status: 'Overdue' },
    { id: 4, invoiceNumber: 'INV-004', clientName: 'Data Weavers', amount: 9000, dueDate: '2023-10-25', status: 'Pending' },
    { id: 5, invoiceNumber: 'INV-005', clientName: 'Health First', amount: 3500, dueDate: '2023-10-10', status: 'Paid' },
  ];

  const [invoices, setInvoices] = useState(initialInvoices);
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    if (newFilter === 'All') {
      setInvoices(initialInvoices);
    } else {
      const filteredInvoices = initialInvoices.filter(invoice => invoice.status === newFilter);
      setInvoices(filteredInvoices);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <h1 className="text-2xl md:text-3xl font-bold">Billing</h1>
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-500" />
          <select 
            onChange={(e) => handleFilterChange(e.target.value)} 
            className="border rounded-lg p-2"
            value={filter}
          >
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice, index) => (
              <motion.tr 
                key={invoice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.clientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default BillingPage;
