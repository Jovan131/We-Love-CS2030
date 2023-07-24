import React from 'react'
import Image from 'next/image'
import Logo from "public/logo.svg"
import { prisma } from '../db'
import Link from 'next/link'

type AppProps = {
  searchParams: string
}

export default async function Account({ searchParams }: AppProps) {
    const token = Object.keys(searchParams)[0];

    const user = await prisma.resident.findFirst({
      where: {
        Token: {
          some: {
            AND: [
              {
                activatedAt: null,
              },
              {
                createdAt: {
                  gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
                },
              },
              {
                token,
              },
            ],
          },
        },
      },
    })
  
    if (!user) {
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
            <h1 className="mb-10 mt-0 text-4xl font-medium leading-tight text-primary text-white">Token is invalid or expired</h1>
          </div>
        </div>
      )
    } else {
      await prisma.resident.update({
        where: {
          id: user.id,
        },
        data: {
          active: true,
        },
      })
    
      await prisma.token.update({
        where: {
          token: token,
        },
        data: {
          activatedAt: new Date(),
        },
      })

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
            <h1 className="mb-10 mt-0 text-4xl font-medium leading-tight text-primary text-white">Your account has been successfully activated!</h1>
            <div className="mt-4">
              <Link href='/login'>
                <button className='w-full max-w-[40ch] border border-white border-solid text-white uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                  Go to login page
                </button>
              </Link>
            </div>
          </div>
        </div>
      )
    }
  }
