import React from 'react';
import Slot from './Slot';
import { Session } from 'next-auth';

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
    <div className="calendar-container">
      <div className="header">
        <ul className="timeslots" style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(10, minmax(0, 1fr))', marginLeft: '30px', marginRight: '20px' }}>
          {timeSlots.map((timeSlot) => <li key={timeSlot}>{timeSlot}</li>)}
        </ul>
      </div>
      <div className="main">
        {daysOfWeek.map((day, index) => (
          <div className="main-row" style={{ display: 'grid', gridTemplateColumns: '50px auto', gridTemplateAreas: '"days-of-week slots-row"', paddingBottom: '10px' }}>
            <div className="days-of-week" style={{ textAlign: 'center', paddingTop: '5px' }}>{day}</div>
            <div className="slots-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(40, minmax(0, 1fr))', gridTemplateRows: '34.8px', background: 'lightgray'}}>
              {slots.filter((slot) => slot.startDateTime.getDay() === index + 1).map((slot) => <Slot key={slot.id} slotInfo={slot} session={session}/>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
