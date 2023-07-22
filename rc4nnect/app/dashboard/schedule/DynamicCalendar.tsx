'use client'

import Calendar from '@/components/Calendar/Calendar';
import React, { useState } from 'react';
import DisplayDropdown from './DisplayDropdown';
import LeftArrow from '@/components/Calendar/LeftArrow';
import RightArrow from '@/components/Calendar/RightArrow';
import weekInfo from '@/components/Calendar/WeekInfo';
import NusmodsToggle from './NusmodsToggle';

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
  lessons: {
    id: string;
    startDateTime: Date;
    duration: number;
    name: string;
    location: string | null;
    residentEmail: string;
  }[];
  session: any
}

export default function DynamicCalendar({ session, slots, lessons }: AppProps) {
  const [displayType, setDisplayType] = useState('both')
  const [weekIndex, setWeekIndex] = useState(0)
  const [showNusmodsLessons, setShowNusmodsLessons] = useState(true)

  function changeDisplayType(newDisplayType: string) {
    setDisplayType(newDisplayType)
  }

  function getSlots() {
    const slotsFilteredByWeek = slots.filter((slot) => (slot.startDateTime >= weekInfo[weekIndex].startDate && slot.startDateTime <= weekInfo[weekIndex].endDate))

    if (displayType === 'polled') {
      return slotsFilteredByWeek.filter((slot) => slot.polled)
    } else if (displayType === 'subscribed') {
      return slotsFilteredByWeek.filter((slot) => slot.subscribed)
    } else {
      return slotsFilteredByWeek
    }
  }

  function getLessons() {
    if (showNusmodsLessons) {
      return lessons.filter((lesson) => (lesson.startDateTime >= weekInfo[weekIndex].startDate && lesson.startDateTime <= weekInfo[weekIndex].endDate))
    } else {
      return []
    }
  }

  return (
    <>
      <div className='flex justify-center items-center mt-14'>
        <LeftArrow weekIndex={weekIndex} setWeekIndex={setWeekIndex}/>
        <h1 className="text-center font-bold text-4xl select-none">{`Hi ${session?.user?.name}! Here is your Schedule for ${weekInfo[weekIndex].weekName}:`}</h1>
        <RightArrow weekIndex={weekIndex} setWeekIndex={setWeekIndex}/>
      </div>
      <div className="mt-12">
        <Calendar session={session} slots={getSlots()} lessons={getLessons()}/>
      </div>
      <div className='flex justify-between pt-5 ml-[50px]'>
        <NusmodsToggle showNusmodsLessons={showNusmodsLessons} setShowNusmodsLessons={setShowNusmodsLessons} />
        <DisplayDropdown changeDisplayType={changeDisplayType}/>
      </div>
    </>
  );
}

{/* <div>
<h1 className="text-center font-bold text-4xl justify-center items-center mt-24">
  {`Hi ${session?.user?.name}! Here is your Schedule for Week 1:`}
</h1>
</div> */}

