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


// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
// import { LoginButton, LogoutButton } from "./auth";

// export default async function Home() {
//   const session = await getServerSession(authOptions)

//   return (
//     <main>
//       <LoginButton />
//       <LogoutButton />
//       <h2>Server session</h2>
//       <pre>{JSON.stringify(session)}</pre>
//     </main>
//   )
// }