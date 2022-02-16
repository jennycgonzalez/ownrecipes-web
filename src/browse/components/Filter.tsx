import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Icon from '../../common/components/Icon';

export type RecipeFilter = {
  id:    number;
  title: string;
  slug:  string;
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
  const items = data.map(item => {
    let active = false;
    if (qs[qsTitle]) {
      if (qs[qsTitle].split(',').includes(item.slug.toString())) {
        active = true;
      }
    }

    return (
      <div key={item.slug}>
        <Link to={buildUrl(qsTitle, item.slug, multiSelect)} className={classNames({ 'list-group-item': true, active: active })}>
          {active && <Icon icon='x-square' variant='light' />}
          {item.title}
          {(item as any).total && <span className='badge'>{(item as any).total}</span>}
        </Link>
      </div>
    );
  });

  return (
    <div className={`list-group filter ${cssClass}`}>
      {title}
      {items}
    </div>
  );
};

export default Filter;
