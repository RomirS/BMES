import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register, login } from '../actions/authActions';

class Login extends Component {
  state = {
    first: '',
    last: '',
    netid: '',
    password: '',
    confirm: null,
    err: null
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object,
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, auth } = this.props;
    if(error !== prevProps.error) {
        if(error.id === 'CONFIRM_SIGNUP') {
            this.setState({
              confirm: {
                msg: error.msg,
                show: true
              }
            });
        } else if(error.id === 'LOGIN_FAIL' || error.id === 'REGISTER_FAIL') {
            this.setState({
              err: {
                msg: error.msg,
                show: true
              }
            });
        } else {
            this.setState({
                msg: null
            });
        }
    }
    if(auth.isAuthenticated) this.props.history.push('/home');
  }

  clear = () => {
    this.setState({
      confirm: {
        ...this.state.confirm,
        show: false
      }
    });
  };

  clearErr = () => {
    this.setState({
      err: {
        ...this.state.err,
        show: false
      }
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { first, last, netid, password } = this.state;

    if (this.state.confirm) this.props.register({first, last, netid, password});
    else this.props.login({netid, password});
  };

  render() {
    return (
        <div className="container" style={{marginTop: '10rem'}}>
          <div className="row">
            <h1>Sign in with Illinois</h1>
          </div>
          {this.state.err && this.state.err.show ? (
            <div className="row valign-wrapper">
              <div className="col s1">
                <button className="btn-floating btn-medium waves-effect waves-light red lighten-3 z-depth-0" onClick={this.clearErr}>
                  <i className="material-icons">clear</i>
                </button>
              </div>
              <div className="col s11 red lighten-3 white-text" style={{borderRadius: '4px', padding: '1rem'}}>
                {this.state.err.msg}
              </div>
            </div>
          ) : null}
          {this.state.confirm ? (
            <>
              {this.state.confirm.show ? (
                <div className="row valign-wrapper">
                  <button className="btn-floating btn-medium waves-effect waves-light teal lighten-3 z-depth-0" onClick={this.clear}>
                    <i className="material-icons">clear</i>
                  </button>
                  <div className="col s11 teal lighten-3 white-text" style={{borderRadius: '4px', padding: '1rem'}}>
                    {this.state.confirm.msg}
                  </div>
                </div>
              ): null}
              <div className="row">
                <div className="input-field col s6">
                  <i className="material-icons prefix">account_circle</i>
                  <input onChange={this.handleChange} id="first" name="first" type="text" className="validate" autoComplete="off"></input>
                  <label htmlFor="first">First Name</label>
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">account_circle</i>
                  <input onChange={this.handleChange} id="last" name="last" type="text" className="validate" autoComplete="off"></input>
                  <label htmlFor="last">Last Name</label>
                </div>
              </div>
            </>
          ) : null}
          <div className="row">
            <form onSubmit={this.handleSubmit} className="col s12 login-form">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">picture_in_picture</i>
                  <input onChange={this.handleChange} id="netid" name="netid" type="text" className="validate" autoComplete="off"></input>
                  <label htmlFor="netid">Net ID</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input onChange={this.handleChange} id="password" name="password" type="password" className="validate" autoComplete="off"></input>
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
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { register, login })(Login);