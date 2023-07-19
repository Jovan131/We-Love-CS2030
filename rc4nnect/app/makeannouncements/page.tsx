'use client'

import { prisma } from '../db'
import Layout from '@/components/Layout'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default async function page() {
  const session = await getServerSession(authOptions);

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

  const [data, setData] = useState({
    iG: igsHeaded,
    title: '',
    content: ''
  })

  const announce = async (e: any) => {
    e.preventDefault()
    axios.post('/api/announcements', data)
    .then(() => {
      toast.success('Announcement posted successfully!')
    })
    .catch((error) => {
      toast.error(error.response.data)
    }
    )
  }

  return ( //update disabled input to reflect current IG (or dropdown to select from multiple IGs?)
    <Layout>
      <h1> Make a New Announcement </h1>
      <form onSubmit={announce}> 
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Interest Group</label>
    <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="" disabled /> 
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
    <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required 
    value={data.title}
    onChange={(e) => setData({ ...data, title: e.target.value })}/>
  </div>
  <div className="mb-6">
  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Announcement Details</label>
    <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."
    value={data.title}
    onChange={(e) => setData({ ...data, title: e.target.value })}/>
  </div>
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publish announcement</button>
</form>
    </Layout>
  )}
