import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Sidenav from 'components/helpers/Sidenav';
import Loader from 'components/helpers/Loader';
import PropTypes from 'prop-types';
import './stats.css';
import StatsTable from './StatsTable'

const Stats = (props) => {
    
    Stats.propTypes = {
        auth: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        error: PropTypes.object
    }

    useEffect(() => {
        // if (props.auth.isAuthenticated && props.auth.isLoading) {
        //     props.history.push('/login');
        // }
      });

    return (
        <>
            {props.user ? (
            <div className="block">
                <Sidenav user={props.user}/>
                <div>
                <StatsTable props={props}/> 
                </div>
            </div>
            ) : <Loader/> }
        </>
    );
};

 
const mapStateToProps = ({auth, user, error}) => ({
    auth: auth,
    user: user,
    error: error
  });
  
export default connect(mapStateToProps, null)(Stats);

