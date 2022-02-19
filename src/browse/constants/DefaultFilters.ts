export type PaginationProps = {
  limit:  number;
  offset: number;
  count:  number;
}

const defaultFilters: Partial<PaginationProps> = {
  limit: 12,
  offset: 0,
};

export default defaultFilters;
