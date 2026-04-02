'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UIContextType {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (value: boolean) => void;
  toggleSidebar: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Sync with localStorage for persistence
  useEffect(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    if (saved) setIsSidebarCollapsed(JSON.parse(saved));
  }, []);

  const setCollapsed = (value: boolean) => {
    setIsSidebarCollapsed(value);
    localStorage.setItem('sidebar_collapsed', JSON.stringify(value));
  };

  const toggleSidebar = () => {
    setCollapsed(!isSidebarCollapsed);
  };

  return (
    <UIContext.Provider value={{ isSidebarCollapsed, setIsSidebarCollapsed: setCollapsed, toggleSidebar }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within a UIProvider');
  return context;
};
