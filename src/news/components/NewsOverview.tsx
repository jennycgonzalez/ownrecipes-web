import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import '../css/news.css';

import LocalStorageHelper from '../../common/LocalStorageHelper';
import { CombinedStore } from '../../app/Store';
import NewsCarousel from './NewsList';
import FeaturesOverview from './FeaturesOverview';
import ToggleNewsButton from './ToggleNewsButton';

const SHOW_NEWS_STORAGE_KEY = 'show_news';

const NewsOverview: React.FC = () => {
  const accountState = useSelector((state: CombinedStore) => state.account);
  const user = accountState.item;

  const [showNews, setShowNews] = useState<boolean>(false);

  useEffect(() => {
    setShowNews(LocalStorageHelper.getItem(SHOW_NEWS_STORAGE_KEY, user?.username) !== 'false');
  }, [user?.username]);

  const handleToggleNewsClick = () => {
    if (showNews) {
      LocalStorageHelper.setItem(SHOW_NEWS_STORAGE_KEY, 'false', user?.username);
      setShowNews(false);
    } else {
      LocalStorageHelper.removeItem(SHOW_NEWS_STORAGE_KEY, user?.username);
      setShowNews(true);
    }
  };

  return (
    <>
      {showNews && (
        <>
          <NewsCarousel />
          <FeaturesOverview />
        </>
      )}
      <ToggleNewsButton showNews={showNews} onClick={handleToggleNewsClick} />
    </>
  );
};

export default NewsOverview;
