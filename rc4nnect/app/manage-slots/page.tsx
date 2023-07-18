import Layout from '@/components/Layout'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function page() {
  const session = await getServerSession(authOptions)

  if (session?.user?.role !== 'ADMIN' && session?.user?.role !== 'IG_HEAD') {
    return (
      <Layout>
        <div>Only IG Heads have access to this page.</div>
        <div>{`My role is ${session?.user.role}`}</div>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <div>You can create new slots here, as well as modify exisiting slots.</div>
        <div>{`My role is ${session?.user.role}`}</div>
      </Layout>
    )
  }
}