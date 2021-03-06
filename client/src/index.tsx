import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './Store';
import { Provider } from 'react-redux';

import App from './App';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

