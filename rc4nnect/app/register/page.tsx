'use client'

import Layout from "@/components/Layout";
import axios from "axios";
import { hash } from "bcrypt";
import { useState } from "react";
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import NoSidebarLayout from "@/components/NoSidebarLayout";

function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const router = useRouter()


  const register = async (e: any) => {
    e.preventDefault()
    axios.post('/api/register', data)
      .then(() => {
        toast.success('User has been registered!')
        router.push('/login')
      })
      .catch(() => toast.error('Something went wrong!'))
  }

  return (
    <NoSidebarLayout>
      <div className="App flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="mb-10 mt-0 text-4xl font-medium leading-tight text-primary">Welcome to rc4nnect</h1>
          <form onSubmit={register}>
            <input
              className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-blue-300"
              placeholder="Name..."
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            <input
              className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-blue-300"
              placeholder="Email..."
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            <input
              className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-blue-300"
              type="password"
              placeholder="Password..."
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              />

            <button
              type="submit"
              className="w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900"
            >
              <h2 className='relative z-20'>
                  REGISTER
              </h2>
            </button>
          </form>
        </div>
      </div>
    </NoSidebarLayout>
  );
}


export default Register;