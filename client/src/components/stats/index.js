import React, { Component } from 'react';
import { connect } from 'react-redux';

import './stats.css';

class Stats extends Component {
    state = {
        hours: 0
    }

    handleClick = (e) => {
        this.setState({
            hours: this.state.hours+1
        })
    }
    
    render() {
        const { user } = this.props;
        console.log(user);

        // Render user data into a table
        // Table header: First, Last, isAdmin, etc.
        // Table data: Aditya, Dave, True, etc.

        return (
            <>
                <div className="hello">This is a table</div>
                <p>I have {this.state.hours} hours in BMES!</p>
                <button onClick={this.handleClick}>Add Hour</button>
                <div> { !user.isAdmin && 'I am not an admin' } </div>
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