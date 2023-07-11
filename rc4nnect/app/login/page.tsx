'use client'

import Layout from '@/components/Layout'
import { signIn, useSession } from 'next-auth/react'
import React, { useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Logo from "public/logo.svg"
import { useEffect, useState } from 'react'
import { Provider } from 'next-auth/providers'
import NoSidebarLayout from '@/components/NoSidebarLayout'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

export default function LoginPage() {
  
  const session = useSession()

  useEffect(() => {
    if (session?.status == 'authenticated') {
      router.push('/dashboard')
    }
  })

  const email = useRef("")
  const pass = useRef("")
  const router = useRouter()


  const login = async (e: any) => {
    e.preventDefault()
    await signIn("credentials", {
      email: email.current,
      password: pass.current,
      redirect: false
    }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error)
      }
      if (callback?.ok && !callback?.error) {
        toast.success('Logged in successfully')
        router.push('/dashboard')
      }
    })
  }

  const [showPassword, setShowPassword] = useState(false)
  const toggle = () => {
    setShowPassword(!showPassword)
  }

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
          <h1 className="mb-10 mt-0 text-4xl font-medium leading-tight text-primary text-white">Welcome to rc4nnect</h1>
            <input
              className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
              placeholder="Email"
              onChange={(e) => (email.current = e.target.value)}
            />
            <div className='relative'>
              <input
                className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => (pass.current = e.target.value)}
              />
              <div className='text-2xl absolute top-2 right-2'>
                {
                  (showPassword === false) ? <AiFillEye onClick={toggle} /> : 
                  <AiFillEyeInvisible onClick={toggle} />
                }
              </div>
            </div>
            <button
              onClick={login}
              type="submit"
              className='w-full max-w-[40ch] border border-white border-solid text-white uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                  <h2 className='relative z-20'>
                      LOGIN
                  </h2>
            </button>
          <div className="mt-4">
            <button className="text-white underline" onClick={() => router.push('/register')}>
              Don&apos;t have an account? Register here
            </button>
          </div>
        </div>
      </div>

  )
}
