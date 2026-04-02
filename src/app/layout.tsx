
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import PageWrapper from '@/components/PageWrapper';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ERP PRO | Advanced Enterprise & Manufacturing Solution',
  description: 'Streamline your manufacturing, sales, and operations with our comprehensive ERP & BPA platform.',
};

import { ClientProviders } from '@/context/ClientProviders';
import SidebarWrapper from '@/components/SidebarWrapper';
import MainContentWrapper from '@/components/MainContentWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans">
        <ClientProviders>
          <div className="flex min-h-screen bg-transparent relative">
            <SidebarWrapper />
            {/* Main Content Area */}
            <MainContentWrapper>
              {children}
            </MainContentWrapper>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
