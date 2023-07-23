import React from 'react'
import Layout from '@/components/Layout';
import DynamicCatalog from '@/components/Catalog/DynamicCatalog';
import Filter from '@/components/Catalog/Filter';
import { prisma } from '../db';
import { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';



export default async function page() {
    async function getIg() {
        const igs = await prisma.iG.findMany({
            include: {
                members: {
                    select: { email: true }
                }
            }
        })
        return igs.map((ig) => {
            return {...ig, subscribed: ig.members.map((obj) => obj.email).includes(session?.user?.email!)
            }
        }).sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            return nameA.localeCompare(nameB); // Use localeCompare to sort in alphabetical order
          });
    }

    const session = await getServerSession(authOptions)
    const ig = await getIg()
    return (
        <Layout>
            <h1 className="text-4xl font-bold ml-4 text-black dark:text-white"> IG Catalog </h1>
            <DynamicCatalog igInfos={ig} email={session?.user?.email!}/>

        </Layout>
      );
}
