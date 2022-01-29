import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';

// import MiniBrowse from '../../browse/containers/MiniBrowse';
// import UpComingRecipes from '../../menu/components/UpComingRecipes';
// import Menu from '../../menu/containers/Menu';

import PageWrapper from '../../common/components/PageWrapper';
import { CombinedStore } from '../../app/Store';

import '../css/news.css';

const News: React.FC = () => {
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
