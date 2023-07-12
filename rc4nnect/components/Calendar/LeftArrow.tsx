import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

type AppProps = {
  weekIndex: number,
  setWeekIndex: any
}

export default function LeftArrow({ weekIndex, setWeekIndex }: AppProps) {
  if (weekIndex === 0) {
    return (
      <button disabled>
        <IoIosArrowBack className='mr-7 w-8 h-8 text-gray-600'/>
      </button>
    )
  } else {
    return (
      <button onClick={() => setWeekIndex(weekIndex - 1)}>
        <IoIosArrowBack className='mr-7 w-8 h-8 text-rose-600'/>
      </button>
    )
  }
}