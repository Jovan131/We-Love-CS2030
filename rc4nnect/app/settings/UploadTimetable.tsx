'use client'

import React, { useState, ChangeEvent } from 'react'
import { Button } from 'flowbite-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type AppProps = {
  residentEmail: string,
}

function UploadTimetable({ residentEmail }: AppProps) {
  const [file, setFile] = useState<File>()

  const router = useRouter()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    let formData = new FormData();
    formData.append("file", file);
    formData.append("residentEmail", residentEmail);
    axios.post('/api/uploadNusmodsTimetable', formData, {
      headers: {
        "Content-type": "multipart/form-data",
      }
    })
    .then(() => {
      toast.success('Your NUSMods timetable has been uploaded!', {
        duration: 4000
      })
      router.push('/dashboard/schedule')
    })
    .catch((error) => {
      toast.error(error.response.data)
    })

  }

  return (
    <>
      <label className="block mb-4 text-3xl font-medium text-white dark:text-white" htmlFor="file_input">Upload NUSMods Timetable</label>
      <p className='mb-2 text-lg'>Upload your NUSMods timetable and see your lessons appear in your dashboard schedule!</p>
      <p className='mb-1 text-sm'>Tip 1: If you cannot see your lessons in dashboard, remember that most lessons only start after Week 1!</p>
      <p className='mb-4 text-sm'>Tip 2: If your timetable has changed after uploading, simply re-download from NUSMods and re-upload below to update your changes!</p>
      <div className='flex gap-3'>
        <input type="file" className="block w-full text-sm min-w-fit text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" 
        onChange={handleFileChange} />
        <Button onClick={handleUploadClick}>Upload</Button>
      </div>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">iCalendar File (.ics) (MAX. 100kb)</p>
    </>
  )
}

export default UploadTimetable