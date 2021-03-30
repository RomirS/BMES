import React from 'react';
import moment from "moment";

class Days extends React.Component {
    firstDayOfMonth = () => {
        const dateObject = this.props.dateObject;
        const firstDay = moment(dateObject).startOf("month").format("d");
        return firstDay;
    };

    year = () => this.props.dateObject.format("Y");
    month = () => this.props.dateObject.format("MMMM");

    numOfDays = () => this.props.dateObject.daysInMonth();

    currentDay = () => this.props.dateObject.format("D");

    compare = () => this.props.dateObject.format("MMMM") === moment().format("MMMM") && this.props.dateObject.format("Y") === moment().format("Y");

    getMonthNo = (month) => moment.months().indexOf(month);

    render() {
        const { onDayClick, events, user, setSelectedEvent } = this.props;

        const daysInMonth = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            daysInMonth.push(<td className="calendar-day empty" key={'startblank' + i}>{""}</td>);
        }

        const formatAMPM = (isoDate) => {
            const date = new Date(isoDate);
            let hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours < 12 ? 'am' : 'pm';
            hours %= 12;
            hours = hours || 12;
            const mins = minutes < 10 ? `0${minutes}` : minutes;
            const strTime = `${hours}:${mins}${ampm}`;
            return strTime;
        };

        let formatCurrMonth = this.getMonthNo(this.month()) + 1;
        formatCurrMonth = formatCurrMonth < 10 ? `0${formatCurrMonth}` : `${formatCurrMonth}`;
        let currEvents = events[this.year()];
        if (currEvents && currEvents[formatCurrMonth].length > 0) {
            currEvents = currEvents[formatCurrMonth];

            let trackIndex = 0;
            for (let d = 1; d <= this.numOfDays(); d++) {
                const formatDate = d < 10 ? `${this.year()}-${formatCurrMonth}-0${d}` : `${this.year()}-${formatCurrMonth}-${d}`;
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

                const currentDay = (d === parseInt(this.currentDay()) && this.compare()) ? "today" : "";
                daysInMonth.push(
                    <td 
                        key={d} 
                        className={`calendar-day ${currentDay}`}
                    >
                        <div className="date-number" >{d}</div>
                        {user.isAdmin && (
                            <span
                                className="add_event"
                                onClick={e => {
                                    onDayClick(e, d);
                                }}
                            >
                                <i className="material-icons yellow-text text-darken-3" style={{fontSize: '16px'}}>add</i>
                            </span>
                        )}
                        {eventsInDay.map(event => {
                            const formatTime = formatAMPM(event.startTime);
                            return (
                                <div 
                                    className="event-wrapper" 
                                    key={event.startTime}
                                    onClick={() => setSelectedEvent(event)}
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
            for (let d = 1; d <= this.numOfDays(); d++) {
                const currentDay = (d === parseInt(this.currentDay()) && this.compare()) ? "today" : "";
                daysInMonth.push(
                    <td 
                        key={d} 
                        className={`calendar-day ${currentDay}`} 
                    >
                        <div className="date-number" >{d}</div>
                        {user.isAdmin && (
                            <div
                                className="add_event"
                                onClick={e => {
                                    onDayClick(e, d);
                                }}
                            >
                                <i className="material-icons yellow-text text-darken-3" style={{fontSize: '16px'}}>add</i>
                            </div>
                        )}
                    </td>
                );
            }
        }

        let remaining = 7 - (parseInt(this.firstDayOfMonth()) + parseInt(this.numOfDays())) % 7;
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

        const Days = rows.map((d, i) => {
            return <tr key={'daysinmonth' + i}>{d}</tr>;
        });

        return (
            <tbody>
                {Days}
            </tbody>
        )
    }
}

export default Days;