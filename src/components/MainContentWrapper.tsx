'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { useUI } from '@/context/UIContext';
import Header from '@/components/Header';
import PageWrapper from '@/components/PageWrapper';

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = useUI();

  return (
    <motion.div 
      animate={{ paddingLeft: isSidebarCollapsed ? 100 : 300 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="flex-1 pt-20 lg:pt-0 flex flex-col w-full overflow-x-hidden min-h-screen relative"
    >
      <Header />
      <PageWrapper>
        <main className="p-6 md:p-10 lg:p-8 w-full max-w-[1920px] mx-auto">
          {children}
        </main>
      </PageWrapper>
    </motion.div>
  );
}
