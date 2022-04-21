import { useSelector } from 'react-redux';

import DefaultFilters from '../constants/DefaultFilters';
import Results from '../components/Results';
import NoResults from '../components/NoResults';
import Loading from '../components/Loading';
import { PendingState } from '../../common/store/GenericReducerType';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { CombinedStore } from '../../app/Store';

export interface ISearchResultsProps {
  qs:       Record<string, string>;
  qsString: string;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
  onOpenRecipe: (rec: RecipeList) => void;
}

const SearchResults: React.FC<ISearchResultsProps> = ({ qs, qsString, buildUrl, onOpenRecipe }: ISearchResultsProps) => {
  const searchState = useSelector((state: CombinedStore) => state.browse.search);
  const pending = searchState.pending === PendingState.LOADING;
  const qsSearchResult = searchState.items?.get(qsString);

  return (
    <>
      {pending && <Loading />}
      {!pending && (qsSearchResult == null || qsSearchResult.recipes.length === 0) && <NoResults />}
      {!pending && qsSearchResult != null && qsSearchResult.recipes.length > 0 && (
        <Results
            search   = {qsSearchResult}
            qs       = {qs}
            defaults = {DefaultFilters}
            buildUrl = {buildUrl}
            onOpenRecipe = {onOpenRecipe}
        />
      )}
    </>
  );
};

export default SearchResults;
