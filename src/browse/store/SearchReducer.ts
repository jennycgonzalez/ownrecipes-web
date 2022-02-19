import ReduxHelper, { ACTION } from '../../common/store/ReduxHelper';
import { BROWSER_SEARCH_STORE, SearchAction, SearchResult, SearchState } from './SearchTypes';

const defaultState: SearchState = ReduxHelper.getMapReducerDefaultState<SearchResult>(BROWSER_SEARCH_STORE);

const searchReducer = (state = defaultState, action: SearchAction): SearchState => {
  if (action.store === BROWSER_SEARCH_STORE) {
    switch (action.type) {
      case ACTION.GET_SUCCESS:
        return ReduxHelper.setMapItem(state, action.qs, action.data);
      default:
        break;
    }
  }

  return ReduxHelper.caseMapDefaultReducer(state, action, defaultState);
};

export default searchReducer;
