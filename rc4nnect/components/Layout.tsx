import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <div className="flex bg-white text-black dark:bg-slate-900 dark:text-white overflow-hidden ">
      <Sidebar />
      <div className="flex-1 p-7 overflow-auto max-h-screen">
        {children}
      </div>

    </div>
  );
}
