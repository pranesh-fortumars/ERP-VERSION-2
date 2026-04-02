'use client'

import React from 'react';
import { IndustryProvider } from './IndustryContext';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <IndustryProvider>
      {children}
    </IndustryProvider>
  );
}
