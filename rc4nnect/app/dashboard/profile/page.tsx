import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react';
import 'tailwindcss/tailwind.css';


export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  return (
    <div className='ml-3'>
      <div className='mt-10 flex flex-col items-center mb-8'>
        <div className="relative w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg className="absolute w-[8.5rem] h-[8.5rem] text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
        </div>
        <div className='flex items-center mt-3 text-5xl'>
          <span className=''>{session?.user?.name}</span>
        </div>
      </div>
      <div>
        <div className='mb-8'>
          <h1 className='text-3xl mb-2'>Email</h1>
          <h3 className='bg-gray-200 text-black rounded py-4 px-2 text-xl'>{session?.user?.email}</h3>
        </div>
        <div className='mb-16'>
          <h1 className='text-3xl mb-2'>Roles</h1>
          <div className='bg-gray-200 text-black rounded py-2 px-2 flex justify-start'>
            <div className="bg-green-100 text-xl text-black font-medium mr-2 px-2.5 py-2 w-fit rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">RC4 Resident</div>
            <div className="bg-yellow-100 text-xl text-black font-medium mr-2 px-2.5 py-2 w-fit rounded-full dark:bg-yellow-900 dark:text-yellow-300">Badminton IG Head</div>
          </div>
        </div>
        <div className='flex justify-end'>
        <button type="button" className="focus:outline-none text-xl text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-5 py-2.5 dark:focus:ring-yellow-900">Change password</button>
        </div>
      </div>
    </div>
  );
}   