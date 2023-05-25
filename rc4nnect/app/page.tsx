"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return null; // You can return a loading spinner or a message if needed
};

export default Home;
