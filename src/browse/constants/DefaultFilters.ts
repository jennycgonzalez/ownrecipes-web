export type PaginationProps = {
  limit:  number;
  offset: number;
  count:  number;
}

const defaultFilters: Partial<PaginationProps> = {
  limit: 12,
};

export default defaultFilters;
