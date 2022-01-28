import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';

// import MiniBrowse from '../../browse/containers/MiniBrowse';
// import UpComingRecipes from '../../menu/components/UpComingRecipes';
// import Menu from '../../menu/containers/Menu';
import * as NewsActions from '../store/actions';

import '../css/news.css';
import PageWrapper from '../../common/components/PageWrapper';
import useSingle from '../../common/hooks/useSingle';
import { CombinedStore } from '../../app/Store';

const News: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const news = useSelector((state: CombinedStore) => state.news);
  const accountState = useSelector((state: CombinedStore) => state.account);
  const newsList = news.items;
  const user = accountState.item;

  const { formatMessage } = intl;
  const messages = defineMessages({
    browseRecipeButton: {
      id: 'news.browse_recipe_button',
      description: 'Browse All Recipes',
      defaultMessage: 'Browse All Recipes',
    },
  });

  return (
    <PageWrapper title={intl.messages['nav.news'] as string}>
      <h2>OwnRecipes</h2>
      <p>OwnRecipes is an open source recipe management site. You can share recipes with friends, rate recipes, store your favorite recipes to find easily, and more!</p>
      {/*
      <div className='container'>
        <div className='row'>
          { user && user.id !== 0
            ? <Menu SimpleLayout={UpComingRecipes} public />
            : ''}
        </div>
        <div className='row'>
          <h3 className='page-header'>Recommended Recipes</h3>
          <MiniBrowse format='col-xs-12 col-sm-6 col-md-3' qs='?limit=4' />
        </div>
        <div className='row home-buttons'>
          <div className='col-md-4 col-md-push-4 col-sm-6 col-sm-push-3 col-xs-12'>
            <Link to='/browser' className='btn btn-primary home-browse-button'>
              { formatMessage(messages.browseRecipeButton) }
            </Link>
          </div>
        </div>
      </div> */}
    </PageWrapper>
  );
};

export default News;
