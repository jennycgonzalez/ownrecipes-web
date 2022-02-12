import { Dispatch as ReduxDispatch } from 'redux';
import ArrayReducerType from '../../common/store/ArrayReducerType';
import { ACTION, GenericReducerAction } from '../../common/store/ReduxHelper';

export type NewsItem = {
  id:      number;
  image:   string;
  title:   string;
  content: string;
}

export const NEWS_STORE = '@@news';

export interface INewsLoadAction {
  store: typeof NEWS_STORE;
  type: typeof ACTION.GET_SUCCESS;
  data: Array<NewsItem>;
}

export type NewsState    = ArrayReducerType<NewsItem>;
export type NewsAction   = INewsLoadAction | GenericReducerAction;
export type NewsDispatch = ReduxDispatch<NewsAction>;
