import { Col, Container, Row } from 'react-bootstrap';
import { PaginationProps } from '../constants/DefaultFilters';
import { SearchResultsItem } from '../store/SearchTypes';
import ListRecipes from './ListRecipes';
import Pagination from './Pagination';

export interface IResultsProps {
  search:   SearchResultsItem;
  qs:       Record<string, string>;
  defaults: Partial<PaginationProps>;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

const Results: React.FC<IResultsProps> = ({ search, qs, defaults, buildUrl }: IResultsProps) => (
  <Container>
    <Row id='browse'>
      <ListRecipes
          // format='col-xs-12 col-sm-6 col-md-4 col-lg-3'
          data={search.recipes} />
    </Row>
    <Row>
      <Col xs={12}>
        <Pagination
            limit={qs.limit || (defaults.limit as unknown as string)} // TODO
            count={search.totalRecipes as unknown as string}
            offset={qs.offset || (defaults.offset as unknown as string)}
            buildUrl={buildUrl} />
      </Col>
    </Row>
  </Container>
);

export default Results;
