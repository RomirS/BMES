import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';

import { register, login } from 'redux/actions/authActions';
import './login.css';

const initFormState = {
  first: '',
  last: '',
  netid: '',
  password: '',
}

const errorReducer = (errors, [errorId, payload]) => {
  switch(errorId) {
    case 'CONFIRM_SIGNUP':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      const filteredErrors = errors.filter(err => err.id !== errorId);
      return [...filteredErrors, payload.newError]
    case 'REMOVE_ERROR':
      const clearedError = errors.filter((_, i) => i !== payload.errorIndex);
      return clearedError
    default:
      return errors;
  }
}

const Login = ({ error, register, login }) => {
  const [formState, setFormState] = useState(initFormState);
  const [errorState, dispatchError] = useReducer(errorReducer, []);
  const [mustRegister, setMustRegister] = useState(false);

  useEffect(() => {
    dispatchError([error.id, { newError: error }]);
    if(error.id === 'CONFIRM_SIGNUP') setMustRegister(true);
  }, [error]);

  const clear = (index) => {
    dispatchError(['REMOVE_ERROR', { errorIndex: index }]);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { first, last, netid, password } = formState;

    if (mustRegister) register({ first, last, netid, password });
    else login({netid, password});
  };

  return (
    <div className="container" style={{marginTop: '10rem'}}>
      <div className="row">
        <h1>Sign in with Illinois</h1>
      </div>
      {errorState.length > 0 && (
        errorState.map((error, i) => {
          const color = error.id === 'CONFIRM_SIGNUP' ? 'teal' : 'red';
          return (
            <div className="row valign-wrapper" key={"error" + i} >
              <button className={"btn-floating btn-medium waves-effect waves-light lighten-3 z-depth-0 " + color} onClick={() => clear(i)}>
                <i className="material-icons">clear</i>
              </button>
              <div className={"col s11 lighten-3 white-text " + color} style={{borderRadius: '4px', padding: '1rem'}}>
                {error.msg}
              </div>
            </div>
          )
        })
      )}
      {mustRegister && (
        <>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input onChange={handleChange} id="first" name="first" type="text" className="validate" autoComplete="off"></input>
              <label htmlFor="first">First Name</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input onChange={handleChange} id="last" name="last" type="text" className="validate" autoComplete="off"></input>
              <label htmlFor="last">Last Name</label>
            </div>
          </div>
        </>
      )}
      <div className="row">
        <form onSubmit={handleSubmit} className="col s12 login-form" >
            <div className="row">
                <div className="input-field col s12">
                <i className="material-icons prefix">picture_in_picture</i>
                <input onChange={handleChange} id="netid" name="netid" type="text" className="validate" autoComplete="off"></input>
                <label htmlFor="netid">Net ID</label>
                </div>
            </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input onChange={handleChange} id="password" name="password" type="password" className="validate" autoComplete="off"></input>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <button className="blue btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">navigate_next</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default connect(({ error }) => ({ error }), { register, login })(Login);