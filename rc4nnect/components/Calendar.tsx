import React from 'react';

const Calendar: React.FC = () => {
  return (
    <div className="calendar-container">
      <div className="header">
        <ul className="timeslots" style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(10, minmax(0, 1fr))', marginLeft: '50px' }}>
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
          <div className="badminton" style={{ position: 'absolute', backgroundColor: 'green', width: '315px', borderRadius: '4px', zIndex: 5, left: '50px', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
            Badminton: 28/30
          </div>
          <div className="squash" style={{ position: 'absolute', backgroundColor: 'green', width: '300px', borderRadius: '4px', zIndex: 5, right: '125px', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
            Squash: 7/10
          </div>
          <div className="slots-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(9, minmax(0, 1fr))', background: 'lightgray', borderStyle: 'solid', borderWidth: '3px', paddingTop: '30px' }}></div>
        </div>
        <div className="main-row" style={{ display: 'grid', gridTemplateColumns: '50px auto', gridTemplateAreas: '"days-of-week slots-row"', paddingBottom: '10px' }}>
          <div className="days-of-week" style={{ textAlign: 'center', paddingTop: '5px' }}>Tue</div>
          <div className="floorball" style={{ position: 'absolute', backgroundColor: 'turquoise', width: '300px', borderRadius: '4px', zIndex: 5, left: '215px', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
            Floorball: 15/20
          </div>
          <div className="volleyball" style={{ position: 'absolute', backgroundColor: 'orange', width: '300px', borderRadius: '4px', zIndex: 5, left: '665px', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
            Volleyball: 41/34
          </div>
          <div className="slots-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(9, minmax(0, 1fr))', background: 'lightgray', borderStyle: 'solid', borderWidth: '3px', paddingTop: '30px' }}></div>
        </div>
        <div className="main-row" style={{ display: 'grid', gridTemplateColumns: '50px auto', gridTemplateAreas: '"days-of-week slots-row"', paddingBottom: '10px' }}>
          <div className="days-of-week" style={{ textAlign: 'center', paddingTop: '5px' }}>Wed</div>
          <div className="table-tennis" style={{ position: 'absolute', backgroundColor: 'orange', width: '300px', borderRadius: '4px', zIndex: 5, left: '515.6px', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
            Table tennis: 26/20
          </div>
          <div className="slots-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(9, minmax(0, 1fr))', background: 'lightgray', borderStyle: 'solid', borderWidth: '3px', paddingTop: '30px' }}></div>
        </div>
        <div className="main-row" style={{ display: 'grid', gridTemplateColumns: '50px auto', gridTemplateAreas: '"days-of-week slots-row"', paddingBottom: '10px' }}>
          <div className="days-of-week" style={{ textAlign: 'center', paddingTop: '5px' }}>Thu</div>
          <div className="basketball" style={{ position: 'absolute', backgroundColor: 'green', width: '300px', borderRadius: '4px', zIndex: 5, left: '515.6px', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
            Basketball: 7/15
          </div>
          <div className="rc4fe" style={{ position: 'absolute', backgroundColor: 'orange', width: '300px', borderRadius: '4px', zIndex: 5, left: '816px', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
            RC4fe: 25/15
          </div>
          <div className="slots-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(9, minmax(0, 1fr))', background: 'lightgray', borderStyle: 'solid', borderWidth: '3px', paddingTop: '30px' }}></div>
        </div>
        <div className="main-row" style={{ display: 'grid', gridTemplateColumns: '50px auto', gridTemplateAreas: '"days-of-week slots-row"', paddingBottom: '10px' }}>
          <div className="days-of-week" style={{ textAlign: 'center', paddingTop: '5px' }}>Fri</div>
          <div className="dodgeball" style={{ position: 'absolute', backgroundColor: 'orange', width: '300px', borderRadius: '4px', zIndex: 5, left: '365px', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
            Dodgeball: 31/25
          </div>
          <div className="rc4climbing" style={{ position: 'absolute', backgroundColor: 'turquoise', width: '470px', borderRadius: '4px', zIndex: 5, left: '816px', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
            RC4Climbing: 4/15
          </div>
          <div className="slots-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(9, minmax(0, 1fr))', background: 'lightgray', borderStyle: 'solid', borderWidth: '3px', paddingTop: '30px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
