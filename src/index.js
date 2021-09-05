import React from 'react';
import ReactDOM from 'react-dom';
import './scss/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import App from './containers/App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers/index'
import middleware from './middleware/index'

const store = createStore(reducers, middleware)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
