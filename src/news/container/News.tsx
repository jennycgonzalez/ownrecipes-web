import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { Carousel } from 'react-bootstrap';

import '../css/news.css';

import { CombinedStore } from '../../app/Store';
import * as NewsActions from '../store/actions';

// import UpComingRecipes from '../../menu/components/UpComingRecipes';
// import Menu from '../../menu/containers/Menu';
import PageWrapper from '../../common/components/PageWrapper';
import P from '../../common/components/P';
import MiniBrowse from '../../browse/containers/MiniBrowse';
import { PendingState } from '../../common/store/GenericReducerType';
import Loading from '../../common/components/Loading';

const News: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { formatMessage } = intl;
  const messages = defineMessages({
    browseRecipeButton: {
      id: 'nav.home.browse_recipe_button',
      description: 'Browse All Recipes',
      defaultMessage: 'Browse All Recipes',
    },
    recommendedRecipes: {
      id: 'nav.home.recommended_recipes_title',
      description: 'Recommended Recipes Title',
      defaultMessage: 'Recommended Recipes',
    },
  });

  const news = useSelector((state: CombinedStore) => state.news);
  const newsList = news.items;
  const miniBrowseState = useSelector((state: CombinedStore) => state.browse.miniBrowse);
  // const accountState = useSelector((state: CombinedStore) => state.account);
  // const user = accountState.item;

  useEffect(() => {
    if (newsList != null && newsList.length !== 0) return;
    dispatch(NewsActions.load());
  }, [newsList]);

  const carouselItems = newsList?.map(entry => (
    <Carousel.Item key={entry.id}>
      {entry.image && <img className='d-block w-100' src={entry.image} alt={entry.title} />}
      <Carousel.Caption>
        <h2>{entry.title}</h2>
        <P>{entry.content}</P>
      </Carousel.Caption>
    </Carousel.Item>
    ));

  return (
    <PageWrapper title={intl.messages['nav.home'] as string}>
      {news.pending === PendingState.LOADING && (
        <Loading />
      )}
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
      */}
      {miniBrowseState.hasConnection && miniBrowseState.error == null && (
        <div>
          <h2 className='page-header'>{formatMessage(messages.recommendedRecipes)}</h2>
          <MiniBrowse qs='?limit=4' />
        </div>
      )}
    </PageWrapper>
  );
};

export default News;
