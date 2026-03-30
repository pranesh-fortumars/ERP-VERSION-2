
'use client'

import React from 'react';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border border-gray-300 rounded shadow-lg">
        <p className="label">{`${label}`}</p>
        {payload.map((pld, index) => (
          <div key={index} style={{ color: pld.color }}>
            {`${pld.name}: ₹${(pld.value as number).toLocaleString('en-IN')}`}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
