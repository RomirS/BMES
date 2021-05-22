import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

// removed "main": "lib/index.js" from
// bmesillinois/client/node_modules/react-dev-utils/node_modules/loader-utils/lib/index.js