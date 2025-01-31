import queryString from 'query-string';

import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import { BROWSE_FILTER_COURSE_STORE, BROWSE_FILTER_CUISINE_STORE, BROWSE_FILTER_RATING_STORE, BROWSE_FILTER_TAGS_STORE, FilterDispatch } from './FilterTypes';

const parsedFilter = (filters: Record<string, string>): Record<string, string> => {
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
    store: BROWSE_FILTER_COURSE_STORE,
    type:  ACTION.LOADING,
  });

  request()
    .get(serverURLs.course_count)
    .query(parsedFilter(filters))
    .then(res => (
      dispatch({
        store: BROWSE_FILTER_COURSE_STORE,
        type:  ACTION.GET_SUCCESS,
        id:    queryString.stringify(filters),
        data:  res.body.results,
      })
    ))
    .catch(err => dispatch(handleError(err, BROWSE_FILTER_COURSE_STORE)));
};

export const loadCuisines = (filters: Record<string, string>) => (dispatch: FilterDispatch) => {
  dispatch({
    store: BROWSE_FILTER_CUISINE_STORE,
    type:  ACTION.LOADING,
  });

  request()
    .get(serverURLs.cuisine_count)
    .query(parsedFilter(filters))
    .then(res => (
      dispatch({
        store: BROWSE_FILTER_CUISINE_STORE,
        type:  ACTION.GET_SUCCESS,
        id:    queryString.stringify(filters),
        data:  res.body.results,
      })
    ))
    .catch(err => dispatch(handleError(err, BROWSE_FILTER_CUISINE_STORE)));
};

export const loadRatings = (filter: Record<string, string>) => (dispatch: FilterDispatch) => {
  dispatch({
    store: BROWSE_FILTER_RATING_STORE,
    type:  ACTION.LOADING,
  });

  request()
    .get(serverURLs.rating_count)
    .query(parsedFilter(filter))
    .then(res => (
      dispatch({
        store: BROWSE_FILTER_RATING_STORE,
        type:  ACTION.GET_SUCCESS,
        id:    queryString.stringify(filter),
        data:  res.body.results,
      })
    ))
    .catch(err => dispatch(handleError(err, BROWSE_FILTER_RATING_STORE)));
};

export const loadTags = (filters: Record<string, string>) => (dispatch: FilterDispatch) => {
  dispatch({
    store: BROWSE_FILTER_TAGS_STORE,
    type:  ACTION.LOADING,
  });

  request()
    .get(serverURLs.tag_count)
    .query(parsedFilter(filters))
    .then(res => (
      dispatch({
        store: BROWSE_FILTER_TAGS_STORE,
        type:  ACTION.GET_SUCCESS,
        id:    queryString.stringify(filters),
        data:  res.body.results,
      })
    ))
    .catch(err => {
      // Older backend versions may not support this action.
      if (err.status === 404) {
        dispatch({
          store: BROWSE_FILTER_TAGS_STORE,
          type:  ACTION.GET_SUCCESS,
          id:    queryString.stringify(filters),
          data:  [],
        });
      } else {
        dispatch(handleError(err, BROWSE_FILTER_TAGS_STORE));
      }
    });
};
