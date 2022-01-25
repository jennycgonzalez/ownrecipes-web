import { combineReducers } from 'redux';

import filters from './FilterReducer';
import search from './SearchReducer';
import miniBrowse from './MiniBrowseReducer';

const browse = combineReducers({
  search,
  filters,
  miniBrowse,
});

export default browse;
