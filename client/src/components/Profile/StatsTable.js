import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from 'assets/images/BMES2019_logoV2.png';
const events = [
  "Different@2021-06-02T18:00:00.000Z",
  "All Day@2021-06-01T07:00:00.000Z",
  "All Day@2021-06-09T07:00:00.000Z"
]

function StatsTable(props){
  
  const [isOpen, setIsOpen] = useState(false)
  const { user } = props;
  const isoDate = new Date()
  
  
  return (
    <div className="allData">
      <h1 className="titleblue2">Your</h1>
      <img className="logoimage" src={logo} alt="logo" width="283" height="281.86"/>
      <h1 className="titleblue1">Data</h1>
      <br/>
      <button onClick={() => setIsOpen(!isOpen)} className="btn waves-effect waves-light openButton">
        Click Here to Open/Close the Table!
      </button>
      <table className="centered">
        <tr className="r1">
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
        {isOpen && (
          <tr className="r2">
            <td>{user.first}</td>
            <td>{user.last}</td>
          </tr>
        )}   
        <tr className="r3">
          <th>Volunteer Hours</th>
          <th>Net ID</th>
        </tr>
        {isOpen && (
          <tr className="r4">
            <td>{user.hours}</td>
            <td>{user.netid}</td>
          </tr>
        )}
      </table>                    
      <div className="list1">
        <h4 className="fevents">Future Events:</h4>
        <ul className="eList">
          {events.map(e => {
            const [eventName, startTime] = e.split('@')
            const startTimeO = new Date(startTime)
            if ((startTimeO.getMonth() >  isoDate.getMonth()) 
            || ((startTimeO.getMonth() ===  isoDate.getMonth()) && 
            (startTimeO.getDate() > isoDate.getDate()))){
              console.log(eventName)
              return <li>{eventName}</li>
            }
            else{
              return null;
            }
          })} 
        </ul>
      </div>

      <div className="list2">
        <h4 className="pevents">Past Events:</h4>
        <ul className="eList">
          {events.map(e => {
            const [eventName, startTime] = e.split('@')
            const startTimeO = new Date(startTime)
            if((startTimeO.getMonth() <  isoDate.getMonth()) 
            ||((startTimeO.getMonth() ===  isoDate.getMonth()) && 
            (startTimeO.getDate() < isoDate.getDate()))){
              return <li>{eventName}</li>
            }else{
              return null;
            }
          })}
        </ul>
      </div>
    </div>    
  );
  
};

 
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  error: state.error
});
  
export default connect(mapStateToProps)(StatsTable);
