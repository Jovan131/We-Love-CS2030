'use client'

import { signOut } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link'

export default function Sidebar() {
  const pathName = usePathname()
  const [open, setOpen] = useState(true);

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } dark:bg-dark-purple h-screen p-5 pt-8 sticky top-0 duration-300 bg-gray-800`}
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
          <Link href='/dashboard'>
            <div
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 ${
                pathName.startsWith('/dashboard') && "bg-light-white"
              } `}
            >
              <Image src={`/images/Calendar.png`} alt='Dashboard' width={24} height={24} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                My Dashboard
              </span>
            </div>
          </Link>
          <Link href='/all-igs'>
            <div
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-9 ${
                pathName === '/all-igs' && "bg-light-white"
              } `}
            >
              <Image src={`/images/Search.png`} alt='Browse all IGs' width={24} height={24} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Browse All IGs
              </span>
            </div>
          </Link>
          <Link href='/catalog'>
            <div
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2.5 ${
                pathName === '/catalog' && "bg-light-white"
              } `}
            >
              <Image src={`/images/Catalog.png`} alt='ig catalog' width={24} height={24} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                IG Catalog
              </span>
            </div>
          </Link>
          <Link href='/announcements'>
            <div
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2.5 ${
                pathName.startsWith('/announcements') && "bg-light-white"
              } `}
            >
              <Image src={`/images/Chat.png`} alt='Announcements' width={24} height={24} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                View Announcements
              </span>
            </div>
          </Link>
          <Link href='/manage-slots'>
            <div
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-9 ${
                pathName === '/manage-slots' && "bg-light-white"
              } `}
            >
              <Image src={`/images/manageSlot.png`} alt='Announcements' width={24} height={24} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Manage Slots
              </span>
            </div>
          </Link>
          <Link href='/make-announcements'>
            <div
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2.5 ${
                pathName === '/make-announcements' && "bg-light-white"
              } `}
            >
              <Image src={`/images/makeAnnouncement.png`} alt='Announcements' width={24} height={24} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Make Announcements
              </span>
            </div>
          </Link>
          <Link href='/ig-head-application'>
            <div
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2.5 ${
                pathName === '/ig-head-application' && "bg-light-white"
              } `}
            >
              <Image src={`/images/igHeadApp.png`} alt='Announcements' width={24} height={24} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                IG Head Application
              </span>
            </div>
          </Link>
          <Link href='/settings'>
            <div
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-9 ${
                pathName === '/settings' && "bg-light-white"
              } `}
            >
              <Image src={`/images/Settings.png`} alt='Settings' width={24} height={24} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Settings
              </span>
            </div>
          </Link>
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
