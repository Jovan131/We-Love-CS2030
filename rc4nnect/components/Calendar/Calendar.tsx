import React from 'react';
import Slot from './Slot';

type AppProps = {
  slots: {
    id: string;
    capacity: any; 
    venue: string;
    startDateTime: Date;
    duration: number;
    igName: string;
    residents: { name: string }[];
  }[];
  session: any
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const timeSlots = ["1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300"];

const Calendar: React.FC<AppProps> = ({slots, session}) => {
  return (
    <div>
      <div>
        <ul className="list-none grid grid-cols-10 mr-5 ml-[30px]">
          {timeSlots.map((timeSlot) => <li key={timeSlot}>{timeSlot}</li>)}
        </ul>
      </div>
      <div>
        {daysOfWeek.map((day, index) => (
          <div key={index} className="grid grid-cols-[50px_auto] h-12 pb-2">
            <div className="text-center pt-[5px]">{day}</div>
            <div className="bg-gray-300 grid grid-cols-40">
              {slots.filter((slot) => slot.startDateTime.getDay() === index + 1).map((slot) => <Slot key={slot.id} slotInfo={slot} session={session}/>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
