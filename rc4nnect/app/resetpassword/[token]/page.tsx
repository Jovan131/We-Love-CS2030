'use client'

import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import { usePathname } from "next/navigation";
import Image from 'next/image'
import Logo from "public/logo.svg"
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

function ResetPassword() {
    const currentPage = usePathname();
    console.log(currentPage)
    const encryptedEmail = currentPage.slice(15).toString().replace(/p1L2u3S/g, '+' ).replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');
    console.log(encryptedEmail)

    const CryptoJS = require("crypto-js");
    var key = "ASECRET";
  
    const decrypted = CryptoJS.AES.decrypt(encryptedEmail, key);
    const email = decrypted.toString(CryptoJS.enc.Utf8);
  
    console.log(email)

    const [data, setData] = useState({
        email: email,
        password: '',
        confirmPassword: ''
    })

    const router = useRouter()
    

    const register = async (e: any) => {
        e.preventDefault()
        axios.post('/api/reset', data)
        .then(() => {
        toast.success('Password reset successful!')
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
          <h1 className="mb-10 mt-0 text-4xl font-medium leading-tight text-primary  text-white">Reset your password</h1>
          <form className="max-w-[40ch]" onSubmit={register}>
            <div className='relative'>
              <input
                className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
                type={showPassword ? "text" : "password"}
                placeholder="Enter a new password..."
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
                placeholder="Confirm new password..."
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
                  RESET
              </h2>
            </button>
          </form>

        </div>
      </div>

  );
}


export default ResetPassword;