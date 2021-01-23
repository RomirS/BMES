import {
    USER_LOADED,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOGOUT_SUCCESS
} from '../actions/types';

const initialState = {
    _id: null,
    netid: null,
    first: null,
    last: null,
    hours: 0,
    events: [],
    isAdmin: false
};

export default function(state=initialState, action) {
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
                _id: null,
                netid: null,
                first: null,
                last: null,
                hours: 0,
                events: [],
                isAdmin: false
            };
        default:
            return state;
    }
}