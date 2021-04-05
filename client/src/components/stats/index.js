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
                <div class="container">
                    <div class="row">
                        <div class="col s3">
                            <div>
                                <Sidenav user={user}/>
                            </div>
                        </div>
                        <div class="col s6">
                            <div class="section">
                                <p>Progress Bar Here</p>
                            </div>
                            <div class="section">
                                <div class="card grey lighten-3">
                                    <div class="card-content posts">
                                        <nav class="event-header">
                                            <h4 class="left event-title">Upcoming Events</h4>
                                        </nav>
                                    </div>
                                    <div class="section">
                                        <EventCard user={user} events={events}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class = "col s3">
                            <p>hours/week</p>
                        </div>
                    </div>
              </div>
            ) : <Loader/> }
          </>
        )

    }
    
    render() {
        const user = this.props.user;
            return (
                <>
                    {user ? (
                    <div className="block">
                        <Sidenav user={user}/>
                        <div>
                        <Stats user={user}/> 
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
    error: state.error,
    events: state.events
});

export default connect(mapStateToProps, { getEvents })(Stats);
