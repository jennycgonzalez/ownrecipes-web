import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router';

import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { getResourcePath } from '../../common/utility';

// eslint-disable-next-line import/prefer-default-export
export const randomRecipe = (nav: NavigateFunction) => (dispatch: Dispatch<unknown>) => {
  request()
    .get(`${serverURLs.mini_browse}?limit=1&fields=slug`)
    .then(res => {
      const recipe = res.body.results?.[0]?.slug;
      if (recipe) {
        nav(getResourcePath(`/recipe/${res.body.results[0].slug}`));
      }
      // OPT Show info that no recipe was found
    })
    .catch(err => dispatch(handleError(err, 'UNKNOWN')));
};
