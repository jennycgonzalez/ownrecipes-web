import { Dispatch as ReduxDispatch } from 'redux';

import MapReducerType from '../../common/store/MapReducerType';
import { ACTION, GenericReducerAction } from '../../common/store/ReduxHelper';

export type CategoryCount = {
  id:     number;
  total:  number;
  title:  string; // Category title, e. g. "Entry".
  slug:   string; // Category title slug, e.g. "entry".
  author: number;
}

export type RatingCount = {
  rating: number;
  total:  number;
}

export const BROWSE_FILTER_COURSE_STORE  = '@@BROWSE_FILTER_COURSE';
export const BROWSE_FILTER_CUISINE_STORE = '@@BROWSE_FILTER_CUISINE';
export const BROWSE_FILTER_RATING_STORE  = '@@BROWSE_FILTER_RATING';

export interface IFilterDataAction {
  store: typeof BROWSE_FILTER_COURSE_STORE | typeof BROWSE_FILTER_CUISINE_STORE;
  type:  typeof ACTION.GET_SUCCESS;
  qs:    string;
  data:  Array<CategoryCount>;
}

export interface IFilterRatingDataAction {
  store: typeof BROWSE_FILTER_RATING_STORE;
  type:  typeof ACTION.GET_SUCCESS;
  qs:    string;
  data:  Array<RatingCount>;
}

export type CategoryCountState = MapReducerType<Array<CategoryCount>>;
export type RatingCountState   = MapReducerType<Array<RatingCount>>;

export type FilterAction = IFilterDataAction | IFilterRatingDataAction | GenericReducerAction;
export type FilterDispatch = ReduxDispatch<FilterAction>;
export type FilterState = {
  courses:  CategoryCountState,
  cuisines: CategoryCountState,
  ratings:  RatingCountState,
};
