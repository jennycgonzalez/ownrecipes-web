import { Dispatch as ReduxDispatch } from 'redux';
import ArrayReducerType from '../../common/store/ArrayReducerType';
import { ACTION, GenericArrayReducerAction } from '../../common/store/ReduxHelper';

export type NewsItemDto = {
  id:        number;
  image:     string;
  title:     string;
  content:   string;
  frontpage: boolean;
}

export type NewsItem = {
  id:        number;
  image:     string;
  title:     string;
  content:   string;
  frontpage: boolean;
}

export const toNewsItem = (dto: NewsItemDto): NewsItem => ({
  id:        dto.id,
  image:     dto.image,
  title:     dto.title,
  content:   dto.content,
  frontpage: dto.frontpage,
});

export const NEWS_STORE = '@@news';

export interface INewsLoadAction {
  store: typeof NEWS_STORE;
  type:  typeof ACTION.GET_SUCCESS;
  data:  Array<NewsItem>;
}

export type NewsState    = ArrayReducerType<NewsItem>;
export type NewsAction   = INewsLoadAction | GenericArrayReducerAction;
export type NewsDispatch = ReduxDispatch<NewsAction>;
