import React from 'react';
import { connect } from 'react-redux';
import Sidenav from 'components/helpers/Sidenav';
import Loader from 'components/helpers/Loader';
import './profile.css';
import StatsTable from './StatsTable'

const Profile = (props) => {

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
  
export default connect(mapStateToProps, null)(Profile);