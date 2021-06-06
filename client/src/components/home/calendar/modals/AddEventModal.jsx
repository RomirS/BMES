import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addEvent } from 'redux/actions/eventActions';
import './modal.scss'
import { useEffect } from 'react';

const AddEventModal = ({ date, closeModal, events, addEvent }) => {
  const [formState, setFormState] = useState({
    month: date.month,
    year: date.year,
    day: date.day,
    eventName: null,
    start: null,
    end: null,
    description: null
  });
  const [addingEvent, setAddingEvent] = useState(false);

  useEffect(() => {
    if (events.addingEvent && !addingEvent) setAddingEvent(true);
    else if (!events.addingEvent && addingEvent) closeModal();
  }, [events.addingEvent, addingEvent, closeModal]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  }

  const submitForm = (e) => {
    e.preventDefault();
    
    const { eventName, month, day, year, start, end, description } = formState;
    if (start && end) {
      const [startHours, startMinutes] = start.split(':');
      const [endHours, endMinutes] = end.split(':');
      const startTime = new Date(year, parseInt(month) - 1, day, startHours, startMinutes);
      const endTime = new Date(year, parseInt(month) - 1, day, endHours, endMinutes);
      addEvent({
        eventName,
        startTime,
        endTime,
        description
      });
    }
  }

  return (
    <div className="modal-wrapper z-depth-1">
      <div className="add-event-modal">
        <span className="clear" onClick={closeModal}>
          <i className="material-icons grey-text text-darken-0">clear</i>
        </span>
        <form onSubmit={submitForm}>
          <div className="line">
            <input 
              id="eventName"
              type="text"
              className="title browser-default"
              placeholder="New Event"
              onChange={handleChange}
            />
          </div>
          <div className="line">
            <input
              id="month"
              className="month browser-default"
              type="number"
              placeholder="Month"
              onChange={handleChange}
              defaultValue={date.month}
            />
            <span className="slash">/</span>
            <input
              id="day"
              className="year browser-default"
              type="number"
              placeholder="Day"
              onChange={handleChange}
              defaultValue={date.day}
            />
            <span className="slash">/</span>
            <input
              id="year"
              className="day browser-default"
              type="number"
              placeholder="Year"
              onChange={handleChange}
              defaultValue={date.year}
            />
          </div>
          <div className="line">
            <input
              id="start"
              className="time browser-default"
              type="time"
              onChange={handleChange}
            />
            <span className="to">to</span>
            <input
              id="end"
              className="time browser-default"
              type="time"
              onChange={handleChange}
            />
          </div>
          <div className="line">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              onChange={handleChange}
            />
          </div>
          <div className="line">
            <button className="blue btn waves-effect waves-light" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default connect(({ events }) => ({ events }), { addEvent })(AddEventModal);