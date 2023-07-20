import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar />
      <div className="min-h-screen flex-1 p-7 overflow-hidden">
        {children}
      </div>

    </div>
  );
}



//    <div className='flex flex-col min-h-screen relative bg-slate-900 text-white'>
