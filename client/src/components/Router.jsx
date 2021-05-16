import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';
import Home from './Home';
import Stats from './Stats';

const Router = ({ auth }) => (
  <>
  {auth.hasLoaded && (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          {auth.isAuthenticated ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <Route exact path='/login'>
          {auth.isAuthenticated ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route exact path='/home'>
          {!auth.isAuthenticated ? <Redirect to="/login" /> : <Home />}
        </Route>
        <Route exact path='/stats'>
          {!auth.isAuthenticated ? <Redirect to="/login" /> : <Stats />}
        </Route>
      </Switch>
    </BrowserRouter>
  )}
  </>
);

export default connect(({ auth }) => ({ auth }))(Router);