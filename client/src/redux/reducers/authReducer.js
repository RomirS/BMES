import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  hasLoaded: false
};

export default function auth(state=initialState, action) {
  switch(action.type) {
  case USER_LOADING:
    return {
      ...state,
      isLoading: true,
      hasLoaded: false
    };
  case USER_LOADED:
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      hasLoaded: true
    };
  case LOGIN_SUCCESS:
  case REGISTER_SUCCESS:
    localStorage.setItem('token', action.payload.token);
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      hasLoaded: true
    };
  case AUTH_ERROR:
  case LOGIN_FAIL:
  case REGISTER_FAIL:
  case LOGOUT_SUCCESS:
    localStorage.removeItem('token');
    return {
      ...state,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      hasLoaded: true
    }
  default:
    return state;
  }
}