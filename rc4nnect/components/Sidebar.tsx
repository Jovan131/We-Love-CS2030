'use client'

import { signOut } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image';

export default function Sidebar() {
  const pathName = usePathname()
  const [open, setOpen] = useState(true);
  const router = useRouter()

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-dark-purple h-screen p-5 pt-8 sticky top-0 duration-300`}
    >
      <Image
        alt='control'
        src="/images/control.png"
        width={28}
        height={28}
        className={`absolute cursor-pointer -right-3 top-9 border-dark-purple
          border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <Image
          alt='rc4nnect logo'
          src="/logo.svg"
          width={40}
          height={40}
          className={`cursor-pointer duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          rc4nnect
        </h1>
      </div>
      <div className="pt-6 flex flex-col justify-between h-full">
        <div>
          <div
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 ${
              pathName.startsWith('/dashboard') && "bg-light-white"
            } `}
            onClick={() => {router.push('/dashboard')}}
          >
            <Image src={`/images/Calendar.png`} alt='Dashboard' width={24} height={24} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              My Dashboard
            </span>
          </div>

          <div
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-9 ${
              pathName === '/all-igs' && "bg-light-white"
            } `}
            onClick={() => {router.push('/all-igs')}}
          >
            <Image src={`/images/Search.png`} alt='Browse all IGs' width={24} height={24} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Browse All IGs
            </span>
          </div>

          <div
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2.5 ${
              pathName === '/catalog' && "bg-light-white"
            } `}
            onClick={() => {router.push('/catalog')}}
          >
            <Image src={`/images/Catalog.png`} alt='ig catalog' width={24} height={24} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              IG Catalog
            </span>
          </div>

          <div
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2.5 ${
              pathName === '/announcements' && "bg-light-white"
            } `}
            onClick={() => {router.push('/announcements')}}
          >
            <Image src={`/images/Chat.png`} alt='Annonucements' width={24} height={24} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Annonucements
            </span>
          </div>
          
          <div
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-9 ${
              pathName === '/manage-slots' && "bg-light-white"
            } `}
            onClick={() => {router.push('/manage-slots')}}
          >
            <div className='w-6 h-6'></div>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Manage Slots
            </span>
          </div>

          <div
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2.5 ${
              pathName === '/make-announcements' && "bg-light-white"
            } `}
            onClick={() => {router.push('/make-announcements')}}
          >
            <div className='w-6 h-6'></div>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Make Announcements
            </span>
          </div>


          <div
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2.5 ${
              pathName === '/ig-head-application' && "bg-light-white"
            } `}
            onClick={() => {router.push('/ig-head-application')}}
          >
            <div className='w-6 h-6'></div>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              IG Head Application
            </span>
          </div>

          <div
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-9 ${
              pathName === '/settings' && "bg-light-white"
            } `}
            onClick={() => {router.push('/settings')}}
          >
            <Image src={`/images/Settings.png`} alt='Settings' width={24} height={24} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Settings
            </span>
          </div>
        </div>
        <div
          className={"flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mb-12"}
          onClick={() => {
            signOut({ callbackUrl: '/login' })
            toast.success('Logged out successfully')
          }}
        >
          <Image src={`/images/logout.png`} alt='logout' width={24} height={24} />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}
