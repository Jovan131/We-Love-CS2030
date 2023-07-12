import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

type AppProps = {
  weekIndex: number,
  setWeekIndex: any
}

export default function RightArrow({ weekIndex, setWeekIndex }: AppProps) {
  if (weekIndex === 17) {
    return (
      <button disabled>
        <IoIosArrowForward className='ml-7 w-8 h-8 text-gray-600'/>
      </button>
    )
  } else {
    return (
      <button onClick={() => setWeekIndex(weekIndex + 1)}>
        <IoIosArrowForward className='ml-7 w-8 h-8 text-rose-600'/>
      </button>
    )
  }
}