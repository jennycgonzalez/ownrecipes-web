import { Col, Container, Row } from 'react-bootstrap';

import { PaginationProps } from '../constants/DefaultFilters';
// import { SearchState } from '../store/SearchTypes';
import SearchMenu from './SearchMenu';
import SearchBar from './SearchBar';
import Results from './Results';
import NoResults from './NoResults';
import Loading from './Loading';

export interface ISearchProps {
  search:   any; // SearchState;
  courses:  any;
  cuisines: any;
  ratings:  any;
  qs:       Record<string, string>;
  qsString: string;

  defaultFilters: Partial<PaginationProps>;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
  doSearch: (value: string) => void;
}

const Search: React.FC<ISearchProps> = ({ search, courses, cuisines, ratings, qs, qsString, defaultFilters, buildUrl, doSearch }: ISearchProps) => {
  if (Object.keys(search.results).length > 0) {
    return (
      <Container>
        <Row>
          <Col xs={12} sm={3} lg={2}>
            <SearchMenu
                courses  = {courses.results[qsString]}
                cuisines = {cuisines.results[qsString]}
                ratings  = {ratings.results[qsString]}
                loading  = {courses.loading || cuisines.loading || ratings.loading}
                error    = {courses.error   || cuisines.error   || ratings.error}
                qs       = {qs}
                buildUrl = {buildUrl}
            />
          </Col>
          <Col xs={12} sm={9} lg={10}>
            <SearchBar
                count={search.results[qsString]?.totalRecipes ?? 0}
                value={qs.search ?? ''}
                doSearch={doSearch} />
            {search.loading && <Loading />}
            {!search.loading && (!search.results[qsString] || search.results[qsString].recipes.length === 0) && <NoResults />}
            {!search.loading && search.results[qsString] && search.results[qsString].recipes.length > 0 && (
              <Results
                  search={search.results[qsString]}
                  qs={qs}
                  defaults={defaultFilters}
                  buildUrl={buildUrl}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Loading />;
  }
};

export default Search;
