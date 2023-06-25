import React, { use } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type AppProps = {
  subscribed?: any;
  slotID: string,
  email: string,
}

const SubscribeButton: React.FC<AppProps> = ({subscribed, slotID, email}) => {
  const router = useRouter()

  if (!subscribed) {
    return <button type="button" className="text-pink-700 hover:text-white border border-pink-700 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-pink-500 dark:text-pink-500 dark:hover:text-white dark:hover:bg-pink-500 dark:focus:ring-pink-800"
    onClick={() => {
      axios.post('/api/subscribe', {
        email: email,
        slotID: slotID
      }).then(() => {
        toast.success('Subscribed!')
        router.refresh()
      })  
    }}>SUBSCRIBE</button>
  } else {
    return <button type="button" className="text-pink-700 hover:text-white border border-pink-700 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-pink-500 dark:text-pink-500 dark:hover:text-white dark:hover:bg-pink-500 dark:focus:ring-pink-800"
    onClick={() => {
      axios.post('/api/unsubscribe', {
        email: email,
        slotID: slotID
      }).then(() => {
        toast.success('Unsubscribed!')
        router.refresh()
      })  
    }}>UNSUBSCRIBE</button>
  }
}

export default SubscribeButton