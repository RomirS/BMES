import React, { useState } from 'react';
import dayjs from 'dayjs';

import Dropdown from './Dropdown';
import Days from './Days';
import './calendar.css';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const nextFive = (year) => {
  var nextFive = [];
  for (let i = 0; i < 5; i++) {
    nextFive.push(year + i);
  }
  return nextFive;
}

const Calendar = ({ user, events }) => {
  const [date, setDate] = useState(dayjs());

  const onDayClick = (d) => {
    console.log(d);
  }

  return (
    <>
      <div className="tail-datetime-calendar">
        <div className="calendar-navi">
          <span className="button-prev">
              <i 
                className="material-icons grey-text text-darken-2"
                onClick={() => setDate(date.subtract(1, 'M'))}
              >navigate_before</i>
            </span>
            <span className="calendar-button button-next">
              <i 
                className="material-icons grey-text text-darken-2"
                onClick={() => setDate(date.add(1, 'M'))}
              >navigate_next</i>
            </span>
          <Dropdown
            title={monthNames[date.month()]}
            data={monthNames}
            dataTarget="monthDropdown"
            onClick={(_, index) => setDate(date.month(index))}
          />
          <Dropdown
            title={date.year()}
            data={nextFive(date.year())}
            dataTarget="yearDropdown"
            onClick={(value, _) => setDate(date.year(value))}
          />
        </div>
        <div className="calendar-data">
          <table className="calendar-day">
            <thead>
              <tr>
                {weekDays.map(day => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <Days
              date={date}
              onDayClick={onDayClick}
              events={events}
              user={user}
            />
          </table>
        </div>
      </div>
    </>
  )
}

export default Calendar;