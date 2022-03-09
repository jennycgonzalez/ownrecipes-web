import ReduxHelper from '../../common/store/ReduxHelper';
import { BROWSER_SEARCH_STORE, SearchAction, SearchResult, SearchState } from './SearchTypes';

const defaultState: SearchState = ReduxHelper.getMapReducerDefaultState<SearchResult>(BROWSER_SEARCH_STORE);

const searchReducer = (state = defaultState, action: SearchAction): SearchState => (
  // TODO listen for RECIPE_FORM_STORE.RECIPE_FORM_SUBMIT
  ReduxHelper.caseMapDefaultReducer(state, action, defaultState)
);

export default searchReducer;
