import {
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  EVENT_REGISTERED,
  EVENT_UNREGISTERED,
  EVENT_SIGNIN,
} from '../types';

const initialState = {
  id: null,
  netid: null,
  first: null,
  last: null,
  hours: 0,
  registered: [],
  attended: [],
  isAdmin: false
};

export default function user(state=initialState, action) {
  switch(action.type) {
    case USER_LOADED:
      return {
        ...state,
        ...action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload.user
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        ...initialState,
      };
    case EVENT_REGISTERED:
      return {
        ...state,
        registered: action.payload
      }
    case EVENT_UNREGISTERED:
      return {
        ...state,
        registered: action.payload
      }
    case EVENT_SIGNIN:
      return {
        ...state,
        attended: action.payload
      }
    default:
      return state;
  }
}