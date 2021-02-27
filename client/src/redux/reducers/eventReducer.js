import {
    GET_EVENTS,
    EVENT_ADDED
} from '../actions/types';

const initialState = {
    events: null
};

export default function user(state=initialState, action) {
    switch(action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: [...action.payload]
            }
        case EVENT_ADDED:
            return {
                ...state,
            };
        default:
            return state;
    }
}