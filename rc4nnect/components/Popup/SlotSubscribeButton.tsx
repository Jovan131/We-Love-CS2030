import React, { use } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type AppProps = {
  subscribed?: any;
  slotID: string,
  email: string,
}

const SlotSubscribeButton: React.FC<AppProps> = ({subscribed, slotID, email}) => {
  const router = useRouter()

  if (!subscribed) {
    return <button type="button" className="text-pink-700 hover:text-white border border-pink-700 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-pink-500 dark:text-pink-500 dark:hover:text-white dark:hover:bg-pink-500 dark:focus:ring-pink-800"
    onClick={() => {
      axios.post('/api/subscribeViaSlot', {
        email: email,
        slotID: slotID
      }).then((response) => {
        toast.success(`Subscribed to "${response.data}" !`, {       //response.data is the igName of the slot
          duration: 3000   //increase the time of the notification on-screen
        }) 
        router.refresh()
      })  
    }}>SUBSCRIBE</button>
  } else {
    return <button type="button" className="text-pink-700 hover:text-white border border-pink-700 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-pink-500 dark:text-pink-500 dark:hover:text-white dark:hover:bg-pink-500 dark:focus:ring-pink-800"
    onClick={() => {
      axios.post('/api/unsubscribe', {
        email: email,
        slotID: slotID
      }).then((response) => {
        toast.success(`Unsubscribed from "${response.data}" !`, {       //response.data is the igName of the slot
          duration: 3000
        }) 
        router.refresh()
      })  
    }}>UNSUBSCRIBE</button>
  }
}

export default SlotSubscribeButton