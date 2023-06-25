import React, { use } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type AppProps = {
  polled?: any;
  slotID: string,
  email: string,
}

const PollButton: React.FC<AppProps> = ({polled, slotID, email}) => {
  const router = useRouter()

  if (!polled) {
    return <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-0 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
    onClick={() => {
      axios.post('/api/poll', {
        email: email,
        slotID: slotID
      }).then(() => {
        toast.success('Successfully polled!')
        router.refresh()
      })  
    }}>POLL</button>
  } else {
    return <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-0 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
    onClick={() => {
      axios.post('/api/unpoll', {
        email: email,
        slotID: slotID
      }).then(() => {
        toast.success('Successfully unpolled!')
        router.refresh()
      })  
    }}>UNPOLL</button>
  }
}

export default PollButton