import { Course, Cuisine, RecipeList } from '../../recipe/store/RecipeTypes';
import { SearchResult } from '../../browse/store/SearchTypes';
import SearchResults from '../../browse/containers/SearchResults';

import SearchMenu from './SearchMenu';

export interface ISearchProps {
  search:   Record<string, SearchResult> | undefined;
  courses:  Array<Course>| undefined;
  cuisines: Array<Cuisine> | undefined;
  qs:       Record<string, string>;
  qsString: string;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
  onOpenRecipe: (rec: RecipeList) => void;
}

const Search: React.FC<ISearchProps> = ({
    search, courses, cuisines, qs, qsString,
    buildUrl, onOpenRecipe }: ISearchProps) => {
  const qsSearchResult = search?.[qsString];

  return (
    <>
      <SearchMenu
          qs       = {qs}
          search   = {qsSearchResult}
          courses  = {courses}
          cuisines = {cuisines}
          buildUrl = {buildUrl}
          />
      <SearchResults
          qs       = {qs}
          qsString = {qsString}
          buildUrl = {buildUrl}
          onOpenRecipe = {onOpenRecipe}
      />
    </>
  );
};

export default Search;
