'use client'

import Layout from '@/components/Layout'
import { signIn } from 'next-auth/react'
import React, { useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const email = useRef("")
  const pass = useRef("")
  const router = useRouter()

  const login = async () => {
    const result = await signIn("credentials", {
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

  return (
    <Layout>
      <div className="App flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="mb-10 mt-0 text-4xl font-medium leading-tight text-primary">Welcome to rc4nnect</h1>
            <input
              className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
              placeholder="Email..."
              onChange={(e) => (email.current = e.target.value)}
            />
            <input
              className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
              type="password"
              placeholder="Password..."
              onChange={(e) => (pass.current = e.target.value)}
            />

            <button
              onClick={login}
              type="submit"
              className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
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
    </Layout>
  )
}

export default LoginPage