import React from 'react';

type AppProps = {
  slots: {
    id: string;
    capacity: number; 
    venue: string;
    startDateTime: Date;
    duration: number;
    igName: string;
    residents: [];
  }[];
}

function getStyle(slot: {
  id: string;
  capacity: number; 
  venue: string;
  startDateTime: Date;
  duration: number;
  igName: string;
  residents: [];
}) {
  return {
    gridColumnStart: 1 + ((slot.startDateTime.getHours() - 14) * 4) + (slot.startDateTime.getMinutes() / 15),
    gridColumnEnd: 1 + ((slot.startDateTime.getHours() - 14) * 4) + (slot.startDateTime.getMinutes() / 15) + (slot.duration * 4),
    gridRowStart: 1,
    gridRowEnd: 2,
    backgroundColor: (slot.residents.length <= slot.capacity) ? 'green' : 'orange',
    borderRadius: '4px', 
    zIndex: 5, 
    paddingTop: '5px', 
    paddingBottom: '5px', 
    textAlign: 'center',
  }
}

function renderSlot(slot: {
  id: string;
  capacity: number; 
  venue: string;
  startDateTime: Date;
  duration: number;
  igName: string;
  residents: [];
}) {
  return (
    <div style={getStyle(slot)} key={slot.id}>
      {slot.igName + ": " + slot.residents.length + "/" + (slot.capacity ?? "~")}
    </div>
  )
}

const Calendar: React.FC<AppProps> = ({slots}) => {
  return (
    <div className="calendar-container">
      <div className="header">
        <ul className="timeslots" style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(10, minmax(0, 1fr))', marginLeft: '30px', marginRight: '20px' }}>
          <li>1400</li>
          <li>1500</li>
          <li>1600</li>
          <li>1700</li>
          <li>1800</li>
          <li>1900</li>
          <li>2000</li>
          <li>2100</li>
          <li>2200</li>
          <li>2300</li>
        </ul>
      </div>
      <div className="main">
        <div className="main-row" style={{ display: 'grid', gridTemplateColumns: '50px auto', gridTemplateAreas: '"days-of-week slots-row"', paddingBottom: '10px' }}>
          <div className="days-of-week" style={{ textAlign: 'center', paddingTop: '5px' }}>Mon</div>
          <div className="slots-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(40, minmax(0, 1fr))', gridTemplateRows: '34.8px', background: 'lightgray'}}>
            {slots.filter((slot) => slot.startDateTime.getDay() === 1).map(renderSlot)}
          </div>
        </div>
        <div className="main-row" style={{ display: 'grid', gridTemplateColumns: '50px auto', gridTemplateAreas: '"days-of-week slots-row"', paddingBottom: '10px' }}>
          <div className="days-of-week" style={{ textAlign: 'center', paddingTop: '5px' }}>Tue</div>
          <div className="slots-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(40, minmax(0, 1fr))', gridTemplateRows: '34.8px', background: 'lightgray'}}>
            {slots.filter((slot) => slot.startDateTime.getDay() === 2).map(renderSlot)}
          </div>
        </div>
        <div className="main-row" style={{ display: 'grid', gridTemplateColumns: '50px auto', gridTemplateAreas: '"days-of-week slots-row"', paddingBottom: '10px' }}>
          <div className="days-of-week" style={{ textAlign: 'center', paddingTop: '5px' }}>Wed</div>
          <div className="slots-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(40, minmax(0, 1fr))', gridTemplateRows: '34.8px', background: 'lightgray'}}>
            {slots.filter((slot) => slot.startDateTime.getDay() === 3).map(renderSlot)}
          </div>
        </div>
        <div className="main-row" style={{ display: 'grid', gridTemplateColumns: '50px auto', gridTemplateAreas: '"days-of-week slots-row"', paddingBottom: '10px' }}>
          <div className="days-of-week" style={{ textAlign: 'center', paddingTop: '5px' }}>Thu</div>
          <div className="slots-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(40, minmax(0, 1fr))', gridTemplateRows: '34.8px', background: 'lightgray'}}>
            {slots.filter((slot) => slot.startDateTime.getDay() === 4).map(renderSlot)}
          </div>
        </div>
        <div className="main-row" style={{ display: 'grid', gridTemplateColumns: '50px auto', gridTemplateAreas: '"days-of-week slots-row"', paddingBottom: '10px' }}>
          <div className="days-of-week" style={{ textAlign: 'center', paddingTop: '5px' }}>Fri</div>
          <div className="slots-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(40, minmax(0, 1fr))', gridTemplateRows: '34.8px', background: 'lightgray'}}>
            {slots.filter((slot) => slot.startDateTime.getDay() === 5).map(renderSlot)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
