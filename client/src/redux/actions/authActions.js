import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';
import { returnErrors, clearErrors } from './errorActions';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get('/api/users', tokenConfig(getState)).then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: AUTH_ERROR });
    });
};

export const register = ({ first, last, netid, password }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    const body = JSON.stringify({first, last, netid, password});

    axios.post('/api/users', body, config).then(res => {
        dispatch({ 
            type: REGISTER_SUCCESS, 
            payload: res.data
        });
    }).catch(err => {
        dispatch({ type: REGISTER_FAIL });
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    });
};

export const login = ({ netid, password }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    const body = JSON.stringify({netid, password});

    axios.post('/api/auth', body, config).then(res => {
        dispatch({ 
            type: LOGIN_SUCCESS, 
            payload: res.data
        });
        dispatch(clearErrors());
    }).catch(err => {
        if (err.response.data.confirm) {
            dispatch(returnErrors(err.response.data.msg, err.response.status, 'CONFIRM_SIGNUP'));
        }
        else {
            dispatch({ type: LOGIN_FAIL });
            dispatch(returnErrors(err.response.data.msg, err.response.status, 'LOGIN_FAIL'));
        }
    });
};

export const logout = () =>  {
    return { 
        type: LOGOUT_SUCCESS 
    };
};

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if(token) config.headers['x-auth-token'] = token;

    return config;
};