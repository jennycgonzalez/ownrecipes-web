import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';

import { CombinedStore } from '../../app/Store';
import * as NewsActions from '../store/actions';

import P from '../../common/components/P';
import { PendingState } from '../../common/store/GenericReducerType';
import Loading from '../../common/components/Loading';

const NewsCarousel: React.FC = () => {
  const dispatch = useDispatch();

  const news = useSelector((state: CombinedStore) => state.news);
  const newsList = news.items;

  useEffect(() => {
    if (newsList != null && newsList.length !== 0) return;
    dispatch(NewsActions.load());
  }, [newsList]);

  const carouselItems = newsList?.filter(entry => entry.frontpage).map(entry => (
    <Carousel.Item key={entry.id}>
      {entry.image && <img className='d-block w-100' src={entry.image} alt={entry.title} />}
      <Carousel.Caption>
        <h2>{entry.title}</h2>
        <P>{entry.content}</P>
      </Carousel.Caption>
    </Carousel.Item>
  )) ?? [];

  return (
    <>
      {news.pending === PendingState.LOADING && (
        <Loading />
      )}
      {carouselItems.length > 0 && (
        <Carousel controls={carouselItems.length > 1} indicators={carouselItems.length > 1}>
          {carouselItems}
        </Carousel>
      )}
    </>
  );
};

export default NewsCarousel;
