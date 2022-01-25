import { combineReducers } from 'redux';

import ratings from './RatingsReducer';

const rating = combineReducers({
  ratings,
});

export default rating;
