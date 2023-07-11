'use client'

import React from 'react';
import SubscribeButton from '../Popup/SubscribeButton';
import PollButton from '../Popup/PollButton';

type AppProps = {
  slotInfo: {
      id: string;
      capacity: any; 
      venue: string;
      startDateTime: Date;
      duration: number;
      igName: string;
      residents: { name: string }[];
      polled: boolean,
      subscribed: boolean,  
  },
  isVisible: boolean,
  onClose: any,
  session: any,
}

const Modal: React.FC<AppProps> = ({slotInfo, isVisible, onClose, session}) => {
  if ( !isVisible ) return null;

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
    <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-30'
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
            <SubscribeButton subscribed={slotInfo.subscribed} slotID={slotInfo.id} email={session.user.email}/>
            <PollButton polled={slotInfo.polled} slotID={slotInfo.id} email={session.user.email}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal


