'use client'

import Calendar from '@/components/Calendar/Calendar';
import React, { useState } from 'react';
import FilterByCategory from './FilterByCategory';
import FilterByVenue from './FilterByVenue';
import FilterOnlyOpenSlots from './FilterOnlyOpenSlots';
import weekInfo from '../../components/Calendar/WeekInfo';
import LeftArrow from '../../components/Calendar/LeftArrow';
import RightArrow from '../../components/Calendar/RightArrow';

type AppProps = {
  slots: {
    id: string;
    capacity: any; 
    venue: string;
    startDateTime: Date;
    duration: number;
    igName: string;
    residents: { name: string, id: string }[];
    ig: { category: string }
    polled: boolean,
    subscribed: boolean,
  }[];
  session: any
}

export default function FilterableCalendar({ session, slots }: AppProps) {
  const [displayedCategories, setDisplayedCategories] = useState(['Arts', 'Cogpods', 'Community Service', 'Lifestyle', 'Sports'])
  const [displayedVenues, setDisplayedVenues] = useState(['MPSH', 'SR1-SR6', 'USC', 'Others'])
  const [displayOnlyOpenSlots, setDisplayOnlyOpenSlots] = useState(false)
  const [weekIndex, setWeekIndex] = useState(0)

  function getSlots() {
    const filteredSlots = slots.filter((slot) => displayedCategories.includes(slot.ig.category))
    .filter((slot) => {
      if (slot.venue === 'MPSH' || slot.venue === 'USC') {
        return displayedVenues.includes(slot.venue)
      } else if (slot.venue.startsWith('SR')) {
        return displayedVenues.includes('SR1-SR6')
      } else {
        return displayedVenues.includes('Others')
      }
    })
    .filter((slot) => (slot.startDateTime >= weekInfo[weekIndex].startDate && slot.startDateTime <= weekInfo[weekIndex].endDate))

    if (displayOnlyOpenSlots) {
      return filteredSlots.filter((slot) => slot.residents.length <= slot.capacity)
    } else {
      return filteredSlots
    }
  }

  return (
    <>
      <div className='flex justify-center items-center mt-14'>
        <LeftArrow weekIndex={weekIndex} setWeekIndex={setWeekIndex}/>
        <h1 className="text-center font-bold text-4xl select-none">{weekInfo[weekIndex].weekName}: All IGs</h1>
        <RightArrow weekIndex={weekIndex} setWeekIndex={setWeekIndex}/>
      </div>
      <div className="mt-12">
        <Calendar session={session} slots={getSlots()}/>
      </div>
      <div className='flex justify-between pt-5 gap-4 ml-[50px]'>
        <FilterOnlyOpenSlots displayOnlyOpenSlots={displayOnlyOpenSlots} setDisplayOnlyOpenSlots={setDisplayOnlyOpenSlots}/>
        <div className='flex gap-5'>
          <FilterByVenue displayedVenues={displayedVenues} setDisplayedVenues={setDisplayedVenues}/>
          <FilterByCategory displayedCategories={displayedCategories} setDisplayedCategories={setDisplayedCategories}/>
        </div>
      </div>
    </>
  );
}