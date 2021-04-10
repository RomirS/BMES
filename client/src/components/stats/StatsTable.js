import React, { Component } from 'react';
import { connect } from 'react-redux';
import './stats.css';
import logo from './BMES2019_logoV2.png';


class StatsTable extends Component {
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
                <h1 className="blue-text titleblue2">Your</h1>
                <img className="logoimage" src={logo} alt="logo" width="283" height="281.86"/>
                <h1 className="blue-text titleblue1">Data</h1>

                <br/>

                <button onClick={this.openCloseTable} className="btn waves-effect waves-light openButton">
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
                
                <div className="list1">

                    <h4 className="fevents">Future Events:</h4>
            
                    {user.events[2021] && (
                        <ul className="eList">
                            {user.events[2021].map(event => (
                                //condition 1: if current month is after event date, (event month - current month should be POSITIVE)
                                (event.startTime.toISOString().getMonth() -  isoDate.getMonth() > 0) 
                                || //condition 2: if current month is the same month as event month and event day has NOT already been passed, (event day - current day > 0)
                                ((event.startTime.toISOString().getMonth() -  isoDate.getMonth() === 0) && 
                                (event.startTime.toISOString().getDate() - isoDate.getDate() > 0)) ? 
                                <li>{event}</li> : null
                            ))}
                        </ul>
                    )}
                </div>

                <div className="list2">

                    <h4 className="pevents">Past Events:</h4>
                
                    
                    {user.events[2021] && (
                        <ul className="eList">
                            {user.events[2021].map(event => (
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
            </div>    
        );
    };
};

 
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    error: state.error
  });
  
  export default connect(mapStateToProps)(StatsTable);

