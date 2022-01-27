import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { NewsActionTypes, NewsDispatch, NEWS_STORE } from './types';

// eslint-disable-next-line import/prefer-default-export
export const load = () => (dispatch: NewsDispatch) => {
  request()
    .get(serverURLs.news)
    .then(res => {
      dispatch({
        store: NEWS_STORE,
        type: NewsActionTypes.NEWS_LOAD,
        data: res.body.results,
      });
    });
};
