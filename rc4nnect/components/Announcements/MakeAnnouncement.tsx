'use client'

import { IG } from '@prisma/client'
import React from 'react'
import Select from 'react-select';
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';

type AppProps = {
    igsHeaded: {
        name: string,
    }[] | undefined
}


const Form: React.FC<AppProps> = ({igsHeaded}) => {
  
    const [data, setData] = useState({
        iG: '',
        title: '',
        content: ''
      })
  
    const announce = async (e: any) => {
      e.preventDefault()
      axios.post('/api/announcements', data)
      .then(() => {
        toast.success('Announcement posted successfully!')
      })
      .catch((error: any) => {
        toast.error(error.response.data)
      }
      )
    }

    if (igsHeaded!.length == 1) {
      return (

        <form onSubmit={announce}> 
          <div className="mb-6 mt-6">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-black dark:text-white">Interest Group</label>
            <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={igsHeaded![0].name} disabled /> 
          </div>
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-black dark:text-white">Title</label>
            <input type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:shadow-sm-light" placeholder="Title"required 
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}/>
          </div>
          <div className="mb-6">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">Announcement Details</label>
            <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Leave a comment..."
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}/>
          </div>
          
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publish announcement</button>
        </form>
        )
    
    } else {
      return (

      <form onSubmit={announce}> 
        <div className="mb-6 mt-6">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-black dark:text-white">Interest Group</label>
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
                  options={igsHeaded!.map((ig) => ({value: ig.name, label: ig.name}))}
                  className="basic-single"
                  placeholder="Interest Group"
                  maxMenuHeight={150}
                  onChange={(e) => setData({ ...data, iG: e!.value })}
                />
        </div>
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-black dark:text-white">Title</label>
          <input type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:shadow-sm-light" placeholder="Title"required 
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}/>
        </div>
        <div className="mb-6">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-black dark:text-white">Announcement Details</label>
          <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Leave a comment..."
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}/>
        </div>
        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publish announcement</button>
      </form>
      )

    }
}

export default Form;
