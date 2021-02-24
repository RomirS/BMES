import axios from 'axios';
import {
    EVENT_ADDED,
    ADDEVENT_FAIL
} from './types';


export const addEvent = ({ eventName, description, startTime, endTime }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    const body = JSON.stringify({ eventName, description, startTime, endTime });

    axios.post('/api/events', body, config).then(res => {
        dispatch({ 
            type: EVENT_ADDED, 
            newEvent: res.data
        });
    }).catch((_) => {
        dispatch({ type: ADDEVENT_FAIL });
    });
};