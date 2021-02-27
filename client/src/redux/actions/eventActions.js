import axios from 'axios';
import {
    GET_EVENTS,
    GETEVENTS_FAIL,
    EVENT_ADDED,
    ADDEVENT_FAIL
} from './types';

export const getEvents = () => (dispatch, getState) => {
    axios.get('/api/events').then(res => {
        dispatch({
            type: GET_EVENTS,
            payload: res.data
        });
        if (getState) {
            const d = new Date();
            setEventIndices(d.getMonth(), d.getFullYear())(dispatch, getState);
        }
    }).catch(_ => {
        dispatch({ type: GETEVENTS_FAIL });
    });
}

export const setEventIndices = (monthNo, year) => (dispatch, getState) => {
    console.log(getState().event.events);
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
    }).catch((_) => {
        dispatch({ type: ADDEVENT_FAIL });
    });
};