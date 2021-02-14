import React, { Component } from 'react';
import { connect } from 'react-redux';

import './stats.css'

class Stats extends Component {
    render() {
        const { user, auth, error } = this.props;

        return (
            <div className="stats container valign-wrapper">
                <ul>
                    <li>Output user data into table</li>
                    <li>Show upcoming events</li>
                    <li>Show past events attended</li>
                    <li>Progress bar</li>
                    <li>Visualization for hours attended</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    error: state.error
});

export default connect(mapStateToProps)(Stats);