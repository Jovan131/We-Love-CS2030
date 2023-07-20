import Layout from '@/components/Layout'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import ManageSlotsTable from './ManageSlotsTable'
import { prisma } from '../db'

export default async function page() {
  const session = await getServerSession(authOptions)

  if (session?.user?.role !== 'IG_HEAD') {
    return (
      <Layout>
        <div>Only IG Heads have access to this page.</div>
        <div>{`My role is ${session?.user.role}`}</div>
      </Layout>
    )
  } else {
    const igsHeaded = await prisma.iG.findMany({
      where: {
        igHeadID: session.user.id
      }
    })

    const slots = await prisma.slot.findMany({
      where: {
        igName: { in: igsHeaded.map((ig) => ig.name) }
      },
      include: {
        residents: {
          select: { name: true }
        }
      }
    })

    return (
      <Layout>
        <ManageSlotsTable slots={slots} igsHeaded={igsHeaded.map((ig) => ig.name)} />
      </Layout>
    )
  }
}