'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Tabs() {
  const pathName = usePathname()

  return (
    <div className='ml-3'>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="mr-2">
          <Link href="/announcements/subscribed"><div className={`cursor-pointer inline-block p-4 rounded-t-lg ${pathName==='/dashboard/schedule' ? 'text-blue-600 bg-gray-100' : 'hover:text-gray-600 hover:bg-gray-50'} dark:bg-gray-800 dark:text-blue-500`}>Subscribed IGs</div></Link>
        </li>
        <li className="mr-2">
          <Link href="/announcements/all"><div className={`cursor-pointer inline-block p-4 rounded-t-lg ${pathName==='/dashboard/subscribed-igs' ? 'text-blue-600 bg-gray-100' : 'hover:text-gray-600 hover:bg-gray-50'} dark:bg-gray-800 dark:text-blue-500`}>All IGs</div></Link>
        </li>
      </ul>
    </div>
  );
}