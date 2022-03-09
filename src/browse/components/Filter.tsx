import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Icon from '../../common/components/Icon';

export type RecipeFilter = {
  id:      number;
  title:   string;
  slug:    string;
  total?:  number;
  rating?: number;
}

export interface IFilterProps {
  title:   string;
  qsTitle: string;
  qs:      Record<string, string>;
  data:    Array<RecipeFilter>;
  multiSelect?: boolean;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;

  cssClass?: string;
}

const Filter: React.FC<IFilterProps> = ({ title, qsTitle, data, qs, multiSelect, cssClass, buildUrl }: IFilterProps) => {
  let items = data
    .map(item => {
      let active = false;
      if (qs[qsTitle]) {
        if (qs[qsTitle].split(',').includes(item.slug)) {
          active = true;
        }
      }

      if (!active && (item.total == null || item.total === 0)) {
        return undefined;
      }

      return (
        <li key={item.slug}>
          <Link to={buildUrl(qsTitle, item.slug, multiSelect)} className={classNames({ 'list-group-item list-group-item-action': true, active: active })}>
            {item.title}
            <span className='count'>{`(${item.total})`}</span>
            {active && <Icon icon='x-square' variant='light' />}
          </Link>
        </li>
      );
  }) ?? [];
  items = items.filter(it => it != null);

  if (items.length === 0) return null;

  return (
    <li className={classNames('filter-group', cssClass)}>
      <div className='list-group-title'>{title}</div>
      <ul className='filter-list'>
        {items}
      </ul>
    </li>
  );
};

export default Filter;
