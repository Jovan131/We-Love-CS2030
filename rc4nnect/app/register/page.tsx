'use client'

import Layout from "@/components/Layout";
import axios from "axios";
import { hash } from "bcrypt";
import { useState } from "react";
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import NoSidebarLayout from "@/components/NoSidebarLayout";
import Image from 'next/image'
import Logo from "public/logo.svg"
import { NextResponse } from 'next/server'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const router = useRouter()


  const register = async (e: any) => {
    e.preventDefault()
    axios.post('/api/register', data)
    .then(() => {
      toast.success('Please check your email to activate your account!')
      router.push('/login')
    })
    .catch((error) => {
      toast.error(error.response.data)
    }
    )
  }

  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
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
          <h1 className="mb-10 mt-0 text-4xl font-medium leading-tight text-primary  text-white">Welcome to rc4nnect</h1>
          <form className="max-w-[40ch]" onSubmit={register}>
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
            <div className='relative'>
              <input
                className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
                type={showPassword ? "text" : "password"}
                placeholder="Password..."
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <div className='text-2xl absolute top-2 right-2'>
                {
                  (showPassword === false) ? <AiFillEye onClick={togglePassword} /> : 
                  <AiFillEyeInvisible onClick={togglePassword} />
                }
              </div>
            </div> 
            <div className='relative'>
              <input
                className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password..."
                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                />
              <div className='text-2xl absolute top-2 right-2'>
                {
                  (showConfirmPassword === false) ? <AiFillEye onClick={toggleConfirmPassword} /> : 
                  <AiFillEyeInvisible onClick={toggleConfirmPassword} />
                }
              </div>
            </div>            
            <button
              type="submit"
              className="w-full max-w-[40ch] border border-white  text-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900"
            >
              <h2 className='relative z-20'>
                  REGISTER
              </h2>
            </button>
          </form>
          <div className="mt-4">
            <button className="text-white underline hover:text-gray-400" onClick={() => router.push('/login')}>
              Already have an account? Login here
            </button>
          </div>

        </div>
      </div>

  );
}


export default Register;