import React, { Component } from 'react';
import { connect } from 'react-redux';
import './stats.css';


class Stats extends Component {
    state = {
        isOpen: false
    }

    openCloseTable = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    
    
    render() {
        const { user } = this.props;
        const isoDate = new Date().toISOString()
    
        return (
            <div className="allData">
                <h1 className="blue-text">User Data:</h1>

                <button onClick={this.openCloseTable} className="blue btn waves-effect waves-light openButton">
                    Click Here to Open/Close the Table!
                </button>

                <table className="centered">
                    <tr className="r1">
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                    {this.state.isOpen && (
                        <tr className="r2">
                            <td>{user.first}</td>
                            <td>{user.last}</td>
                        </tr>
                    )}   
                    <tr className="r3">
                        <th>Volunteer Hours</th>
                        <th>Net ID</th>
                    </tr>
                    {this.state.isOpen && (
                        <tr className="r4">
                            <td>{user.hours}</td>
                            <td>{user.netid}</td>
                        </tr>
                    )}
                </table>                    

                <h4 className="fevents">Future Events:</h4>
        
                {user.events && (
                    <ul>
                        {user.events.map(event => (
                            //condition 1: if current month is after event date, (event month - current month should be POSITIVE)
                            (event.startTime.toISOString().getMonth() -  isoDate.getMonth() > 0) 
                            || //condition 2: if current month is the same month as event month and event day has NOT already been passed, (event day - current day > 0)
                            ((event.startTime.toISOString().getMonth() -  isoDate.getMonth() === 0) && 
                            (event.startTime.toISOString().getDate() - isoDate.getDate() > 0)) ? 
                            <li>{event}</li> : null
                        ))}
                    </ul>
                )}

                <h4 className="pevents">Past Events:</h4>
                
                {user.events && (
                    <ul>
                        {user.events.map(event => (
                            //condition 1: if current month is after event date, (event month - current month should be negative)
                            (event.startTime.toISOString().getMonth() -  isoDate.getMonth() < 0) 
                            || //condition 2: if current month is the same month as event month and event day has already been passed, (event day - current day < 0)
                            ((event.startTime.toISOString().getMonth() -  isoDate.getMonth() === 0) && 
                            (event.startTime.toISOString().getDate() - isoDate.getDate() < 0)) ? 
                            <li>{event}</li> : null
                        ))}
                    </ul>
                )}
            </div>    
        );
    };
};

 
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    error: state.error
  });
  
  export default connect(mapStateToProps)(Stats);

