'use client'

import React from 'react';
import IGSubscribeButton from './IGSubscribeButton';


type AppProps = {
  igInfo: {
    id: string,
    name: string,
    category: string,
    numOfSessionsPerWeek: number,
    members: {email: string}[],
    subscribed: boolean,
  },
  isVisible: boolean,
  onClose: any,
  email: string,
}

const Modal: React.FC<AppProps> = ({igInfo, isVisible, onClose, email}) => {
  if ( !isVisible ) return null;

  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper' || e.target.id === 'inner-wrapper') onClose();
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-30'
    id='wrapper' onClick={handleClose}>
      <div className='w-[600px] flex flex-col' id='inner-wrapper'>
        <button className='text-white border-black shadow-sm font-bold text-xl place-self-end hover:text-black' onClick={() => onClose()}>X</button>
        <div className='bg-slate-200 p-7 rounded text-black text-xl'>
          <p className='font-normal py-3 mb-2'>
            <span className='font-semibold text-5xl'>{igInfo.name}</span>
          </p>
          
          <p className='font-normal py-3'>
            <span className='font-semibold'>Category: </span> {igInfo.category}
          </p>
          <div className='font-normal py-3 mb-8 flex justify-between'>
            <div>
              <span className='font-semibold'>Sessions per week: </span> 
              {igInfo.numOfSessionsPerWeek}
            </div>
          </div>
          <div className='flex justify-between'>
            <IGSubscribeButton subscribed={igInfo.subscribed} igName={igInfo.name} email={email}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal


