
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <div className="flex min-h-screen bg-transparent">
          <Sidebar />
          <div className="flex-1 md:pl-64 flex flex-col">
            <Header />
            <PageWrapper>
              {children}
            </PageWrapper>
          </div>
        </div>
      </body>
    </html>
  );
}
