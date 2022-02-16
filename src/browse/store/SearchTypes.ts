import { Dispatch as ReduxDispatch } from 'redux';
import { ACTION, GenericReducerAction } from '../../common/store/ReduxHelper';
import { RecipeList, RecipeListDto, toRecipeList } from '../../recipe/store/RecipeTypes';

export const BROWSER_SEARCH_STORE = '@@browserSearch';

export type SearchResultDto = {
  results: Array<RecipeListDto>;
  count:   number;
}

export type SearchResult = {
  results: Array<RecipeList>;
  count: number;
}

export const toSearchResult = (dto: SearchResultDto): SearchResult => ({
  results: dto.results.map(recListDto => toRecipeList(recListDto)),
  count:   dto.count,
});

export type SearchResultsItem = {
  recipes:      Array<RecipeList>;
  totalRecipes: number;
}

export interface ISearchDataAction {
  store: typeof BROWSER_SEARCH_STORE;
  type:  typeof ACTION.GET_SUCCESS;
  qs:  string;
  res: SearchResult;
}

export type SearchAction = ISearchDataAction | GenericReducerAction;
export type SearchDispatch = ReduxDispatch<SearchAction>;

export type SearchState = {
  results: SearchResultsItem;
  loading: boolean;
}
