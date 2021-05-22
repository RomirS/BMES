import React, { useMemo } from 'react';
import dayjs from 'dayjs';

import { formatAMPM, formatMonthNumber } from 'util/dateFormatters';

const Days = ({ date, onDayClick, events, user, userChoosesEvent }) => {
  const Days = useMemo(() => {
    const firstDayOfMonth = () => date.startOf('M').day();
    const sameYearSameMonth = () => date.month() === dayjs().month() && date.year() === dayjs().year();

    const daysInMonth = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
      daysInMonth.push(<td className="calendar-day empty" key={'startblank' + i}>{""}</td>);
    }

    const monthNumber = formatMonthNumber(date.month());
    let currEvents = events[date.year()];
    if (currEvents && currEvents[monthNumber].length > 0) {
      currEvents = currEvents[monthNumber];

      let trackIndex = 0;
      for (let d = 1; d <= date.daysInMonth(); d++) {
        const formatDate = d < 10 ? `${date.year()}-${monthNumber}-0${d}` : `${date.year()}-${monthNumber}-${d}`;
        let eventsInDay = [];
        if (trackIndex < currEvents.length) {
          let currEvent = currEvents[trackIndex];
          let showEvents = currEvent.startTime.includes(formatDate);
          while (showEvents) {
            eventsInDay.push(currEvent);
            trackIndex++;
            if (trackIndex >= currEvents.length) showEvents = false;
            else {
              currEvent = currEvents[trackIndex];
              showEvents = currEvent.startTime.includes(formatDate);
            }
          }
        }

        const currentDay = (d === parseInt(date.date()) && sameYearSameMonth()) ? "today" : "";
        daysInMonth.push(
          <td 
            key={d} 
            className={`calendar-day ${currentDay}`}
          >
            <div className="date-number" >{d}</div>
            {user.isAdmin && (
              <span
                className="add_event"
                onClick={() => onDayClick({
                  day: d,
                  month: formatMonthNumber(date.month()),
                  year: date.year()
                })}
              >
                <i className="material-icons" style={{fontSize: '16px'}}>add</i>
              </span>
            )}
              {eventsInDay.map(event => {
                const formatTime = formatAMPM(event.startTime);
                return (
                  <div 
                    className="event-wrapper" 
                    key={event.startTime}
                    onClick={() => userChoosesEvent(event)}
                  >
                    <span className="dot" />
                    <span className="time grey-text text-darken-3">{formatTime + ' '}</span>
                    <span className="event-name">
                      {event.eventName}
                    </span>
                  </div>
                )
              })}
          </td>
        );
      }
    } else {
      for (let d = 1; d <= date.daysInMonth(); d++) {
        const currentDay = (d === parseInt(date.date()) && sameYearSameMonth()) ? "today" : "";
        daysInMonth.push(
          <td 
            key={d} 
            className={`calendar-day ${currentDay}`} 
          >
            <div className="date-number" >{d}</div>
            {user.isAdmin && (
              <div
                className="add_event"
                onClick={() => onDayClick({
                  day: d,
                  month: formatMonthNumber(date.month()),
                  year: date.year()
                })}
              >
                <i className="material-icons yellow-text text-darken-3" style={{fontSize: '16px'}}>add</i>
              </div>
            )}
          </td>
        );
      }
    }

    let remaining = 7 - (parseInt(firstDayOfMonth()) + parseInt(date.daysInMonth())) % 7;
    remaining = remaining === 7 ? 0 : remaining;
    for (let i = 0; i < remaining; i++) {
      daysInMonth.push(<td className="calendar-day empty" key={'endblank' + i}>{""}</td>);
    }

    let rows = [];
    let cells = [];
    daysInMonth.forEach((day, i) => {
      if (i % 7 !== 0) {
        cells.push(day);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(day);
      }
      if (i === daysInMonth.length - 1) {
        rows.push(cells);
      }
    });

    return rows.map((d, i) =>  <tr key={'daysinmonth' + i}>{d}</tr>);
  }, [date, events, onDayClick, user.isAdmin, userChoosesEvent]);

  return <tbody>{Days}</tbody>;
}

export default Days;