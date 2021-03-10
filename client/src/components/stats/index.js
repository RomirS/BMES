import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../helpers/Loader';
import Sidenav from '../helpers/Sidenav';

import './stats.css'

class Stats extends Component {
    render() {
        const user = this.props.user;
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
                    {/*     <!-- Upcoming Events Header--> */}
                                <nav class="event-header">
                                    <h4 class="left event-title">Upcoming Events</h4>
                                </nav>
                                <div class="card medium event-card">
                                    <div class="card-image">
                                    <img src="https://images.pexels.com/photos/1081912/pexels-photo-1081912.jpeg?cs=srgb&dl=agriculture-bird-s-eye-view-colors-1081912.jpg&fm=jpg" alt="banner"></img>
                                    </div>
                                    <div class="card-content">
                                    <span class="card-title">Event Title</span>
                                    <p>Event Date</p>
                                    <p>Event Description Here</p>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        </div>
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
    error: state.error
});

export default connect(mapStateToProps)(Stats);