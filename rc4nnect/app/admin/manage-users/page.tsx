import React from 'react';
import 'tailwindcss/tailwind.css';
import UsersTable from './UsersTable';
import { prisma } from '@/app/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ManageUsers() {
  const session = await getServerSession(authOptions)
  const users = await prisma.resident.findMany({})
  
  if (session?.user.role !== 'ADMIN') {
    return <div className='mt-5 ml-3'>This is an admin-only page.</div>
  }

  return (
    <UsersTable users={users}/>
  );
}   