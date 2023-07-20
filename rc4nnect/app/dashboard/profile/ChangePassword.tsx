'use client';

import axios from 'axios';
import { Button, Modal } from 'flowbite-react';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type AppProps = {
  userEmail: string
}

export default function ChangePassword({ userEmail }: AppProps) {
  const handleChangePassword = async (e: any) => {
    e.preventDefault()
    axios.post('/api/changePassword', {
      oldPassword: oldPassword.current,
      confirmOldPassword: confirmOldPassword.current,
      newPassword: newPassword.current,
      confirmNewPassword: confirmNewPassword.current,
      email: userEmail,
    })
    .then(() => {
      toast.success('Password has been changed!')
      props.setOpenModal(undefined)
      router.push('/dashboard/schedule')
    })
    .catch((error) => {
      toast.error(error.response.data)
    })
  }

  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const oldPassword = useRef("")
  const confirmOldPassword = useRef("")
  const newPassword = useRef("")
  const confirmNewPassword = useRef("")

  const router = useRouter()

  return (
    <>
      <button type="button" className="focus:outline-none text-xl text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-5 py-2.5 dark:focus:ring-yellow-900"
      onClick={() => props.setOpenModal('form-elements')}>Change Password</button>
      <Modal show={props.openModal === 'form-elements'} size="4xl" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div>
            <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">Change Your Password:</h3>
            <div className='mb-3'>
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your old password</label>
                <input type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => (oldPassword.current = e.target.value)}/>
              </div>
            </div>
            <div className='mb-3'>
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm your old password</label>
                <input type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => (confirmOldPassword.current = e.target.value)}/>
              </div>
            </div>
            <div className='mb-3'>
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your new password</label>
                <input type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => (newPassword.current = e.target.value)}/>
                </div>
            </div>
            <div className='mb-9'>
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm your new password</label>
                <input type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => (confirmNewPassword.current = e.target.value)}/>
                </div>
            </div>
            <div className="w-full">
              <Button onClick={handleChangePassword}>Change password</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
