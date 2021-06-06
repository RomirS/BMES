import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ToggleButton from 'react-toggle-button';

import { formatAMPM } from 'util/dateFormatters';
import { eventRegister, eventUnregister, eventSignin } from 'redux/actions/eventActions.js';

const RegisterModal = ({ event, user, eventRegister, eventUnregister, eventSignin, closeModal }) => {
  const [registered, setRegistered] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const now = new Date();
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    if (now >= start && now <= end) setActive(true);
  }, [event]);

  useEffect(() => {
    const { registered, attended } = user;
    const key = `${event.eventName}@${event.startTime}`;

    const registeredMatch = registered.includes(key);
    setRegistered(registeredMatch);

    const signedInMatch = attended.includes(key);
    setSignedIn(signedInMatch);
  }, [event, user]);

  const { eventName, startTime, endTime, description } = event;
  const start = formatAMPM(startTime);
  const end = formatAMPM(endTime);
  return (
    <div className="modal-wrapper z-depth-1">
      <div className="register-modal">
        <span className="clear" onClick={closeModal}>
          <i className="material-icons grey-text text-darken-0">clear</i>
        </span>
        <h1 className="blue-text">{eventName} </h1>
        <p className="time grey-text text-darken-2">{start} - {end}</p>
        <p className="description grey-text text-darken-3">{description}</p>
        {active ? (
          <div className="active-event green lighten-4">
            <p>Event currently in progress</p>
            {signedIn ? (
              <p>Signed in</p>
            ) : (
              <button className="blue btn waves-effect waves-light" onClick={() => eventSignin({ eventName, startTime, netid: user.netid })}>Sign in</button>
            )}
          </div>
        ) : (
          <div className="flex-container">
            <div className="toggle-wrapper">
              <ToggleButton
                value={registered}
                onToggle={(value) => {
                  if (!value) eventRegister({ eventName, startTime, netid: user.netid });
                  else eventUnregister({ eventName, startTime, netid: user.netid });
                  setRegistered(!value)
                }}
                activeLabel=''
                inactiveLabel=''
                colors={{
                  active: {
                    base: '#a5d6a7'
                  },
                  activeThumb: {
                    base: '#4caf50'
                  },
                  inactive: {
                    base: '#ef9a9a'
                  },
                  inactiveThumb: {
                    base: '#f44336'
                  }
                }}
                thumbStyle={{
                  boxShadow: '0',
                  width: '22px',
                  height: '22px'
                }}
                trackStyle={{
                  height: '15px'
                }}
              />
            </div>
            <div className="text-wrapper">
              {registered ? <p>Registered</p> : <p>Unregistered</p> }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(null, { eventRegister, eventUnregister, eventSignin })(RegisterModal);