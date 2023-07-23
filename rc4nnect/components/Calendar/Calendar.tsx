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
    description: string | null,
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
  description: string | null,
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const timeSlots = ["0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300"];

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

  function getSlotsAndLessons(slots: any[], lessons: any[], index: number) {
    return slots
      .concat(lessons)
      .filter((slotOrLesson) => slotOrLesson.startDateTime.getDay() === index + 1)
      .sort((slotOrLesson1, slotOrLesson2) => slotOrLesson1.startDateTime < slotOrLesson2.startDateTime ? -1 : 1)
      .map((slotOrLesson) => slotOrLesson.hasOwnProperty('igName') ? 
        <Slot 
          key={slotOrLesson.id} 
          slotInfo={slotOrLesson} 
          session={session} 
          color={getColor(slotOrLesson, slotOrLesson.subscribed, slotOrLesson.polled)}
          earliestHour={earliestHour}
        /> :
        <Lesson key={slotOrLesson.id} lessonInfo={slotOrLesson} earliestHour={earliestHour} />)
  }  // sort is necessary to ensure that new rows are not created unnecessarily

  const earliestHour = lessons.reduce(
    (earliestHour, currentValue) => (currentValue.startDateTime.getHours() < earliestHour ? currentValue.startDateTime.getHours() : earliestHour)
    , 14
  ) // a number between 8-14 (assuming earliest lesson in Nusmods is 8am)

  const additionalWidth = (14 - earliestHour) * 90  // width (in px) to add to the calendar to fit the additional hours

  return (
    <div className='overflow-x-auto'>
      <div style={{ minWidth: `${950 + additionalWidth}px` }}>
        <ul className="list-none grid mr-5 ml-[30px]" style={{ gridTemplateColumns: `repeat(${24 - earliestHour}, minmax(0, 1fr))` }}>
          {timeSlots.slice(earliestHour - 8).map((timeSlot) => <li key={timeSlot}>{timeSlot}</li>)}
        </ul>
      </div>
      <div>
        {daysOfWeek.map((day, index) => (
          <div key={index} className="grid grid-cols-[50px_auto] min-h-[45px] mb-2">
            <div className='flex items-center justify-end bg-slate-900 sticky left-[-1px] z-20 '>
              <div className="text-center align-middle mr-2">{day}</div>
            </div>
            <div className="bg-gray-300 grid mt-[1px]" style={{ minWidth: `${900 + additionalWidth}px`, gridTemplateColumns: `repeat(${(24 - earliestHour) * 4}, minmax(0, 1fr))` }}>
              {getSlotsAndLessons(slots, lessons, index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
