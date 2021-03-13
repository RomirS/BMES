import {
    GET_EVENTS,
    EVENT_ADDED
} from '../actions/types';

const initialState = {};

export default function user(state=initialState, action) {
    switch(action.type) {
        case GET_EVENTS:
            return action.payload
        case EVENT_ADDED:
            return {
                ...state,
            };
        default:
            return state;
    }
}