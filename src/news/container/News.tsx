import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';

import * as NewsActions from '../store/actions';
// import MiniBrowse from '../../browse/containers/MiniBrowse';
// import UpComingRecipes from '../../menu/components/UpComingRecipes';
// import Menu from '../../menu/containers/Menu';

import PageWrapper from '../../common/components/PageWrapper';
import { CombinedStore } from '../../app/Store';

import '../css/news.css';
import { Carousel } from 'react-bootstrap';
import P from '../../common/components/P';

const News: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { formatMessage } = intl;
  const messages = defineMessages({
    browseRecipeButton: {
      id: 'nav.home',
      description: 'Browse All Recipes',
      defaultMessage: 'Browse All Recipes',
    },
  });

  const news = useSelector((state: CombinedStore) => state.news);
  const accountState = useSelector((state: CombinedStore) => state.account);
  const newsList = news.items;
  const user = accountState.item;

  useEffect(() => {
    if (newsList != null && newsList.length !== 0) return;
    dispatch(NewsActions.load());
  }, [newsList]);

  const carouselItems = newsList != null && newsList.length > 0 ? newsList.map(entry => (
    <Carousel.Item key={entry.id}>
      {entry.image && <img className='d-block w-100' src={entry.image} alt={entry.title} />}
      <Carousel.Caption>
        <h3>{entry.title}</h3>
        <P>{entry.content}</P>
      </Carousel.Caption>
    </Carousel.Item>
    )) : null;

  return (
    <PageWrapper title={intl.messages['nav.home'] as string}>
      {carouselItems != null && (
        <Carousel controls={carouselItems.length > 1} indicators={carouselItems.length > 1}>
          {carouselItems}
        </Carousel>
      )}
      {/*
        <Row>
          { user && user.id !== 0
            ? <Menu SimpleLayout={UpComingRecipes} public />
            : ''}
        </Row>
        <Row>
          <h3 className='page-header'>Recommended Recipes</h3>
          <MiniBrowse format='col-xs-12 col-sm-6 col-md-3' qs='?limit=4' />
        </Row>
        <Row className='home-buttons'>
          <Col md={4} sm={6} xs={12} className='col-md-push-4 col-sm-push-3'>
            <Button href={${getResourcePath(/browser)} variant='primary' className='home-browse-button'>
              {formatMessage(messages.browseRecipeButton)}
            </Button>
          </div>
        </Row> */}
    </PageWrapper>
  );
};

export default News;
