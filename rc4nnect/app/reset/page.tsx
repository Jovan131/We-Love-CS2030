import { prisma } from '@/app/db';
import React from "react";
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
import { publicEncrypt } from 'crypto';
import { redirect } from 'next/navigation';

function Reset() {
    async function resetPassword(data: FormData) {
        'use server'
        
        const CryptoJS = require("crypto-js");
        var key = "ASECRET";

        const email = data.get('email')
        
        const encrypted = await CryptoJS.AES.encrypt(email, key);


        const resetLink = encrypted.toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');

        
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API)
        
        const resetMsg = `Please click this link to reset your password: https://we-love-cs-2030.vercel.app/resetpassword/${resetLink}` 
            
        console.log(resetMsg)

        const msg = {
          to: email, // Change to your recipient
          from: 'pesmobileinstall@gmail.com', // Change to your verified sender
          subject: 'Reset your password for your rc4nnect account',
          text: resetMsg
        }

        sgMail
        .send(msg)
        .then(() => {
          console.log(`Email sent to ${email}`)
        })
        .catch((error: any) => {
          console.error(error)
        })

        redirect('/authentication/resetsuccess')
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
          <h1 className="mb-10 mt-0 text-4xl font-medium leading-tight text-primary  text-white">Reset your Password</h1>

        <form action={resetPassword} className="space-y-4">
          <input className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-blue-300"
          name="email" type="email"
          placeholder="Enter your email address ..."/>
          <button
              type="submit"
              className="w-full max-w-[40ch] border border-white  text-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900"
            >
              <h2 className='relative z-20'>
                  Reset Password
              </h2>
          </button>
        </form>

      </div>
    </div>
  );
}


export default Reset;