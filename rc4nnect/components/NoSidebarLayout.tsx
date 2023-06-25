import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function NoSidebarLayout(props: LayoutProps) {
  const { children } = props;
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <div className="h-screen flex-1 p-7">
        {children}
      </div>

    </div>
  );
}