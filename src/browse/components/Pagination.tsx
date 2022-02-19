import React from 'react';
import { Pagination as BootstraPagination } from 'react-bootstrap';

import { PaginationLink } from '../../common/components/Pagination';

export interface IPaginationProps {
  offset:   number;
  limit:    number;
  count:    number;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

interface IPaginationNumbersListProps {
  offset: number;
  limit:  number;
  count:  number;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

const PaginationNumbersList: React.FC<IPaginationNumbersListProps> = ({ offset, limit, count, buildUrl }: IPaginationNumbersListProps) => {
  const numberList: Array<React.ReactNode> = [];
  numberList.push(<PaginationLink title='1' offset={0} key='0' active={offset === 0} buildUrl={buildUrl} />);

  const min = 2, max = 5;
  let numOfPages = Math.floor(count / limit);
  numOfPages = count % limit === 0 ? numOfPages : numOfPages + 1;
  if (numOfPages > max) {
    numOfPages = max;
  }

  // Make sure we start at the min value
  let start = Math.max(2, offset / limit - min);
  // Make sure we start at the max value
  if (start > numOfPages - max) {
    start = numOfPages - max;
  }
  // Only show data if we have results
  start = Math.max(2, start);

  for (let i = start; i <= numOfPages; i++) {
    numberList.push(<PaginationLink title={String(i)} offset={limit * (i - 1)} key={String(i)} active={offset === limit * (i - 1)} buildUrl={buildUrl} />);
  }
  return <>{numberList}</>;
};

const Pagination: React.FC<IPaginationProps> = ({ offset, limit, count, buildUrl }: IPaginationProps) => {
  const next = offset + limit;
  const previous = offset - limit;

  if (count <= limit) return null;

  return (
    <div>
      <BootstraPagination>
        <PaginationLink title='←' offset={previous} key='previous' buildUrl={buildUrl} disabled={previous < 0} />
        <PaginationNumbersList    offset={offset}   limit={limit}  buildUrl={buildUrl} count={count} />
        <PaginationLink title='→' offset={next}     key='next'     buildUrl={buildUrl} disabled={next > count} />
      </BootstraPagination>
    </div>
  );
};

export default Pagination;
