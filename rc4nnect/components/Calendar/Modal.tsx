'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SubscribeButton from '@/app/dashboard/SubscribeButton';
import PollButton from '@/app/dashboard/PollButton';

type AppProps = {
  slotInfo: {
      id: string;
      capacity: any; 
      venue: string;
      startDateTime: Date;
      duration: number;
      igName: string;
      residents: { name: string }[];
  },
  isVisible: boolean,
  onClose: any,
  session: any,
}

const Modal: React.FC<AppProps> = ({slotInfo, isVisible, onClose, session}) => {
  const [polled, setPolled] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  if ( !isVisible ) return null;

  const checkIfPolled = async () => {
    await axios.post('/api/getPolled', {
    email: session.user.email,
    slotInfoID: slotInfo.id,
  }).then((response) => {
    if (response.data === null) {
      setPolled(false)
    } else {
      setPolled(true)
    }
  })
  }
  checkIfPolled()

  const checkIfSubscribed = async () => {
    await axios.post('/api/getSubscribed', {
    email: session.user.email,
    slotInfoID: slotInfo.id,
  }).then((response) => {
    if (response.data === null) {
      setSubscribed(false)
    } else {
      setSubscribed(true)
    }
  })
  }
  checkIfSubscribed()

  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper' || e.target.id === 'inner-wrapper') onClose();
  }

  function addHours(date: Date, hours: number) {
    let dummyDate = new Date(date);   // create a new copy of the date object to prevent side effects
    dummyDate.setHours(dummyDate.getHours() + hours);
  
    return dummyDate.toLocaleTimeString('en-SG', {
      hour12: false,
      hour: "2-digit", 
      minute: "2-digit",
    });
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-10'
    id='wrapper' onClick={handleClose}>
      <div className='w-[600px] flex flex-col' id='inner-wrapper'>
        <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
        <div className='bg-slate-200 p-7 rounded text-black text-xl'>
          <p className='font-normal py-3 mb-2'>
            <span className='font-semibold text-5xl'>{slotInfo.igName}</span>
          </p>
          <p className='font-normal py-3'>
            <span className='font-semibold'>Date/Time: </span> 
            {
              `${slotInfo.startDateTime.toLocaleDateString('en-SG')}, 
              ${slotInfo.startDateTime.toLocaleTimeString('en-SG', {
                hour12: false,
                hour: "2-digit", 
                minute: "2-digit",
              })}-${addHours(slotInfo.startDateTime, slotInfo.duration)}H`
            }
          </p>
          <p className='font-normal py-3'>
            <span className='font-semibold'>Venue:</span> {slotInfo.venue}
          </p>
          <p className='font-normal py-3 mb-5'>
            <span className='font-semibold'>Slots availability:</span> {slotInfo.residents.length + "/" + (slotInfo.capacity ?? "~")}
          </p>
          <div className='flex justify-between'>
            <SubscribeButton subscribed={subscribed} slotID={slotInfo.id} email={session.user.email}/>
            <PollButton polled={polled} slotID={slotInfo.id} email={session.user.email}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal