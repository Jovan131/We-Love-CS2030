'use client'

import Calendar from '@/components/Calendar/Calendar';
import React, { useState } from 'react';
import DisplayDropdown from './DisplayDropdown';

type AppProps = {
  slots: {
    id: string;
    capacity: any; 
    venue: string;
    startDateTime: Date;
    duration: number;
    igName: string;
    residents: { name: string, id: string }[];
    polled: boolean,
    subscribed: boolean,
  }[];
  session: any
}

export default function DynamicCalendar({ session, slots }: AppProps) {
  const [displayType, setDisplayType] = useState('both')

  function changeDisplayType(newDisplayType: string) {
    setDisplayType(newDisplayType)
  }

  function getSlots() {
    if (displayType === 'polled') {
      return slots.filter((slot) => slot.polled)
    } else if (displayType === 'subscribed') {
      return slots.filter((slot) => slot.subscribed)
    } else {
      return slots
    }
  }

  return (
    <>
      <div className="mt-12">
        <Calendar session={session} slots={getSlots()}/>
      </div>
      <div className='flex justify-end pt-5'>
        <DisplayDropdown changeDisplayType={changeDisplayType}/>
      </div>
    </>
  );
}


