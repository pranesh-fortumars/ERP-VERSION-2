'use client'

import React from 'react';
import { IndustryProvider } from './IndustryContext';
import { UIProvider } from './UIContext';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <IndustryProvider>
        {children}
      </IndustryProvider>
    </UIProvider>
  );
}
