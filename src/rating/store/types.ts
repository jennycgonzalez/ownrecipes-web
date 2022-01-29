import { Dispatch as ReduxDispatch } from 'redux';
import MapReducerType from '../../common/store/MapReducerType';
import { GenericReducerAction } from '../../common/store/ReduxHelper';

export const RATINGS_STORE = '@@ratings';

export type RatingDto = {
  id:       number;
  comment:  string;
  user_id:   number;
  username: string;
  rating:   number;
}

export type Rating = {
  id:       number;
  comment:  string;
  userId:   number;
  userName: string;
  rating:   number;
}

export type RatingCreate = {
  comment:  string;
  userId:   number;
  rating:   number;
}

export const toRating = (dto: RatingDto): Rating => ({
  id:       dto.id,
  comment:  dto.comment,
  userId:   dto.user_id,
  userName: dto.username,
  rating:   dto.rating,
});

export enum RatingsActionTypes {
  ADD    = 'RATINGS_ADD',
  LOAD   = 'RATINGS_LOAD',
  DELETE = 'RATINGS_DELETE',
  UPDATE = 'RATINGS_UPDATE',
}

export interface IRatingsLoadAction {
  store:  typeof RATINGS_STORE;
  type:   typeof RatingsActionTypes.LOAD;
  recipe: string;
  data:   Array<Rating>;
}

export interface IRatingsAddAction {
  store:  typeof RATINGS_STORE;
  type:   typeof RatingsActionTypes.ADD;
  recipe: string;
  data:   Rating;
}

export interface IRatingsDeleteAction {
  store:    typeof RATINGS_STORE;
  type:     typeof RatingsActionTypes.DELETE;
  recipe:   string;
  ratingId: number;
}

export type RatingsState    = MapReducerType<Rating[]>;
export type RatingsAction   = IRatingsLoadAction | IRatingsAddAction | IRatingsDeleteAction | GenericReducerAction;
export type RatingsDispatch = ReduxDispatch<RatingsAction>;
