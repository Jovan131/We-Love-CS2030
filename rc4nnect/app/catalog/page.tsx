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
            return {...ig, subscribed: ig.members.map((obj) => obj.email).includes(session?.user?.email!)}
        })
    }

    const session = await getServerSession(authOptions)
    const ig = await getIg()
    return (
        <Layout>

            <DynamicCatalog igInfos={ig} email={session?.user?.email!}/>

        </Layout>
      );
}
