import { prisma } from '../db'
import Layout from '@/components/Layout'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Form from '@/components/Announcements/MakeAnnouncement'

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== 'ADMIN' && session?.user?.role !== 'IG_HEAD') {
    return (
      <Layout>
        <div>Only IG Heads have access to this page.</div>
        <div>{`My role is ${session?.user.role}`}</div>
      </Layout>
    )
  } else {
    const resident = await prisma.resident.findFirst({
      where: {
        email: session?.user.email!
      },
      include: {
        igsHeaded: {
          select: { name: true }
        }
      }
    })

    const igsHeaded = resident?.igsHeaded

    return ( //update disabled input to reflect current IG (or dropdown to select from multiple IGs?)
      <Layout>
        <h1> Make a New Announcement </h1>
        <Form igsHeaded={igsHeaded}/>
      </Layout>
    )}
  }
