import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: {},
  status: null,
  id: null
}

export default function error(state=initialState, action) {
  switch(action.type) {
    case GET_ERRORS:
      return {
        ...action.payload
      };

    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };

    default:
      return state;
  }
}