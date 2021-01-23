import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../Loader';
import Sidenav from './Sidenav';
import Calendar from './calendar';

class Home extends Component {
  state = {
    loaded: false
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    error: PropTypes.object
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  error: state.error
});

export default connect(mapStateToProps, null)(Home);