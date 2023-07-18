import React, { useState } from 'react'
import { Tooltip } from '@nextui-org/react';
import { BsCheckCircle } from 'react-icons/bs'
import { Button, Modal } from 'flowbite-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Router } from 'next/router';
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

function AcceptButton({ application }: AppProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const router = useRouter()

  return (
    <>
      <Tooltip content="Accept">
        <button onClick={() => {
          props.setOpenModal('pop-up')
        }}>
          <BsCheckCircle style={{color: 'green', width: '24px', height: '24px'}} />
        </button>
      </Tooltip>
      <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Accept this application?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => {
              axios.post('/api/acceptIgHeadApplication', application)
              .then(() => {
                toast.success(`${application.applicantFullName} is now the IG head of ${application.igName}`, {
                  duration: 5000
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

export default AcceptButton