import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import IGSubscribeButtonModal from './IGSubscribeButtonModal';

type AppProps = {
  subscribed: boolean,
  igName: string,
  email: string
}

export default function IGSubscribeButton({ subscribed, igName, email }: AppProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
    
  if (subscribed) {
    return (
      <>
        <div className='flex my-5'>
          <button type="button" className="text-white bg-pink-800 hover:bg-pink-900 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 select-none"
          onClick={() => props.setOpenModal('pop-up')}>
            Unsubscribe
          </button>
        </div>
        <IGSubscribeButtonModal props={props} igName={igName} subscribed={subscribed} email={email} />
      </>
    )
  } else {
    return (
      <>
        <div className='flex my-5'>
          <button type="button" className="text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 select-none"
          onClick={() => props.setOpenModal('pop-up')}>
            Subscribe
          </button>
        </div> 
        <IGSubscribeButtonModal props={props} igName={igName} subscribed={subscribed} email={email} />
      </>
    )
  }
}