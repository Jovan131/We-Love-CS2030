import { Tooltip } from 'flowbite-react';
import React from 'react';

type AppProps = {
  residentsList: { name: string, id: string }[];
}

export default function ListOfPeopleWhoPolled({ residentsList }: AppProps) {
  return (
    <Tooltip content={
      residentsList.map((resident) => {
        return (
          <div key={resident.id} className='flex mb-2'>
            <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg className="absolute w-8 h-8 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
            <span className='ml-2 mt-0.5'>{resident.name}</span>
          </div>
        )
      })} placement='right' trigger='click' className='bg-green-500'>
      <span className='font-medium text-base text-blue-600 dark:text-blue-500 select-none'>Click to see who else is going:</span>
    </Tooltip>
  )
}