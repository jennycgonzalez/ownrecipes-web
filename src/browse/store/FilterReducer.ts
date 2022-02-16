import { combineReducers, Reducer } from 'redux';
import { ACTION } from '../../common/store/ReduxHelper';
import { FilterAction, FilterState } from './FilterTypes';

export const BROWSE_FILTER_COURSE  = 'BROWSE_FILTER_COURSE';
export const BROWSE_FILTER_CUISINE = 'BROWSE_FILTER_CUISINE';
export const BROWSE_FILTER_RATING  = 'BROWSE_FILTER_RATING';

function createFilterWithNamedType(filterName = '') {
  return function filter(state = { results: {}, loading: false, error: false }, action: FilterAction) {
    if ((action as any).filterName !== filterName) {
      return state;
    }

    switch (action.type) {
      case ACTION.ERROR:
        return { ...state, error: true };
      case ACTION.LOADING:
        return { ...state, loading: true };
      case ACTION.GET_SUCCESS:
        {
          const newFilter: Record<string, any> = {};
          newFilter[action.qs] = action.res;

          return {
            results: { ...state.results, ...newFilter },
            loading: false,
            error: false,
          };
        }
      default:
        return state;
    }
  };
}

const filters: Reducer<FilterState, FilterAction> = combineReducers({
  courses:  createFilterWithNamedType(BROWSE_FILTER_COURSE),
  cuisines: createFilterWithNamedType(BROWSE_FILTER_CUISINE),
  ratings:  createFilterWithNamedType(BROWSE_FILTER_RATING),
});

export default filters;
