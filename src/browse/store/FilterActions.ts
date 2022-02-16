import queryString from 'query-string';

import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import { BROWSE_FILTER_COURSE, BROWSE_FILTER_CUISINE, BROWSE_FILTER_RATING } from './FilterReducer';
import { FilterDispatch, FILTER_STORE } from './FilterTypes';

const parsedFilter = (filters: Record<string, string>) => {
  const parsedFilters: Record<string, string> = {};
  Object.keys(filters).forEach(f => {
    if (!['limit', 'offset'].includes(f)) {
      parsedFilters[f] = filters[f];
    }
  });
  return parsedFilters;
};

export const loadCourses = (filters: Record<string, string>) => (dispatch: FilterDispatch) => {
  dispatch({
    store: FILTER_STORE,
    type:  ACTION.LOADING,
    filterName: BROWSE_FILTER_COURSE,
  });

  request()
    .get(serverURLs.course_count)
    .query(parsedFilter(filters))
    .then(res => (
      dispatch({
        store: FILTER_STORE,
        type:  ACTION.GET_SUCCESS,
        filterName: BROWSE_FILTER_COURSE,
        qs:  queryString.stringify(filters),
        res: res.body.results,
      })
    ))
    .catch(err => (
      dispatch({
        store: FILTER_STORE,
        type:  ACTION.ERROR,
        filterName: BROWSE_FILTER_COURSE,
        data: err,
      })
    ));
};

export const loadCuisines = (filters: Record<string, string>) => (dispatch: FilterDispatch) => {
  dispatch({
    store: FILTER_STORE,
    type:  ACTION.LOADING,
    filterName: BROWSE_FILTER_CUISINE,
  });

  request()
    .get(serverURLs.cuisine_count)
    .query(parsedFilter(filters))
    .then(res => (
      dispatch({
        store: FILTER_STORE,
        type:  ACTION.GET_SUCCESS,
        filterName: BROWSE_FILTER_CUISINE,
        qs: queryString.stringify(filters),
        res: res.body.results,
      })
    ))
    .catch(err => (
      dispatch({
        store: FILTER_STORE,
        type:  ACTION.ERROR,
        filterName: BROWSE_FILTER_CUISINE,
        data: err,
      })
    ));
};

export const loadRatings = (filter: Record<string, string>) => (dispatch: FilterDispatch) => {
  dispatch({
    store: FILTER_STORE,
    type:  ACTION.LOADING,
    filterName: BROWSE_FILTER_RATING,
  });

  request()
    .get(serverURLs.rating_count)
    .query(parsedFilter(filter))
    .then(res => (
      dispatch({
        store: FILTER_STORE,
        type:  ACTION.GET_SUCCESS,
        filterName: BROWSE_FILTER_RATING,
        qs:  queryString.stringify(filter),
        res: res.body.results,
      })
    ))
    .catch(err => (
      dispatch({
        store: FILTER_STORE,
        type:  ACTION.ERROR,
        filterName: BROWSE_FILTER_RATING,
        data: err,
      })
    ));
};
