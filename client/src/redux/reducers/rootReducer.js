import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import eventReducer from './eventReducer';

export default combineReducers({
  user: userReducer,
  error: errorReducer,
  auth: authReducer,
  events: eventReducer
});