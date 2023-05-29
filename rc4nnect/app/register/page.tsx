"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import type { User } from "firebase/auth";
import Layout from "@/components/Layout";

function Register() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const router = useRouter();

    const register = async (event: React.FormEvent) => {
      event.preventDefault(); // Prevent form submission

        try {
        const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
        );
        console.log(user);
        router.push("/login");
        } catch (error: any) {
        console.log(error.message);
        }
    };

    return (
      <Layout>
          <div className="App flex items-center justify-center h-screen">
            <div className="text-center">
              <h1 className="mb-10 mt-0 text-4xl font-medium leading-tight text-primary">Welcome to rc4nnect</h1>
              <form onSubmit={register}>
                <input
                  className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-blue-300"
                  placeholder="Email..."
                  value={registerEmail}
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                />
                <input
                  className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-blue-300"
                  type="password"
                  placeholder="Password..."
                  value={registerPassword}
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}
                />
      
                <button
                  onClick={register}
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
        </Layout>
      );
    }


export default Register;