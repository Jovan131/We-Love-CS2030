"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import type { User } from "firebase/auth";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
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

  return (
    <div className="App flex items-center justify-center h-screen">
      <div className="text-center">
        <h3 className="mb-4">Login</h3>
        <form onSubmit={login}>
          <input
            className="w-60 h-10 mb-2 p-2 border border-gray-300 rounded text-black"
            placeholder="Email..."
            value={loginEmail}
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            className="w-60 h-10 mb-2 p-2 border border-gray-300 rounded text-gray-700"
            type="password"
            placeholder="Password..."
            value={loginPassword}
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />

          <button
            type="submit"
            className="w-32 h-10 bg-green-500 text-white rounded cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

