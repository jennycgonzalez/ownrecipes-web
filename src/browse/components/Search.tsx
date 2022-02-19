import { Col, Row } from 'react-bootstrap';

import { PaginationProps } from '../constants/DefaultFilters';
// import { SearchState } from '../store/SearchTypes';
import SearchMenu from './SearchMenu';
import SearchBar from './SearchBar';
import Results from './Results';
import NoResults from './NoResults';
import Loading from './Loading';
import { CategoryCountState, RatingCountState } from '../store/FilterTypes';
import { PendingState } from '../../common/store/GenericReducerType';
import { SearchState } from '../store/SearchTypes';
import SearchSummary from './SearchSummary';

export interface ISearchProps {
  search:   SearchState;
  courses:  CategoryCountState;
  cuisines: CategoryCountState;
  ratings:  RatingCountState;
  qs:       Record<string, string>;
  qsString: string;

  defaultFilters: Partial<PaginationProps>;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
  doSearch: (value: string) => void;
}

const Search: React.FC<ISearchProps> = ({ search, courses, cuisines, ratings, qs, qsString, defaultFilters, buildUrl, doSearch }: ISearchProps) => {
  if (search.items != null && search.items.size > 0) {
    const pending = search.pending === PendingState.LOADING;
    const qsSearchResult = search.items.get(qsString);

    return (
      <>
        <SearchBar
            value    = {qs.search ?? ''}
            doSearch = {doSearch} />
        <SearchSummary
            qs       = {qs}
            search   = {qsSearchResult}
            buildUrl = {buildUrl}
            />
        <Row>
          <Col xs={12} className='filter-panel'>
            <SearchMenu
                courses  = {courses.items?.get(qsString)}
                cuisines = {cuisines?.items?.get(qsString)}
                ratings  = {ratings?.items?.get(qsString)}
                qs       = {qs}
                buildUrl = {buildUrl}
            />
          </Col>
          <Col xs={12} className='results-panel'>
            {pending && <Loading />}
            {!pending && (qsSearchResult == null || qsSearchResult.recipes.length === 0) && <NoResults />}
            {!pending && qsSearchResult != null && qsSearchResult.recipes.length > 0 && (
              <Results
                  search   = {qsSearchResult}
                  qs       = {qs}
                  defaults = {defaultFilters}
                  buildUrl = {buildUrl}
              />
            )}
          </Col>
        </Row>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default Search;
