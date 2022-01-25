import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import history from '../../common/history';

// eslint-disable-next-line import/prefer-default-export
export const randomRecipe = () => () => {
  request()
    .get(`${serverURLs.mini_browse}?limit=1&fields=slug`)
    .then(res => { history.push(`/recipe/${res.body.results[0].slug}`); })
    .catch(err => { console.error(err); });
};
