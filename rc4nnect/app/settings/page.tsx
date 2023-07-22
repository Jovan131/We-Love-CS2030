import Layout from '@/components/Layout'
import React from 'react'
import UploadTimetable from './UploadTimetable'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function settings() {
  const session = await getServerSession(authOptions)

  return (
    <Layout>
      <UploadTimetable residentEmail={session?.user.email}/>
    </Layout>
  )
}