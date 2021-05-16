import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import store from 'redux/store';
import Router from './Router';
import { loadUser } from 'redux/actions/authActions';

const App = () => {
  useEffect(() => store.dispatch(loadUser()), []);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
