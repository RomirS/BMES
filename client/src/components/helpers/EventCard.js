import React from 'react';
import moment from "moment";

class EventCard extends React.Component {
    render() {
        const { user, events } = this.props;
        const eventArray = user.events;
        const toDisplay = [];
        let currentDate = moment();
        for (let i = 0; i < eventArray.length; i++) {
            let event = eventArray[i];
            let sliceLoc = eventArray[i].indexOf("@") + 1;
            let eventDate = moment(event.slice(sliceLoc, event.length));
            if((currentDate.year() >= eventDate.year()) && currentDate.month() >= eventDate.month()) {
                toDisplay.push(event.slice(0, sliceLoc-1));
            }
        }
        const eventList = toDisplay.map((title) =>
            <div class="card medium event-card">
                <div class="card-image">
                    <img src="https://images.pexels.com/photos/1081912/pexels-photo-1081912.jpeg?cs=srgb&dl=agriculture-bird-s-eye-view-colors-1081912.jpg&fm=jpg" alt="banner"></img>
                </div>
                <div class="card-content">
                    <span class="card-title">{title}</span>
                    <p>Event Date</p>
                    <p>Event Description Here</p>
                </div>    
            </div>
        )  
        return(  
        <ul>{eventList}</ul>
        )
    }
  }

export default EventCard;