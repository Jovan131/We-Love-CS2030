import Layout from '@/components/Layout'
import { redirect } from 'next/navigation'
import React from 'react'

export default function Announcements() {
    redirect('/announcements/subscribed')
}



