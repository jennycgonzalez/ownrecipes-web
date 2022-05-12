import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Accordion } from 'react-bootstrap';

import Icon from '../../common/components/Icon';
import { optionallyFormatMessage } from '../../common/utility';
import Tooltip from '../../common/components/Tooltip';
import ConditionalWrapper from '../../common/components/ConditionalWrapper';

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
  const intl = useIntl();
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

      const translatedTitle = optionallyFormatMessage(intl, `${qsTitle}.`, item.title);

      return (
        <li key={item.slug}>
          <ConditionalWrapper
              condition = {translatedTitle.length > 10}
              render = {childr => <Tooltip id={item.title} tooltip={translatedTitle} placement='bottom' className='filter-title-tooltip'>{childr}</Tooltip>}>
            <Link to={buildUrl(qsTitle, item.slug, multiSelect)} className={classNames({ 'list-group-item list-group-item-action': true, active: active })}>
              <div className='name'>{translatedTitle}</div>
              <span className='count'>{`(${item.total})`}</span>
              {active && <Icon icon='x-square' variant='light' />}
            </Link>
          </ConditionalWrapper>
        </li>
      );
  }) ?? [];
  items = items.filter(it => it != null);

  if (items.length === 0) return null;

  return (
    <Accordion.Item eventKey={qsTitle} className={classNames('filter-group', cssClass)}>
      <Accordion.Header as='h3' className='list-group-title'>{title}</Accordion.Header>
      <Accordion.Body as='ul' className='filter-list'>
        {items}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Filter;
