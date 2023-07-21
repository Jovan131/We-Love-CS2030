import { prisma } from '@/app/db';
import React from 'react';
import { Session, getServerSession } from 'next-auth';
import 'tailwindcss/tailwind.css';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Layout from '@/components/Layout';
import DynamicCatalog from '@/components/ManageIG/DynamicCatalog';


export default async function SubscribedIgs() {
  const session = await getServerSession(authOptions)

  const subscribedIgs = await prisma.iG.findMany({
    where: {
      members: {
        some: {
          email: session?.user?.email!
        }
      }
    },
    include: {
      members: {
        select: { email: true }
      }
    }
  })

  return (
    <DynamicCatalog igInfos={subscribedIgs.map((ig) => {
      return {...ig, subscribed: true}
    })} email={session?.user?.email!}/>
  );
}   