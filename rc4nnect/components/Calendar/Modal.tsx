import React from 'react';

type AppProps = {
  slotInfo: {
      id: string;
      capacity: any; 
      venue: string;
      startDateTime: Date;
      duration: number;
      igName: string;
      residents: { name: string }[];
  },
  isVisible: boolean,
  onClose: any,
}

const Modal: React.FC<AppProps> = ({slotInfo, isVisible, onClose}) => {
  if ( !isVisible ) return null;

  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper' || e.target.id === 'inner-wrapper') onClose();
  }

  function addHours(date: Date, hours: number) {
    let dummyDate = new Date(date);   // create a new copy of the date object to prevent side effects
    dummyDate.setHours(dummyDate.getHours() + hours);
  
    return dummyDate.toLocaleTimeString('en-SG', {
      hour12: false,
      hour: "2-digit", 
      minute: "2-digit",
    });
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-10'
    id='wrapper' onClick={handleClose}>
      <div className='w-[600px] flex flex-col' id='inner-wrapper'>
        <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
        <div className='bg-slate-200 p-7 rounded text-black text-xl'>
          <p className='font-normal py-3 mb-2'>
            <span className='font-semibold text-5xl'>{slotInfo.igName}</span>
          </p>
          <p className='font-normal py-3'>
            <span className='font-semibold'>Date/Time: </span> 
            {
              `${slotInfo.startDateTime.toLocaleDateString('en-SG')}, 
              ${slotInfo.startDateTime.toLocaleTimeString('en-SG', {
                hour12: false,
                hour: "2-digit", 
                minute: "2-digit",
              })}-${addHours(slotInfo.startDateTime, slotInfo.duration)}H`
            }
          </p>
          <p className='font-normal py-3'>
            <span className='font-semibold'>Venue:</span> {slotInfo.venue}
          </p>
          <p className='font-normal py-3 mb-5'>
            <span className='font-semibold'>Slots availability:</span> {slotInfo.residents.length + "/" + (slotInfo.capacity ?? "~")}
          </p>
          <div className='flex justify-between'>
            <button type="button" className="text-pink-700 hover:text-white border border-pink-700 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-pink-500 dark:text-pink-500 dark:hover:text-white dark:hover:bg-pink-500 dark:focus:ring-pink-800">SUBSCRIBE</button>
            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-0 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">POLL</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal