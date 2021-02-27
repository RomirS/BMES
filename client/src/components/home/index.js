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
    setEventIndices: PropTypes.func.isRequired,
    getEvents: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getEvents(true);
  }

  componentDidUpdate() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  };

  render() {
    const user = this.props.user;

    return (
      <>
        {user ? (
          <div className="block">
            <Sidenav user={user}/>
            <div className="profile_interface">
                <Calendar user={user}/>
            </div>
          </div>
        ) : <Loader/> }
      </>
    );
  };
};

const mapStateToProps = ({ auth, user, error }) => ({
  auth,
  user,
  error
});

export default connect(mapStateToProps, { getEvents })(Home);