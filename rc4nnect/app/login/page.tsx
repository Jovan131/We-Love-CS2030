"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import type { User } from "firebase/auth";
import Layout from '@/components/Layout';
import Link from "next/link";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const login = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const user = userCredential.user;
      console.log(user);
      router.push("/dashboard"); // Redirect to /dashboard on successful login
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <Layout>
      <div className="App flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="mb-10 mt-0 text-4xl font-medium leading-tight text-primary">Welcome to rc4nnect</h1>
          <form onSubmit={login}>
            <input
              className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
              placeholder="Email..."
              value={loginEmail}
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
            <input
              className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
              type="password"
              placeholder="Password..."
              value={loginPassword}
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />

            <button
              onClick={login}
              type="submit"
              className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                  <h2 className='relative z-20'>
                      LOGIN
                  </h2>
            </button>
          </form>
          <div className="mt-4">
            <button onClick={handleRegisterClick} className="text-white underline">
              Don't have an account? Register here
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;

