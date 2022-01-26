import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

// TODO initialize user token

let data;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (process.env.NODE_ENV === 'demo') {
  // eslint-disable-next-line global-require
  data = require('../demo/data.json');
}

const store = createStore(
  reducer,
  data,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
);

export default store;
