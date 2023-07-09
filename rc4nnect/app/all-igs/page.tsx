import React from 'react';
import 'tailwindcss/tailwind.css';
import Calendar from '@/components/Calendar/Calendar';
import Layout from '@/components/Layout';
import { prisma } from "@/app/db";
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';


// change back function to async
export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  const slots = await getSlots()

  async function getSlots() {
    const slots = await prisma.slot.findMany({
      include: {
        residents: {
          select: { name: true, id: true }
        }
      }
    })

    const slotsWithUpdatedProperties = slots.map(async (slot) => {
        const polled = await prisma.resident.findFirst({
          where: {
            AND: [
              {
                email: {
                  equals: session?.user?.email!
                },
              },
              {
                slots: {
                  some: {
                    id: slot.id
                  }
                }
              }
            ]
          }
        })
    
        const subscribed = await prisma.resident.findFirst({
          where: {
            AND: [
              {
                email: {
                  equals: session?.user?.email!
                },
              },
              {
                igs: {
                  some: {
                    name: slot?.igName
                  }
                }
              }
            ]
          }
        })
    
        if (polled && subscribed) {
          return { ...slot, polled: true, subscribed: true }
        } else if (polled && !subscribed) {
          return { ...slot, polled: true, subscribed: false }
        } else if (!polled && subscribed) {
          return { ...slot, polled: false, subscribed: true }
        } else {
          return { ...slot, polled: false, subscribed: false }
        }
    })
      
    return await Promise.all(slotsWithUpdatedProperties)
  }

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