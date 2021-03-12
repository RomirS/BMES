import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidenav from '../home/Sidenav';
import Loader from '../Loader';
import PropTypes from 'prop-types';

import './stats.css';
import Stats from './Stats.js'


class StatsPage extends Component {
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
    error: state.error
  });
  
export default connect(mapStateToProps, null)(StatsPage);

