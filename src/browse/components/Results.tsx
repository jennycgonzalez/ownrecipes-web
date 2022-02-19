import { PaginationProps } from '../constants/DefaultFilters';
import { SearchResult } from '../store/SearchTypes';
import ListRecipes from './ListRecipes';
import Pagination from './Pagination';

export interface IResultsProps {
  search:   SearchResult;
  qs:       Record<string, string>;
  defaults: Partial<PaginationProps>;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

function toNumberDefault(val: string | undefined, defIfNull: number): number {
  if (val == null) return defIfNull;

  try {
    const parsedVal = parseInt(val);
    if (Number.isNaN(parsedVal)) {
      return defIfNull;
    }
    return parsedVal;
  } catch (_err) {
    return defIfNull;
  }
}

const Results: React.FC<IResultsProps> = ({ search, qs, defaults, buildUrl }: IResultsProps) => (
  <>
    <ListRecipes
        // format='col-xs-12 col-sm-6 col-md-4 col-lg-3'
        data={search.recipes} />
    <Pagination
        limit={toNumberDefault(qs.limit, defaults.limit ?? 12)}
        count={search.totalRecipes}
        offset={toNumberDefault(qs.offset, defaults.offset ?? 0)}
        buildUrl={buildUrl} />
  </>
);

export default Results;
