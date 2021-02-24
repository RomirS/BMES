import {
    EVENT_ADDED
} from '../actions/types';

const initialState = {
    events: null
};

export default function user(state=initialState, action) {
    switch(action.type) {
        case EVENT_ADDED:
            return {
                ...state,
                events: [...state.events, action.newEvent]
            };
        default:
            return state;
    }
}