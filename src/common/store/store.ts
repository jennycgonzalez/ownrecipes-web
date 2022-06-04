// eslint-disable-next-line camelcase
import { applyMiddleware, compose, legacy_createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from '../../app/Store';

let data;
if (process.env.REACT_APP_DEMO === 'demo') {
  // eslint-disable-next-line global-require
  data = require('../../demo/store/data.json');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  reducer,
  data,
  composeEnhancers(
    applyMiddleware(thunkMiddleware)
  )
);

export default store;
