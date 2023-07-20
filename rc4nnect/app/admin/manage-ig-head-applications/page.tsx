import React from 'react';
import 'tailwindcss/tailwind.css';
import ApplicationsTable from './ApplicationsTable';
import { prisma } from '@/app/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ManageApplications() {
  const session = await getServerSession(authOptions)
  const applications = await prisma.igHeadApplication.findMany({})

  if (session?.user.role !== 'ADMIN') {
    return <div className='mt-5 ml-3'>This is an admin-only page.</div>
  }

  return (
    <ApplicationsTable applications={applications}/>
  );
}   