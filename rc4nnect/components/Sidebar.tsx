'use client'

import { signOut } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "My Dashboard", src: "Calendar", redirectURL: "/dashboard" },
    { title: "Browse All IGs", src: "Search", gap: true, redirectURL: "/all-igs" },
    { title: "Announcements ", src: "Chat", redirectURL: "/announcements" },
    { title: "Settings ", src: "Settings", gap: true, redirectURL: "/settings" },
    { title: "Logout ", src: "logout", bigGap: true, redirectURL: "/logout" },
  ];
  const router = useRouter()

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
    >
      <img
        src="/images/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
          border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="./images/rc4nnect-logo.png"
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
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
            ${Menu.gap ? "mt-9" : "mt-2"} ${Menu.bigGap ? "mt-[21.2rem]" : ""} ${
              index === 0 && "bg-light-white"
            } `}
            onClick={() => {
              if (Menu.redirectURL === '/logout') {
                signOut()
                toast.success('Logged out successfully')
                router.push('/login')        
              } else {
                router.push(Menu.redirectURL)
              }
            }}
          >
            <img src={`./images/${Menu.src}.png`} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
