import { ACTION } from '../../common/store/ReduxHelper';
import { BROWSER_SEARCH_STORE, SearchAction, SearchResultsItem, SearchState } from './SearchTypes';

const defaultState: SearchState = { results: { recipes: [], totalRecipes: 0 }, loading: true };

const searchReducer = (state = defaultState, action: SearchAction): SearchState => {
  if (action.store !== BROWSER_SEARCH_STORE) return state;

  switch (action.type) {
    case ACTION.LOADING:
      return { ...state, loading: true };
    case ACTION.GET_SUCCESS:
      {
        const newSearch: Record<string, SearchResultsItem> = {};
        newSearch[action.qs] = {
          recipes: action.res.results,
          totalRecipes: action.res.count,
        };

        return {
          results: { ...state.results, ...newSearch },
          loading: false,
        };
      }
    case ACTION.RESET:
      return defaultState;
    default:
      return state;
  }
};

export default searchReducer;
