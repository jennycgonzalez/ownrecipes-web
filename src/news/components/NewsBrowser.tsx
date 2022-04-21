import React from 'react';
import { useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';

import '../css/news.css';

import { CombinedStore } from '../../app/Store';

import MiniBrowse from '../../browse/containers/MiniBrowse';

const NewsBrowser: React.FC = () => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    recommendedRecipes: {
      id: 'nav.home.recommended_recipes_title',
      description: 'Recommended Recipes Title',
      defaultMessage: 'Recommended Recipes',
    },
  });

  const miniBrowseState = useSelector((state: CombinedStore) => state.browse.miniBrowse);

  if (!miniBrowseState.hasConnection || miniBrowseState.error != null) return null;

  return (
    <div>
      <h2 className='page-header'>{formatMessage(messages.recommendedRecipes)}</h2>
      <MiniBrowse qs='?limit=4' />
    </div>
  );
};

export default NewsBrowser;
