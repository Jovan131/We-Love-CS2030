import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type AppProps = {
  props: any,
  igName: string,
  subscribed: boolean,
  email: string
}

export default function IGSubscribeButtonModal({ props, igName, subscribed, email }: AppProps) {
  const router = useRouter()

  return (
    <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {subscribed ? 'Unsubscribe' : 'Subscribe'} to {igName}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => {
              axios.post(subscribed ? '/api/unsubscribeViaIG' : '/api/subscribeViaIG', {
                email: email,
                igName: igName
              }).then(() => {
                toast.success(`${subscribed ? 'Unsubscribed' : 'Subscribed'} to ${igName}!`, {       
                  duration: 3000
                })
                router.refresh()
              }) 
              props.setOpenModal(undefined)
            }}>
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}