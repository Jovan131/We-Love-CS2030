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
  const [selectedOption, setSelectedOption] = useState('Polled and subscribed')

  function getSlots() {
    if (selectedOption === 'Polled') {
      return slots.filter((slot) => slot.polled)
    } else if (selectedOption === 'Subscribed') {
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
        <DisplayDropdown selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      </div>
    </>
  );
}
        
export default DynamicCalendar   