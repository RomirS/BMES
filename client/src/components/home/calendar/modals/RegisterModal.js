import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { registerForEvent } from 'redux/actions/eventActions';

import './register.css';

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
        <div className="register-modal z-depth-2">
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
            <span onClick={() => setSelectedEvent(null)}>
                <i className="material-icons grey-text text-darken-0">clear</i>
            </span>
        </div>
    );
};

export default connect(null, { registerForEvent })(RegisterModal);