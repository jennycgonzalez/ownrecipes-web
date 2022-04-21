import React from 'react';

import '../css/news.css';

// import UpComingRecipes from '../../menu/components/UpComingRecipes';
// import Menu from '../../menu/containers/Menu';
import PageWrapper from '../../common/components/PageWrapper';
import NewsCarousel from '../components/NewsList';
import NewsBrowser from '../components/NewsBrowser';
import { useIntl } from 'react-intl';

const News: React.FC = () => {
  const intl = useIntl();
  // const accountState = useSelector((state: CombinedStore) => state.account);
  // const user = accountState.item;

  return (
    <PageWrapper title={intl.messages['nav.home'] as string}>
      <NewsCarousel />
      {/*
      <Row>
        { user && user.id !== 0
          ? <Menu SimpleLayout={UpComingRecipes} public />
          : ''}
      </Row>
      */}
      <NewsBrowser />
    </PageWrapper>
  );
};

export default News;
