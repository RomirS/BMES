import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { register, login } from 'redux/actions/authActions';

const initFormState = {
  first: '',
  last: '',
  netid: '',
  password: '',
}

const initErrorState = {
  confirm: {
    msg: null,
    show: false,
  },
  err: {
    msg: null,
    show: false,
  },
}

const Login = ({ auth, error, register, login, history }) => {
  const [formState, setFormState] = useState(initFormState);
  const [errorState, setErrorState] = useState(initErrorState);
  const [mustRegister, setMustRegister] = useState(false);

  useEffect(() => {
    if(error.id === 'CONFIRM_SIGNUP') {
      setErrorState({
        confirm: {
          msg: error.msg,
          show: true
        },
        err: errorState.err
      });
      setMustRegister(true);
  } else if(error.id === 'LOGIN_FAIL' || error.id === 'REGISTER_FAIL') {
    setErrorState({
      confirm: errorState.confirm,
      err: {
        msg: error.msg,
        show: true
      }
    });
  } else {
    setErrorState(initErrorState);
  }
  }, [error]);

  useEffect(() => {
    if (auth.isAuthenticated) history.push('/home');
  }, [auth, history]);

  const clear = (key) => {
    if (key === 'confirm' || key === 'err') {
      var clearError = errorState;
      clearError[key] = initErrorState[key];
      setErrorState(clearError);
    }
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
      {errorState.err.show && (
        <div className="row valign-wrapper">
          <div className="col s1">
            <button className="btn-floating btn-medium waves-effect waves-light red lighten-3 z-depth-0" onClick={() => clear('err')}>
              <i className="material-icons">clear</i>
            </button>
          </div>
          <div className="col s11 red lighten-3 white-text" style={{borderRadius: '4px', padding: '1rem'}}>
            {errorState.err.msg}
          </div>
        </div>
      )}
      {mustRegister && (
        <>
          {errorState.confirm.show && (
            <div className="row valign-wrapper">
              <button className="btn-floating btn-medium waves-effect waves-light teal lighten-3 z-depth-0" onClick={() => clear('confirm')}>
                <i className="material-icons">clear</i>
              </button>
              <div className="col s11 teal lighten-3 white-text" style={{borderRadius: '4px', padding: '1rem'}}>
                {errorState.confirm.msg}
              </div>
            </div>
          )}
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

export default connect(({ auth, error }) => ({ auth, error }), { register, login })(Login);