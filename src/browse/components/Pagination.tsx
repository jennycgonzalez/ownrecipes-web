import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

export interface IPaginationProps {
  offset:   string;
  limit:    string;
  count:    string;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

interface IPaginationLinkProps {
  title:  string;
  offset: number;
  active: boolean;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

const PaginationLink: React.FC<IPaginationLinkProps> = ({ title, offset, active, buildUrl }: IPaginationLinkProps) => (
  <li className={classNames({ 'page-item': true, active: active })}>
    <Link className='page-link' to={buildUrl('offset', String(offset))}>
      {title}
    </Link>
  </li>
);

interface IPaginationNumbersListProps {
  offset: number;
  limit:  number;
  count:  number;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

const PaginationNumbersList: React.FC<IPaginationNumbersListProps> = ({ offset, limit, count, buildUrl }: IPaginationNumbersListProps) => {
  const numberList: Array<React.ReactNode> = [];

  const min = 2, max = 5;
  let floor = Math.floor(count / limit);
  floor = count % limit === 0 ? floor : floor + 1;

  // Make sure we start at the min value
  let start = offset / limit - min < 1 ? 1 : offset / limit - min;
  // Make sure we start at the max value
  start = start > floor - max ? floor - max : start;
  // Only show data if we have results
  start = start < 1 ? 1 : start;

  for (let i = start; i < floor && i < max + start; i++) {
    numberList.push(<PaginationLink title={String(i + 1)} offset={limit * i} key={String(i + 1)} active={offset === limit * i} buildUrl={buildUrl} />);
  }
  return <>{numberList}</>;
};

const Pagination: React.FC<IPaginationProps> = ({ offset, limit, count, buildUrl }: IPaginationProps) => {
  const offsetNumber = offset ? parseInt(offset) : 0;
  const limitNumber = limit ? parseInt(limit) : 0;
  const countNumber = count ? parseInt(count) : 0;
  const next = offsetNumber + limitNumber;
  const previous = offsetNumber - limitNumber;

  return (
    <div className='text-center'>
      <ul className='pagination'>
        {previous >= 0 && <PaginationLink title='←' offset={previous} key='previous' active buildUrl={buildUrl} />}
        <PaginationLink title='1' offset={0} key='first' active={offsetNumber === 0} buildUrl={buildUrl} />
        <PaginationNumbersList offset={offsetNumber} limit={limitNumber} count={countNumber} buildUrl={buildUrl} />
        {next < countNumber && <PaginationLink title='→' offset={next} key='next' active buildUrl={buildUrl} />}
      </ul>
    </div>
  );
};

export default Pagination;
