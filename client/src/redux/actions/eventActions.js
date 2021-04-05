import axios from 'axios';
import {
    GET_EVENTS,
    GETEVENTS_FAIL,
    EVENT_ADDED,
    ADDEVENT_FAIL,
    USER_REGISTERED,
    USER_REGISTER_FAIL
} from './types';
import { returnErrors } from './errorActions';

export const getEvents = () => (dispatch) => {
    axios.get('/api/events').then(res => {
        dispatch({
            type: GET_EVENTS,
            payload: res.data
        });
    }).catch(_ => {
        dispatch({ type: GETEVENTS_FAIL });
    });
}

export const addEvent = ({ eventName, description, startTime, endTime }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    const body = JSON.stringify({ eventName, description, startTime, endTime });

    axios.post('/api/events', body, config).then(_ => {
        dispatch({ 
            type: EVENT_ADDED
        });
        getEvents()(dispatch);
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, 'ADDEVENT_FAIL'));
        dispatch({ type: ADDEVENT_FAIL });
    });
};

export const registerForEvent = (eventName, startTime, netid) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    const body = JSON.stringify({ eventName, startTime, netid });
    axios.post('/api/events/register', body, config).then(res => {
        dispatch({ 
            type: USER_REGISTERED,
            payload: res.data.events
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, 'USER_REGISTER_FAIL'));
        dispatch({ type: USER_REGISTER_FAIL });
    });
}