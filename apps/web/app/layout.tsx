import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import { Header, Footer } from './components';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dashboard - Yellow Ladder Coffee',
  description: 'Coffee shop order management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
