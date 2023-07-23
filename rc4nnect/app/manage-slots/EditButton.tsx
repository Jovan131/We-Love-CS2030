import React, { useState, useRef } from 'react'
import { RiEdit2Fill } from 'react-icons/ri'
import { Tooltip } from '@nextui-org/react';
import { Button, Modal } from 'flowbite-react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable'
import Datetime from 'react-datetime'
import { useRouter } from 'next/navigation';
import moment, { Moment } from 'moment';
import 'moment/locale/en-sg'
import axios from 'axios';
import toast from 'react-hot-toast';


type AppProps = {
  slot: {
    id: string;
    capacity: number | null;
    venue: string;
    startDateTime: Date;
    duration: number;
    description: string | null;
    igName: string;
    residents: { name: string }[]
  }
}

function EditButton({ slot }: AppProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const startDateTime = useRef<Moment | string | null>(moment(slot.startDateTime))
  const endDateTime = useRef<Moment | string | null>(moment(slot.startDateTime).add(slot.duration, 'hours'))
  const venue = useRef(slot.venue)
  const description = useRef(slot.description)
  const capacity = useRef(slot.capacity?.toString())

  const router = useRouter()

  function editSlot() {
    axios.post('/api/editSlot', {
      id: slot.id,
      startDateTime: startDateTime.current,
      endDateTime: endDateTime.current,
      venue: venue.current,
      description: description.current,
      capacity: capacity.current,
    })
    .then(() => {
      toast.success('Slot has been updated!')
      props.setOpenModal(undefined)
      router.refresh()
    })
    .catch((error) => {
      toast.error(error.response.data)
    })
  }

  return (
    <>
      <Tooltip content="Edit">
        <button className='text-gray-400 hover:text-gray-500' onClick={() => {
          props.setOpenModal('pop-up')
        }}>
          <RiEdit2Fill style={{ width: '24px', height: '24px' }} />
        </button>
      </Tooltip>
      <Modal className='z-[210]' show={props.openModal === 'pop-up'} size="4xl" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div>
            <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">Edit Slot:</h3>
            <div className='mb-3'>
              <label htmlFor="ig_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IG:</label>
              <input type="text" id="ig_name" className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              defaultValue={slot.igName} disabled />
            </div>
            <div className='mb-60'>
              <div className='flex gap-10'>
                <div className="grow block text-sm font-medium text-gray-900 dark:text-white">
                  <p className='mb-2'>Start date/time:</p>
                  <div className='text-black'>
                    <Datetime 
                      locale='en-SG'
                      isValidDate={(current) => current.isBetween('2023-08-06', '2023-12-09') &&  current.day() !== 0 && current.day() !== 6}
                      initialValue={slot.startDateTime}
                      timeConstraints={{hours: {min: 14, max: 23, step: 1}, minutes: {min: 0, max: 59, step: 15}}}
                      onChange={(e) => (startDateTime.current = e)}
                    />
                  </div>
                </div>
                <div className="grow block text-sm font-medium text-gray-900 dark:text-white">
                  <p className='mb-2'>End date/time:</p>
                  <div className='text-black'>
                    <Datetime 
                      locale='en-SG'
                      isValidDate={(current) => current.isBetween('2023-08-06', '2023-12-09') &&  current.day() !== 0 && current.day() !== 6}
                      initialValue={moment(slot.startDateTime).add(slot.duration, 'hours')}
                      timeConstraints={{hours: {min: 14, max: 23, step: 1}, minutes: {min: 0, max: 59, step: 15}}}
                      onChange={(e) => (endDateTime.current = e)}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Slots must start/end on the same day. Maximum slot duration is 3 hours. Slot timing must be between 1400H-2345H.</p>
            </div>
            <div className='mb-3'>
              <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Venue:</div>
              <CreatableSelect
                classNames={{
                  menuList: () => 'text-black text-sm',
                  control: () => 'text-black',
                  valueContainer: () => 'text-sm',
                  groupHeading: () => 'text-xl'
                }}  
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderRadius: '0.5rem',
                    height: '41.6px'  // need to use styles to override default CSS styling
                  }),
                  groupHeading: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: '1.25rem',
                  })
                }}   
                options={[
                  {
                    label: 'Within RC4',
                    options: [
                      { label: 'MPSH', value: 'MPSH' },
                      { label: 'SR1', value: 'SR1' },
                      { label: 'SR2', value: 'SR2' },
                      { label: 'SR3', value: 'SR3' },
                      { label: 'SR4', value: 'SR4' },
                      { label: 'SR5', value: 'SR5' },
                      { label: 'SR6', value: 'SR6' },
                    ]
                  },
                  { 
                    label: 'Outside of RC4', 
                    options: [{ label: 'USC', value: 'USC' }]
                  }
                ]}
                className="basic-single"
                maxMenuHeight={150}
                formatCreateLabel={(inputValue) => (`Set venue as: "${inputValue}"`)}
                defaultValue={{ label: slot.venue, value: slot.venue }}
                onChange={(e) => (venue.current = e?.value)}
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">If your venue is not listed above, you may input it manually.</p>
            </div>
            <div className='mb-3'>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{'Description (optional)'}</label>
              <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={slot.description ?? ""}
              onChange={(e) => (description.current = e.target.value)}></textarea>
            </div>
            <div className='mb-9'>
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacity</label>
                <input type="number" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={slot.capacity ?? ""} 
                onChange={(e) => (capacity.current = e.target.value)} />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Input a number between 1-99.</p>
            </div>
            <div className="w-full">
              <Button onClick={editSlot}>Edit slot</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditButton