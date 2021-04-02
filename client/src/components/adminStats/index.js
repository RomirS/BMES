import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidenav from 'components/helpers/Sidenav';
import Loader from 'components/helpers/Loader';
import PropTypes from 'prop-types';

import './admin.css';
import DatatablePage from './AdminTable';

class adminStats extends Component {
    state = {
        loaded: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        error: PropTypes.object
      }
    
    componentDidUpdate() {
        if (!this.props.auth.isAuthenticated && !this.props.auth.isLoading) {
            this.props.history.push('/login');
        }
    }
    
    render() {
        const user = this.props.user;
        const data = {
            columns: [
                {
                label: 'Net ID',
                field: 'netid',
                sort: 'asc',
                width:75
                },
                {
                  label: 'First Name',
                  field: 'first',
                  sort: 'asc',
                  width:75
                },
                {
                label: 'Last Name',
                field: 'last',
                sort: 'asc',
                width:75
                },
                {
                label: 'Volunteer Hours',
                field: 'hours',
                sort: 'asc',
                width:75
                }
                
                
            ],
            rows: [{
                _id : user._id,
                netid : user.netid,
                first : user.first,
                last : user.last,
                hours : user.hours,
                events : ["event2"],
                isAdmin : user.isAdmin
            },
            {
                _id : "abcdefghi",
                netid : "RobW",
                first : "Rob",
                last : "Wins",
                hours : 9,
                events : ["event11", "event22", "event33"],
                isAdmin : true
            },
            {
                _id : "abcdef",
                netid : "BobJ",
                first : "Bob",
                last : "Jones",
                hours : 5,
                events : ["event1", "event2", "event3"],
                isAdmin : false
            }
            
        ]
        }
            return (
                <>
                    {user ? (
                    <div className="block">
                        <Sidenav user={user}/>
                        <div>
                        <DatatablePage user={user} list={data}/> 
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
  
export default connect(mapStateToProps, null)(adminStats);

