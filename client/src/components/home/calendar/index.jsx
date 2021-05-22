import React, { useState } from 'react';
import dayjs from 'dayjs';

import { monthNames, formatMonthName } from 'util/dateFormatters';
import Dropdown from './Dropdown';
import Days from './Days';
import AddEventModal from './modals/AddEventModal';
import './calendar.css';
import RegisterModal from './modals/RegisterModal';

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
  const [selectedDate, setSelectedDate] = useState();
  const [selectedEvent, setSelectedEvent] = useState();

  return (
    <>
    <div className={`${selectedDate || selectedEvent ? "minimize-calendar" : ""}`}>
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
            title={formatMonthName(date.month())}
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
              onDayClick={setSelectedDate}
              events={events}
              user={user}
              userChoosesEvent={setSelectedEvent}
            />
          </table>
        </div>
      </div>
    </div>
    {selectedDate && <AddEventModal date={selectedDate} setSelectedDate={setSelectedDate} />}
    {selectedEvent && <RegisterModal event={selectedEvent} user={user} setSelectedEvent={setSelectedEvent} />}
    </>
  )
}

export default Calendar;