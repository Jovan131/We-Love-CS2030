import { prisma } from "@/app/db"
import DynamicView from "@/components/Announcements/DynamicView"
import React from 'react'
import Layout from '@/components/Layout';
import DynamicCatalog from '@/components/Catalog/DynamicCatalog';
import Filter from '@/components/Catalog/Filter';
import { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

export default async function page() {
    const session = await getServerSession(authOptions);

    const subscribedAnnouncements = await prisma.announcement.findMany({
        where: {
          ig: {
            members: {
              some: {
                email: session?.user?.email!
              }
            }
          }
        },
        include: {
          ig: {
            include: {
              members: {
                select: { email: true }
              }
            }
          }
        }
      });

    return (
        <Layout>
            <DynamicView announcements={subscribedAnnouncements.map((ig) => {
      return {...ig, subscribed: true}
    })} email={session?.user?.email!}/>

        </Layout>
    );
}