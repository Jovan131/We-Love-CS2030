import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Layout from '@/components/Layout';
import { prisma } from "@/app/db";
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Calendar from '@/components/Calendar/Calendar';
import DynamicCalendar from './DynamicCalendar';

// Only find the slots that contain our current user OR slot.ig.members contains our current user
async function getSlots(session: Session) {
  const subscribedIgs = await prisma.iG.findMany({
    where: {
      members: {
        some: {
          email: session.user?.email!
        }
      }
    }
  })

  const slots = await prisma.slot.findMany({
    where: {
      OR: [
        {
          residents: {
            some: {
              email: session.user?.email!
            }
          }
        },
        {
          igName: {
            in: subscribedIgs.map(ig => ig.name)
          }
        }
      ],
    },
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

// change back function to async
export default async function Dashboard() {

  const session = await getServerSession(authOptions)
  const slots = await getSlots(session!)

  return (
    <Layout routeIndex={0}>
      <div>
        <div>
          <h1 className="text-center font-bold text-4xl justify-center items-center mt-40">
            {`Hi ${session?.user?.name}! Here is your Schedule for Week 1:`}
          </h1>
        </div>
        <DynamicCalendar session={session} slots={slots} />
      </div>
    </Layout>
  );
}   