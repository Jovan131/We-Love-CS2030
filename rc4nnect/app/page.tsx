"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Home: React.FC = () => {
  const router = useRouter();
  const session = useSession()

  useEffect(() => {
    if (session?.status == 'authenticated') {
      router.push('/dashboard');
    }
    else {
      router.push('/login');
    }
  })

  return (

      <div className="flex items-center justify-center h-screen bg-slate-900">
        <h1 className="text-2xl text-white">Welcome to rc4nnect...</h1>
      </div>

  ); // You can return a loading spinner or a message if needed
};

export default Home;