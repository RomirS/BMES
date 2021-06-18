import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import logo from 'assets/images/BMES2019_logoV2.png';
import M from "materialize-css";
import { Carousel } from 'react-responsive-carousel';
const events = [
  "Different@2021-06-02T18:00:00.000Z",
  "Every Day@2021-06-01T07:00:00.000Z",
  "All Day@2021-06-09T07:00:00.000Z",
  "Never@2021-06-10T07:00:00.000Z",
  "New Events@2021-06-30T18:00:00.000Z"
]

const StatsTable = (props) => {
  
  const [isOpen, setIsOpen] = useState(false)
  const { user } = props;
  const isoDate = new Date()
  
  useEffect(() => {
    let carousel = document.querySelectorAll(".carousel")
    M.Carousel.init(carousel)
  });
  
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
        <h4 className="miniTitle">Upcoming Events:</h4>
          {events.map(e => {
            const [eventName, startTime] = e.split('@')
            const [startTimeB, a] = startTime.split('T')
            const startTimeO = new Date(startTime)
            if ((startTimeO.getMonth() >  isoDate.getMonth()) 
            || ((startTimeO.getMonth() ===  isoDate.getMonth()) && 
            (startTimeO.getDate() > isoDate.getDate()))){
              return (
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src={logo} alt="logo" width="230" height="250"/>
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">{eventName}<i class="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">{eventName}<i class="material-icons right">close</i></span>
                  <p>Here is some more information about {eventName}.</p>
                  <p>Event Date: {startTimeB}</p>
                  <p>Event Description: </p>
                </div>
              </div>
              )
            }
            else{
              return null;
            }
          })} 
      </div>

      <div className="list2">
        <h4 className="miniTitle">Past Events:</h4>
          {events.map(e => {
            const [eventName, startTime] = e.split('@')
            const [startTimeB, a] = startTime.split('T')
            const startTimeO = new Date(startTime)
            if((startTimeO.getMonth() <  isoDate.getMonth()) 
            ||((startTimeO.getMonth() ===  isoDate.getMonth()) && 
            (startTimeO.getDate() < isoDate.getDate()))){
              return (
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src={logo} alt="logo" width="230" height="250"/>
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">{eventName}<i class="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">{eventName}<i class="material-icons right">close</i></span>
                  <p>Here is some more information about {eventName}.</p>
                  <p>Event Date: {startTimeB}</p>
                  <p>Event Description: </p>
                </div>
              </div>
              )
            }else{
              return null;
            }
          })}
      </div>
      <h4 className="miniTitle" >User Analytics:</h4>
      <div class="carousel carousel-slider center panels">
        <div class="carousel-fixed-item center">
          <a class="btn waves-effect white grey-text darken-text-2">Click Panel</a>
        </div>
        <div class="carousel-item red white-text" href="#one!">
          <h2>Total Hours Committed</h2>
          <p class="white-text">We have analyzed your volunteering statistics to find your Total Hours Committed!</p>
          <p class="white-text">This number represents how many hours you have committed to volunteering for BMES:</p>
          {/* add your actual algorithm to find inside the h3 tag */}
          <h3>32 Hours</h3>
        </div>
        <div class="carousel-item amber white-text" href="#two!">
          <h2>Second Panel</h2>
          <p class="white-text">This is your second panel</p>
        </div>
        <div class="carousel-item green white-text" href="#three!">
          <h2>Third Panel</h2>
          <p class="white-text">This is your third panel</p>
        </div>
        <div class="carousel-item blue white-text" href="#four!">
          <h2>Fourth Panel</h2>
          <p class="white-text">This is your fourth panel</p>
        </div>
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
