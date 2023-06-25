import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Calendar from '@/components/Calendar/Calendar';
import Layout from '@/components/Layout';
import { prisma } from "@/app/db";
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { SessionContext } from 'next-auth/react';


function getSlots() {
  return prisma.slot.findMany({
    include: {
      residents: {
        select: { name: true }
      }
    }
  })
}

// change back function to async
export default async function Dashboard() {
  const slots = await getSlots()
  const session = await getServerSession(authOptions)

  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-center font-bold text-4xl justify-center items-center mt-40">Your Schedule for the week:</h1>
        </div>
        <div className="mt-12">
            <Calendar session={session} slots={slots}/>
        </div>
      </div>
    </Layout>
  );
}   