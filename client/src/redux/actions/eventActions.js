import axios from 'axios';
import {
  GET_EVENTS,
  GETEVENTS_FAIL,
  ADDING_EVENT,
  EVENT_ADDED,
  ADDEVENT_FAIL,
  EVENT_REGISTERED,
  EVENT_REGISTER_FAIL,
  EVENT_UNREGISTERED,
  EVENT_UNREGISTER_FAIL,
  EVENT_SIGNIN,
  EVENT_SIGNIN_FAIL,
} from '../types';
import { returnErrors } from './errorActions';

export const getEvents = () => (dispatch) => {
  axios.get('/api/events').then(res => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const key = `${month}@${year}`;

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  }).catch(_ => {
    dispatch({ type: GETEVENTS_FAIL });
  });
}

export const addEvent = ({ eventName, description, startTime, endTime }) => dispatch => {
  dispatch({ type: ADDING_EVENT });
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ eventName, description, startTime, endTime });
  axios.post('/api/events', body, config).then(_ => {
    dispatch({ type: EVENT_ADDED });
    getEvents()(dispatch);
  }).catch((err) => {
    dispatch(returnErrors(err.response.data, err.response.status, ADDEVENT_FAIL));
  });
};

export const eventRegister = ({ eventName, startTime, netid }) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ eventName, startTime, netid });
  axios.post('/api/events/register', body, config).then(res => {
    dispatch({ 
      type: EVENT_REGISTERED,
      payload: res.data.registered
    });
  }).catch((err) => {
    dispatch(returnErrors(err.response.data, err.response.status, EVENT_REGISTER_FAIL));
  });
}

export const eventUnregister = ({ eventName, startTime, netid }) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ eventName, startTime, netid });
  axios.post('/api/events/unregister', body, config).then(res => {
    dispatch({ 
      type: EVENT_UNREGISTERED,
      payload: res.data.registered
    });
  }).catch((err) => {
    dispatch(returnErrors(err.response.data, err.response.status, EVENT_UNREGISTER_FAIL));
  });
}

export const eventSignin = ({ eventName, startTime, netid }) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ eventName, startTime, netid });
  axios.post('/api/events/signin', body, config).then(res => {
    dispatch({ 
      type: EVENT_SIGNIN,
      payload: res.data.attended
    });
  }).catch((err) => {
    dispatch(returnErrors(err.response.data, err.response.status, EVENT_SIGNIN_FAIL));
  });
}