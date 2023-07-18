'use client'

import Layout from '@/components/Layout'
import { getServerSession } from 'next-auth'
import React, { useRef } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Select from 'react-select';
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { error } from 'console'


type AppProps = {
  igs: {
    id: string;
    name: string;
    category: string;
    numOfSessionsPerWeek: number;
    igHeadID: string | null;
    selectable: boolean
  }[],
  email: string
}

export default function ApplicationForm({ igs, email }: AppProps) {
  function submit() {
    axios.post('/api/submitIgHeadApplication', {
      fullName: fullName.current,
      teleHandle: teleHandle.current,
      igAppliedFor: igAppliedFor.current,
      email: email
    })
    .then(() => {
      toast.success('Application successful! You will be notified of the outcome after the admin reviews your application.',
      {duration: 10000})
      router.push('/dashboard/schedule')
    })
    .catch((error) => {
      toast.error(error.response.data, {duration: 6000})
    })
  }

  const fullName = useRef("")
  const teleHandle = useRef("")
  const igAppliedFor = useRef("")
  const router = useRouter()

  return (
    <div className='mt-20'>
      <div className="mb-6">
        <label htmlFor="full-name" className="block mb-2 text-sm font-medium text-white dark:text-white">Full Name</label>
        <input id="full-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        onChange={(e) => (fullName.current = e.target.value)} />
      </div>
      <div className="mb-6">
        <label htmlFor="tele-handle" className="block mb-2 text-sm font-medium text-white dark:text-white">{`Telegram Handle (include the @)`}</label>
        <input id="tele-handle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="@example123" 
        onChange={(e) => (teleHandle.current = e.target.value)} />
      </div>
      <div className="mb-28">
        <div className="block mb-2 text-sm font-medium text-white dark:text-white">Select which IG you are applying for:</div>
        <Select
          classNames={{
            menuList: () => 'text-black text-sm',
            control: () => 'text-black',
            valueContainer: () => 'text-sm',
          }}  
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderRadius: '0.5rem',
              height: '41.6px'  // need to use styles to override default CSS styling
          })}}   
          options={igs.map((ig) => ({value: ig.name, label: ig.name, selectable: ig.selectable}))}
          className="basic-single"
          isOptionDisabled={(option) => !option.selectable}  // if the IG already has an IG head, then disable the option
          maxMenuHeight={150}
          onChange={(e) => (igAppliedFor.current = e!.value)}
        />
      </div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={submit}>Submit</button>
    </div>
  )
}