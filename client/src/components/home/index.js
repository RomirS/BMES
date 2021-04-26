import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Loader from '../helpers/Loader';
import Sidenav from '../helpers/Sidenav';
import Calendar from './calendar';
import authWrapper from 'util/authWrapper';
import { getEvents } from 'redux/actions/eventActions';

const Home = ({ user, events, getEvents }) => {
  useEffect(() => getEvents(), [getEvents]);

  return (
    <>
      {user && events ? (
        <div className="block">
          <Sidenav user={user}/>
          <div className="profile_interface">
              <Calendar user={user} events={events}/>
          </div>
        </div>
      ) : <Loader/> }
    </>
  );
}

export default authWrapper(connect(({ auth, user, events }) => ({ auth, user, events }), { getEvents })(Home));