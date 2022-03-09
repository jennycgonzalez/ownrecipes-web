import { Dispatch as ReduxDispatch } from 'redux';
import MapReducerType from '../../common/store/MapReducerType';
import { ACTION, GenericItemReducerAction, GenericMapReducerAction } from '../../common/store/ReduxHelper';

export const RATING_STORE  = '@@rating';

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

export interface IRatingAddAction {
  store:  typeof RATING_STORE;
  type:   ACTION.CREATE_SUCCESS;
  recipe: string;
  data:   Rating;
}

export interface IRatingDeleteAction {
  store:    typeof RATING_STORE;
  type:     ACTION.DELETE_SUCCESS;
  recipe:   string;
  ratingId: number;
}

export type RatingAction   = IRatingAddAction | IRatingDeleteAction | GenericItemReducerAction<Rating>;
export type RatingDispatch = ReduxDispatch<RatingAction>;

export const RATINGS_STORE = '@@ratings';

export type RatingsState    = MapReducerType<Rating[]>;
export type RatingsAction   = GenericMapReducerAction<Rating[]>;
export type RatingsDispatch = ReduxDispatch<RatingsAction>;
