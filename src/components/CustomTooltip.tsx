
'use client'

import React from 'react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white/95 /95 backdrop-blur-md border border-slate-200 border-slate-200 rounded-2xl shadow-xl">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pld.color }} />
             <div className="flex-1 flex justify-between gap-6">
                <span className="text-xs font-bold text-slate-600 text-slate-600">{pld.name}:</span>
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                  ₹{(pld.value as number).toLocaleString('en-IN')}
                </span>
             </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
