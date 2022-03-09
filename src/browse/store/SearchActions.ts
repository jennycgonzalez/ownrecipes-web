import queryString from 'query-string';

import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { BROWSER_SEARCH_STORE, SearchDispatch, SearchResultDto, toSearchResult } from './SearchTypes';
import { ACTION } from '../../common/store/ReduxHelper';

// eslint-disable-next-line import/prefer-default-export
export const loadRecipes = (filters: Record<string, string>) => (dispatch: SearchDispatch) => {
  dispatch({ store: BROWSER_SEARCH_STORE, type: ACTION.LOADING });

  const map: Record<string, string> = {
    cuisine: 'cuisine__slug',
    course: 'course__slug',
  };

  const parsedFilters: Record<string, string> = {};
  Object.keys(filters).forEach(f => {
    if (filters[f] !== null) {
      parsedFilters[f in map ? map[f] : f] = filters[f];
    }
  });

  request()
    .get(serverURLs.browse)
    .query(parsedFilters)
    .then(res => {
      const resDto: SearchResultDto = res.body;
      dispatch({
        store: BROWSER_SEARCH_STORE,
        type:  ACTION.GET_SUCCESS,
        id:    queryString.stringify(filters),
        data:  toSearchResult(resDto),
      });
    })
    .catch(err => { dispatch(handleError(err, BROWSER_SEARCH_STORE)); });
};
