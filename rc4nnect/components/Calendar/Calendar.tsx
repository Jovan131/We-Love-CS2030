import React from 'react';
import Slot from './Slot';
import Lesson from './Lesson';

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

type SlotInfo = {
  id: string;
    capacity: any; 
    venue: string;
    startDateTime: Date;
    duration: number;
    igName: string;
    residents: { name: string, id: string }[];
    polled: boolean,
    subscribed: boolean,
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const timeSlots = ["1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300"];



const Calendar: React.FC<AppProps> = ({slots, session, lessons}) => {
  function getColor(slotInfo: SlotInfo, subscribed: any, polled: any) {
    const positionInList = slotInfo.residents.findIndex((resident) => resident.id === session.user.id) + 1
  
    if (slotInfo.residents.length <= slotInfo.capacity && !polled) {
      return 'bg-green-600 hover:bg-green-800 border-solid border-green-900 rounded-b-md border-b-4'
    } else if (!polled) {
      return 'bg-rose-600 hover:bg-rose-800 border-solid border-rose-900 rounded-b-md border-b-4'
    } else if (polled && positionInList <= slotInfo.capacity) {
      return 'bg-blue-600 hover:bg-blue-800 border-solid border-blue-900 rounded-b-md border-b-4'
    } else if (polled) {
      return 'bg-orange-600 hover:bg-orange-800 border-solid border-orange-900 rounded-b-md border-b-4'
    } else {
      return ''
    }
  }

  return (
    <div className='overflow-x-auto'>
      <div className='min-w-[950px]'>
        <ul className="list-none grid grid-cols-10 mr-5 ml-[30px]">
          {timeSlots.map((timeSlot) => <li key={timeSlot}>{timeSlot}</li>)}
        </ul>
      </div>
      <div>
        {daysOfWeek.map((day, index) => (
          <div key={index} className="grid grid-cols-[50px_auto] min-h-[45px] mb-2">
            <div className='flex items-center justify-end bg-slate-900 sticky left-[-1px] z-20 '>
              <div className="text-center align-middle mr-2">{day}</div>
            </div>
            <div className="bg-gray-300 grid grid-cols-40 min-w-[900px] mt-[1px]">
              {slots.filter((slot) => slot.startDateTime.getDay() === index + 1).map((slot) => {  
                return (<Slot key={slot.id} slotInfo={slot} session={session} color={getColor(slot, slot.subscribed, slot.polled)}/>)
              })}
              {lessons.filter((lesson) => lesson.startDateTime.getDay() === index + 1).map((lesson) => <Lesson key={lesson.id} lessonInfo={lesson} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
