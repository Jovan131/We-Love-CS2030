'use client'

import Calendar from '@/components/Calendar/Calendar';
import DisplayDropdown from '@/components/DisplayDropdown';
import React, { useState } from 'react';

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

const DynamicCalendar: React.FC<AppProps> = ({session, slots}) => {
  const [displayType, setDisplayType] = useState('Polled and subscribed')

  function getSlots() {
    if (displayType === 'Polled') {
      return slots.filter((slot) => slot.polled)
    } else if (displayType === 'Subscribed') {
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
      <div>
        <DisplayDropdown selectedOption={displayType} setSelectedOption={setDisplayType}/>
      </div>
    </>
  );
}
        
export default DynamicCalendar   