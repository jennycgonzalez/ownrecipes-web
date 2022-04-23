import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from '../../app/Store';
import { isDemoMode } from '../utility';

let data;
if (isDemoMode()) {
  // eslint-disable-next-line global-require
  data = require('../demo/data.json');
}

const store = createStore(
  reducer,
  data,
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;
