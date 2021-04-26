import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './login';
import Home from './home';
import StatsPage from './stats';
import store from 'redux/store';
import { loadUser } from 'redux/actions/authActions';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/stats' component={StatsPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
