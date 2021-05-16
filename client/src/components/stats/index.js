import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../helpers/Loader';
import Sidenav from '../helpers/Sidenav';
import EventCard from '../helpers/EventCard';


import './stats.css'
import { getEvents } from 'redux/actions/eventActions';

class Stats extends Component {
    static propTypes = {
        getEvents: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getEvents();  
    }
    render() {
        const user = this.props.user;
        const events = this.props.events;
        return (
            <>
            {user ? (
                <div className="container">
                    <div className="row">
                        <div className="col s3">
                            <div>
                                <Sidenav user={user}/>
                            </div>
                        </div>
                        <div className="col s6">
                            <div className="section">
                                <div className="progress">
      	                            <div className="determinate blue" style={{"width":"50%"}}></div>
  		                        </div>
                            </div>
                            <div className="section">
                                <div className="card grey lighten-3">
                                    <div className="card-content posts">
                                        <nav className="event-header">
                                            <h4 className="left event-title">Upcoming Events</h4>
                                        </nav>
                                    </div>
                                    <div className="section">
                                        <EventCard user={user} events={events}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className= "col s3">
                            <p>hours/week</p>
                        </div>
                    </div>
              </div>
            ) : <Loader/> }
          </>
        )

    }

} 
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    error: state.error,
    events: state.events
});

export default connect(mapStateToProps, { getEvents })(Stats);
