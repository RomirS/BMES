import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidenav from '../home/Sidenav';
import Loader from '../Loader';
import './stats.css';


class Stats extends Component {
    state = {
        hours: 0,
        isOpen: false
    }

    openCloseTable = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    
    render() {
        const { user } = this.props;
        
        const events1 = ["volunteer1", "volunteer2", "volunteer3"]
        // Render user data into a table
        // Table header: First, Last, isAdmin, etc.
        // Table data: Aditya, Dave, True, etc.

        return (
            <>
                {user ? (
                    <>
                        <div className="block">
                            <Sidenav user={user}/>
                        </div>

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
                            </table>

                            <table className="centered">
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

                            <h4 className="blue-text">Past Events:</h4>
                    
                            {events1 && (
                                <ul>
                                    {events1.map(event => (
                                        <li>{event}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                
                    </> ) : <Loader/> 
                }
            </>
        );
    };
};

 
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    error: state.error
  });
  
  export default connect(mapStateToProps)(Stats);

