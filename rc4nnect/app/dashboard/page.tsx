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
        <h1 className="text-center font-bold text-4xl translate-y-10">Your Schedule for the week:</h1>
      </div>
      <div className="fixed top-1/3 left-10 w-11/12">
          <Calendar slots={slots}/>
      </div>
    </Layout>
  );
}   