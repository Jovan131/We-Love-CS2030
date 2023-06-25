"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';

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
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl">Welcome to rc4nnect...</h1>
      </div>
    </Layout>
  ); // You can return a loading spinner or a message if needed
};

export default Home;