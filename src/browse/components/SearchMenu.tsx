import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { injectIntl, defineMessages, WrappedComponentProps } from 'react-intl';

import '../css/filter.css';

import Filter from './Filter';
import { Col, Container, Row } from 'react-bootstrap';
import Icon from '../../common/components/Icon';

export interface ISearchMenuProps extends WrappedComponentProps {
  qs: Record<string, string>;
  courses:  any;
  cuisines: any;
  ratings:  any;

  loading:  boolean;
  error:    boolean;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

interface ISearchMenuState {
  showMenu: boolean;
}

class SearchMenu extends React.Component<ISearchMenuProps, ISearchMenuState> {
  constructor(props: ISearchMenuProps) {
    super(props);

    this.state = {
      showMenu: false,
    };
  }

  shouldComponentUpdate(nextProps: ISearchMenuProps) {
    if (nextProps.loading
        || (
            nextProps.courses     === undefined
            && nextProps.cuisines === undefined
            && nextProps.ratings  === undefined
            && !nextProps.error
        )
    ) {
      return false;
    }
    return true;
  }

  toggleMenu = () => {
    this.setState(prev => ({ showMenu: !prev.showMenu }));
  };

  render() {
    const { courses, cuisines, ratings, qs, buildUrl, intl } = this.props;
    const messages = defineMessages({
      reset: {
        id: 'filter.reset',
        description: 'Filter reset',
        defaultMessage: 'Reset',
      },
      filter_course: {
        id: 'filter.filter_course',
        description: 'Filter field course',
        defaultMessage: 'Courses',
      },
      filter_cuisine: {
        id: 'filter.filter_cuisine',
        description: 'Filter field cuisine',
        defaultMessage: 'Cuisines',
      },
      filter_rating: {
        id: 'filter.filter_rating',
        description: 'Filter field rating',
        defaultMessage: 'Ratings',
      },
      filter_limit: {
        id: 'filter.filter_limit',
        description: 'Filter field limit',
        defaultMessage: 'Recipes per Page',
      },
      title: {
        id: 'filter.title',
        description: 'Title',
        defaultMessage: 'Title',
      },
      rating: {
        id: 'filter.rating',
        description: 'rating',
        defaultMessage: 'Rating',
      },
      pub_date: {
        id: 'filter.pub_date',
        description: 'pub_date',
        defaultMessage: 'Created Date',
      },
      filters: {
        id: 'filter.filters',
        description: 'Filters',
        defaultMessage: 'Filters',
      },
      show_filters: {
        id: 'filter.show_filters',
        description: 'Show Filters',
        defaultMessage: 'Show Filters',
      },
      hide_filters: {
        id: 'filter.hide_filters',
        description: 'Hide Filters',
        defaultMessage: 'Hide Filters',
      },
      filter_ordering: {
        id: 'filter.filter_ordering',
        description: 'Filter field ordering',
        defaultMessage: 'Ordering',
      },
      x_stars: {
        id: 'filter.x_stars',
        description: 'X Stars',
        defaultMessage: '{rating, number} stars',
      },
    });

    const activeFilter = Object.keys(qs).length !== 0;

    const resetLink = (
      <Link className='btn btn-default btn-danger reset-search hidden-xs' to={buildUrl('', '')}>
        {intl.formatMessage(messages.reset)}
      </Link>
    );

    const mobileResetLink = (
      <Link className='clear-filter-mobile btn btn-danger' to={buildUrl('', '')}>
        {intl.formatMessage(messages.reset)}
      </Link>
    );

    let mobileText = (
      <span>
        {intl.formatMessage(messages.show_filters)}
        <Icon icon='chevron-down' variant='light' className={classNames({ 'reset-margin': activeFilter })} />
      </span>
    );
    if (this.state.showMenu) {
      mobileText = (
        <span>
          {intl.formatMessage(messages.hide_filters)}
          <Icon icon='chevron-up' variant='light' className={classNames({ 'reset-margin': activeFilter })} />
        </span>
      );
    }

    const mobileHeader = (
      <Col xs={12}>
        <div className='sidebar-header'>
          {/* TODO */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className='filter-header' onClick={this.toggleMenu}>
            { mobileText }
          </div>
          <div className='filter-header-clear'>
            {activeFilter && mobileResetLink}
          </div>
        </div>
      </Col>
    );

    return (
      <Container>
        <Row className='visible-xs'>
          {mobileHeader}
        </Row>
        <Row>
          <Col sm={12} className='hidden-xs filter-title'>
            { intl.formatMessage(messages.filters) }
          </Col>
        </Row>
        <Row className={classNames('sidebar', { 'hidden-xs': !this.state.showMenu })}>
          <Col xs={4} sm={12}>
            <Filter
                title    = {intl.formatMessage(messages.filter_course)}
                qsTitle  = 'course'
                data     = {courses ?? []}
                qs       = {qs}
                multiSelect
                buildUrl = {buildUrl} />
          </Col>
          <Col xs={4} sm={12}>
            <Filter
                title    = {intl.formatMessage(messages.filter_cuisine)}
                qsTitle  = 'cuisine'
                data     = {cuisines ?? []}
                qs       = {qs}
                multiSelect
                buildUrl = {buildUrl} />
          </Col>
          <Col xs={4} sm={12}>
            <Filter
                title    = {intl.formatMessage(messages.filter_rating)}
                qsTitle  = 'rating'
                data     = {ratings?.map((r: any) => {
                    r.slug = r.rating;
                    r.title = intl.formatMessage(messages.x_stars, { rating: r.rating });
                    return r;
                }) ?? []}
                qs       = {qs}
                multiSelect
                buildUrl = {buildUrl} />
          </Col>
          <Col sm={12} className='hidden-xs'>
            <Filter
                title    = {intl.formatMessage(messages.filter_limit)}
                qsTitle  = 'limit'
                data     = {[
                    { id: 1, title: '4', slug: '4' },
                    { id: 2, title: '8', slug: '8' },
                    { id: 3, title: '16', slug: '16' },
                ]}
                qs       = {qs}
                buildUrl = {buildUrl}
            />
          </Col>
          <Col sm={12} className='hidden-xs'>
            <Filter
                title={intl.formatMessage(messages.filter_ordering)}
                qsTitle='ordering'
                data={[
                { id: 1, title: intl.formatMessage(messages.title), slug: 'title' },
                { id: 2, title: intl.formatMessage(messages.pub_date), slug: '-pub_date' },
                { id: 3, title: intl.formatMessage(messages.rating), slug: '-rating' },
              ]}
                qs={qs}
                buildUrl={buildUrl}
            />
          </Col>
          {activeFilter && resetLink}
        </Row>
      </Container>
    );
  }
}

export default injectIntl(SearchMenu);
