import {
  GET_EVENTS,
  ADDING_EVENT,
  EVENT_ADDED
} from '../types';

const initialState = {
  addingEvent: false,
};

export default function user(state=initialState, action) {
  switch(action.type) {
    case GET_EVENTS:
      return {
        ...state,
        ...action.payload
      }
    case ADDING_EVENT:
      return {
        ...state,
        addingEvent: true
      }
    case EVENT_ADDED:
      return {
        ...state,
        addingEvent: false
      }
    default:
      return state;
  }
}