import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { NewsDispatch, NewsItemDto, NEWS_STORE, toNewsItem } from './types';
import { ACTION } from '../../common/store/ReduxHelper';

// eslint-disable-next-line import/prefer-default-export
export const load = () => (dispatch: NewsDispatch) => {
  dispatch({ store: NEWS_STORE, type: ACTION.GET_START });

  request()
    .get(serverURLs.news)
    .then(res => {
      dispatch({
        store: NEWS_STORE,
        type:  ACTION.GET_SUCCESS,
        data:  res.body.results?.map((i: NewsItemDto) => toNewsItem(i)),
      });
    })
    .catch(err => dispatch(handleError(err, NEWS_STORE)));
};
