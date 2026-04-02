'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Industry = {
  id: string;
  name: string;
  location: string;
  type: 'Manufacturing' | 'Logistics' | 'R&D';
  accentColor: string;
  stats: {
    revenue: string;
    throughput: string;
    efficiency: string;
    workforce: string;
  };
};

export const industries: Industry[] = [
  { 
    id: 'INST-01', 
    name: 'Pune Manufacturing Hub', 
    location: 'Maharashtra',
    type: 'Manufacturing',
    accentColor: 'blue',
    stats: { revenue: '₹4.2 Cr', throughput: '1,284', efficiency: '94.2%', workforce: '850' }
  },
  { 
    id: 'INST-02', 
    name: 'Chennai Logistics Node', 
    location: 'Tamil Nadu',
    type: 'Logistics',
    accentColor: 'emerald',
    stats: { revenue: '₹3.8 Cr', throughput: '5,600', efficiency: '88.5%', workforce: '420' }
  },
  { 
    id: 'INST-03', 
    name: 'Global R&D Center', 
    location: 'Bangalore',
    type: 'R&D',
    accentColor: 'indigo',
    stats: { revenue: '₹1.5 Cr', throughput: '42', efficiency: '99.1%', workforce: '150' }
  },
];

interface IndustryContextProps {
  activeIndustry: Industry;
  setIndustry: (id: string) => void;
}

const IndustryContext = createContext<IndustryContextProps | undefined>(undefined);

export const IndustryProvider = ({ children }: { children: ReactNode }) => {
  const [activeIndustry, setActiveIndustry] = useState<Industry>(industries[0]);

  const setIndustry = (id: string) => {
    const industry = industries.find(i => i.id === id);
    if (industry) setActiveIndustry(industry);
  };

  return (
    <IndustryContext.Provider value={{ activeIndustry, setIndustry }}>
      {children}
    </IndustryContext.Provider>
  );
};

export const useIndustry = () => {
  const context = useContext(IndustryContext);
  if (!context) throw new Error('useIndustry must be used within an IndustryProvider');
  return context;
};
