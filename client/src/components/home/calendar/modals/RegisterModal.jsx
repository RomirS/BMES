import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { formatAMPM } from 'util/dateFormatters';
import { registerForEvent } from 'redux/actions/eventActions';

const RegisterModal = ({ event, user, registerForEvent, setSelectedEvent }) => {
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const { events } = user;

    let match = false;
    events.forEach(e => {
      const [eventName, startTime] = e.split('@');
      if (eventName === event.eventName && startTime === event.startTime) match = true;
    });
    setRegistered(match);
  }, [event, user]);

  const { eventName, startTime, endTime, description } = event;
  const start = formatAMPM(startTime);
  const end = formatAMPM(endTime);
  return (
    <div className="modal-wrapper z-depth-1">
      <div className="register-modal">
        <span className="clear" onClick={() => setSelectedEvent(null)}>
          <i className="material-icons grey-text text-darken-0">clear</i>
        </span>
        <h1>{eventName} </h1>
        <p className="time grey-text text-darken-2">{start} - {end}</p>
        <p>{description} </p>
        {registered ? (
          <div className="registered">
            <p>Registered</p>
            <i className="material-icons prefix green-text">check</i>
          </div>
        ) : (
          <button className="waves-effect waves-light btn blue" onClick={() => registerForEvent(eventName, startTime, user.netid)}>Register</button>
        )}
      </div>
    </div>
  );
};

export default connect(null, { registerForEvent })(RegisterModal);