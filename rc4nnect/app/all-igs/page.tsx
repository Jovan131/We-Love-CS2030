import React from 'react';
import 'tailwindcss/tailwind.css';
import Calendar from '@/components/Calendar/Calendar';
import Layout from '@/components/Layout';
import { prisma } from "@/app/db";
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';


function getSlots() {
  return prisma.slot.findMany({
    include: {
      residents: {
        select: { name: true, id: true }
      }
    }
  })
}

// change back function to async
export default async function Dashboard() {
  const slots = await getSlots()
  const session = await getServerSession(authOptions)

  return (
    <Layout routeIndex={1}>
      <div>
        <div>
          <h1 className="text-center font-bold text-4xl justify-center items-center mt-40">Week 1: All IGs</h1>
        </div>
        <div className="mt-12">
            <Calendar session={session} slots={slots}/>
        </div>
      </div>
    </Layout>
  );
}   