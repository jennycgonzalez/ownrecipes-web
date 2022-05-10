import { Col, Row } from 'react-bootstrap';

import SearchMenu from './SearchMenu';
import SearchBar from './SearchBar';
import Loading from './Loading';
import SearchSummary from './SearchSummary';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { CategoryCount, RatingCount } from '../store/FilterTypes';
import { SearchResult } from '../store/SearchTypes';
import SearchResults from '../containers/SearchResults';

export interface ISearchProps {
  search:   Record<string, SearchResult> | undefined;
  courses:  Record<string, CategoryCount[]> | undefined;
  cuisines: Record<string, CategoryCount[]> | undefined;
  ratings:  Record<string, RatingCount[]> | undefined;
  tags:     Record<string, CategoryCount[]> | undefined;
  qs:       Record<string, string>;
  qsString: string;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
  doSearch: (value: string) => void;
  onOpenRecipe: (rec: RecipeList) => void;
}

const Search: React.FC<ISearchProps> = ({
    search, courses, cuisines, ratings, tags, qs, qsString,
    buildUrl, doSearch, onOpenRecipe }: ISearchProps) => {
  const isInit  = search != null && Object.keys(search).length > 0;
  const qsSearchResult = search?.[qsString];

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
      {!isInit && (
        <Loading />
      )}
      {isInit && (
        <Row>
          <Col xs={12} className='filter-panel'>
            <SearchMenu
                courses  = {courses?.[qsString]}
                cuisines = {cuisines?.[qsString]}
                ratings  = {ratings?.[qsString]}
                tags     = {tags?.[qsString]}
                qs       = {qs}
                buildUrl = {buildUrl}
            />
          </Col>
          <Col xs={12} className='results-panel'>
            <SearchResults
                qs       = {qs}
                qsString = {qsString}
                buildUrl = {buildUrl}
                onOpenRecipe = {onOpenRecipe}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Search;
