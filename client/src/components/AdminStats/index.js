import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Sidenav from 'components/helpers/Sidenav';
import Loader from 'components/helpers/Loader';
import PropTypes from 'prop-types';
import './admin.css';
import DatatablePage from './AdminTable';

const AdminStats = (props) => {

  const [loaded, setIsLoaded] = useState(true)
  const [data, setData] = useState(null)

  AdminStats.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    error: PropTypes.object
    }

  useEffect(() => {
    // if (props.auth.isAuthenticated && props.auth.isLoading) {
    //     props.history.push('/login');
    // }
    if(loaded){
    fetch("http://localhost:5000/api/users/all", {
      method: "GET", 
      headers: {
        "x-auth-token": props.auth.token
      }
    }).then(res => {
      return (res.json())
    }).then(data => {
      setIsLoaded(false)
      setData(data)         
    }).catch(error => {
      console.log(error)
    })}
  });

  const user = props.user;
  const tablelist = {
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
    rows: data
  }
  return (
    <>
      {(user && !loaded && user.isAdmin) ? (
      <div className="block">
        <Sidenav user={user}/>
        <div>
        
        <DatatablePage user={user} list={tablelist}/> 
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

export default connect(mapStateToProps, null)(AdminStats);