import { Dispatch as ReduxDispatch } from 'redux';
import MapReducerType from '../../common/store/MapReducerType';
import { ACTION, GenericReducerAction } from '../../common/store/ReduxHelper';
import { RecipeList, RecipeListDto, toRecipeList } from '../../recipe/store/RecipeTypes';

export const BROWSER_SEARCH_STORE = '@@browserSearch';

export type SearchResultDto = {
  results: Array<RecipeListDto>;
  count:   number;
}

export type SearchResult = {
  recipes:      Array<RecipeList>;
  totalRecipes: number;
}

export const toSearchResult = (dto: SearchResultDto): SearchResult => ({
  recipes:      dto.results.map(recListDto => toRecipeList(recListDto)),
  totalRecipes: dto.count,
});

export interface ISearchDataAction {
  store: typeof BROWSER_SEARCH_STORE;
  type:  typeof ACTION.GET_SUCCESS;
  qs:    string;
  data:  SearchResult;
}

export type SearchAction = ISearchDataAction | GenericReducerAction;
export type SearchState  = MapReducerType<SearchResult>;
export type SearchDispatch = ReduxDispatch<SearchAction>;
