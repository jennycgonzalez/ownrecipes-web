import { Dispatch as ReduxDispatch } from 'redux';
import ArrayReducerType from '../../common/store/ArrayReducerType';
import { GenericReducerAction } from '../../common/store/ReduxHelper';

export type NewsItem = {
  id: number;
  image: any;
  title: string;
  content: any;
}

export enum NewsActionTypes {
  NEWS_LOAD  = 'NEWS_LOAD',
}

export const NEWS_STORE = '@@account';

export interface INewsLoadAction {
  store: typeof NEWS_STORE;
  type: typeof NewsActionTypes.NEWS_LOAD;
  data: Array<NewsItem>;
}

export type NewsState    = ArrayReducerType<NewsItem>;
export type NewsAction   = INewsLoadAction | GenericReducerAction;
export type NewsDispatch = ReduxDispatch<NewsAction>;
