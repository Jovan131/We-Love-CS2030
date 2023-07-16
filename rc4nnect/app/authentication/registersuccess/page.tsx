import React from 'react'
import NoSidebarLayout from '../../../components/NoSidebarLayout'

export default function page() {
  return (
    <NoSidebarLayout>
        <div className="text-center justify-center">
            <h1>Please check your email to activate your account. The link will expire in 24 hours</h1>
        </div>
    </NoSidebarLayout>
  )
}