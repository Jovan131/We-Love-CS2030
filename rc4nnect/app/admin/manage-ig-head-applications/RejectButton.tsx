import React, { useState } from 'react'
import { Tooltip } from '@nextui-org/react';
import { BsXCircle } from 'react-icons/bs'
import { Button, Modal } from 'flowbite-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type AppProps = {
  application: {
    id: string;
    applicantFullName: string;
    applicantTeleHandle: string;
    igName: string;
    applicantEmail: string;
  }
}

function RejectButton({ application }: AppProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const router = useRouter()

  return (
    <>
      <Tooltip content="Reject">
        <button onClick={() => {
          props.setOpenModal('pop-up')
        }}>
          <BsXCircle style={{color: 'red', width: '24px', height: '24px'}} />
        </button>
      </Tooltip>
      <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Reject this application?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => {
              axios.post('/api/rejectIgHeadApplication', application)
              .then(() => {
                toast.success(`${application.applicantFullName}'s application for ${application.igName} IG head has been rejected`, {
                  duration: 6000
                })
                router.refresh()
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

export default RejectButton