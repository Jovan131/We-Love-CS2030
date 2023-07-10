import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  routeIndex: number
}

export default function Layout(props: LayoutProps) {
  const { children, routeIndex } = props;
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar routeIndex={routeIndex} />
      <div className="min-h-screen flex-1 p-7">
        {children}
      </div>

    </div>
  );
}



//    <div className='flex flex-col min-h-screen relative bg-slate-900 text-white'>
