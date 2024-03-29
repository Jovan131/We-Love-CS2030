'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Logo from "public/logo.svg"

export default function Account() {
    const router = useRouter()
    return (

        <div className="App flex items-center justify-center h-screen bg-slate-900 select-none">
          <div className="text-center">
            <Image
              className="mx-auto mb-10"
              src={Logo}
              alt="Logo"
              width={150}
              height={150}
            />
            <h1 className="mb-10 mt-0 text-4xl font-medium leading-tight text-primary text-white">Your account have been successfully activated!</h1>
            <div className="mt-4">
              <button className='w-full max-w-[40ch] border border-white border-solid text-white uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'
                    onClick={() => router.push('/login')}>
                Go to login page
              </button>
            </div>
          </div>
        </div>
  
    )
  }