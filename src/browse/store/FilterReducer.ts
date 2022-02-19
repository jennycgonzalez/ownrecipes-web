import { combineReducers, Reducer } from 'redux';

import ReduxHelper, { ACTION } from '../../common/store/ReduxHelper';
import { BROWSE_FILTER_COURSE_STORE, BROWSE_FILTER_CUISINE_STORE, BROWSE_FILTER_RATING_STORE, CategoryCount, FilterAction, FilterState, RatingCount } from './FilterTypes';

const defaultCourseState  = ReduxHelper.getMapReducerDefaultState<Array<CategoryCount>>(BROWSE_FILTER_COURSE_STORE);
const defaultCuisineState = ReduxHelper.getMapReducerDefaultState<Array<CategoryCount>>(BROWSE_FILTER_CUISINE_STORE);
const defaultRatingsState = ReduxHelper.getMapReducerDefaultState<Array<RatingCount>>(BROWSE_FILTER_RATING_STORE);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createFilterWithNamedType(defaultState: any): Reducer<any, FilterAction> {
  return function filter(state = defaultState, action: FilterAction) {
    if (action.store === defaultState.ident) {
      switch (action.type) {
        case ACTION.GET_SUCCESS:
          return ReduxHelper.setMapItem(state, action.qs, action.data);
        default:
          break;
      }
    }

    return ReduxHelper.caseMapDefaultReducer(state, action, defaultState);
  };
}

const filters: Reducer<FilterState, FilterAction> = combineReducers({
  courses:  createFilterWithNamedType(defaultCourseState),
  cuisines: createFilterWithNamedType(defaultCuisineState),
  ratings:  createFilterWithNamedType(defaultRatingsState),
});

export default filters;
