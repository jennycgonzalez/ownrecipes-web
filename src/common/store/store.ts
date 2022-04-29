// eslint-disable-next-line camelcase
import { applyMiddleware, legacy_createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from '../../app/Store';

let data;
if (process.env.REACT_APP_DEMO === 'demo') {
  // eslint-disable-next-line global-require
  data = require('../demo/data.json');
}

const store = legacy_createStore(
  reducer,
  data,
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;
