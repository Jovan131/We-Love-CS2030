import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Calendar from '@/app/dashboard/Calendar';
import Layout from '@/components/Layout';
import { prisma } from "@/app/db";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'



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

  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-center font-bold text-4xl">Your Schedule for the week:</h1>
        </div>
        <div >
            <Calendar slots={slots}/>
        </div>
      </div>
    </Layout>
  );
}   