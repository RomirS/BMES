import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Sidenav from '../helpers/Sidenav';
import Calendar from './calendar';

import { getEvents } from 'redux/actions/eventActions';

class Home extends Component {
  state = {
    loaded: false
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    error: PropTypes.object,
    getEvents: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getEvents();
  }

  componentDidUpdate() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  };

  render() {
    const { user, events } = this.props;

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
  };
};

const mapStateToProps = ({ auth, user, error, events }) => ({
  auth,
  user,
  error,
  events
});

export default connect(mapStateToProps, { getEvents })(Home);