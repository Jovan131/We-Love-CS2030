import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <div className='flex flex-col min-h-screen relative bg-slate-900 text-white'>
      <Header />
      <main className='flex-1 flex flex-col p-4'>
        {children}
      </main>

    </div>
  );
}