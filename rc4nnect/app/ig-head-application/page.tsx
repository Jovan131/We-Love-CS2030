import Layout from '@/components/Layout'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import ApplicationForm from './ApplicationForm'
import { prisma } from '../db'

export default async function page() {
  const session = await getServerSession(authOptions)

  async function getIGs() {
    const igs = await prisma.iG.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return igs.map((ig) => ({...ig, selectable: (ig.igHeadID ? false : true)}))
  }

  const igs = await getIGs()

  return (
    <Layout>
      <div className='px-5 text-lg'>
        <p className='mt-10'>Use the form below to apply for IG head access rights:</p>
        <ApplicationForm igs={igs} email={session?.user.email!} />
      </div>
    </Layout>
  )
}