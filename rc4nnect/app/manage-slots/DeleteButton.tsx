import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Button, Modal } from 'flowbite-react';
import { Tooltip } from '@nextui-org/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type AppProps = {
  slotId: string
}

function DeleteButton({ slotId }: AppProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const router = useRouter()

  return (
    <>
      <Tooltip content="Delete">
        <button className='text-red-600 hover:text-red-700' onClick={() => {
          props.setOpenModal('pop-up')
        }}>
          <RiDeleteBin6Line style={{ width: '24px', height: '24px' }} />
        </button>
      </Tooltip>
      <Modal className='z-[210]' show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Delete this slot?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => {
                axios.post('/api/deleteSlot', {slotId: slotId})
                .then(() => {
                  toast.success('Slot has been deleted', {
                    duration: 3000
                  })
                  router.refresh()
                })
                .catch((error) => {
                  toast.error(error.response.data)
                })
                props.setOpenModal(undefined)
              }}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>  
  )
}

export default DeleteButton