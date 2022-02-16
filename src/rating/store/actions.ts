import { RatingCreate, RatingDispatch, RatingsDispatch, RATINGS_STORE, RATING_STORE, toRating } from './types';
import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import ReduxHelper, { ACTION } from '../../common/store/ReduxHelper';

export const load = (recipeSlug: string) => (dispatch: RatingsDispatch) => {
  dispatch({ store: RATINGS_STORE, type: ACTION.GET_START });
  request()
    .get(`${serverURLs.ratings}?recipe__slug=${recipeSlug}`)
    .then(res => dispatch({
      store:  RATINGS_STORE,
      type:   ACTION.GET_SUCCESS,
      recipe: recipeSlug,
      data:   ReduxHelper.transformEntities(res.body.results, toRating),
    }))
    .catch(err => handleError(err, RATINGS_STORE));
};

export const remove = (recipeSlug: string, id: number) => (dispatch: RatingDispatch) => {
  dispatch({ store: RATING_STORE, type: ACTION.DELETE_START });
  request()
    .delete(`${serverURLs.ratings}${id}/`)
    .then(() => dispatch({
      store:  RATING_STORE,
      type:   ACTION.DELETE_SUCCESS,
      ratingId: id,
      recipe:   recipeSlug,
    }))
    .catch(err => handleError(err, RATINGS_STORE));
};

export const add = (recipeSlug: string, rating: RatingCreate) => (dispatch: RatingDispatch) => {
  dispatch({ store: RATING_STORE, type: ACTION.CREATE_START });
  request()
    .post(serverURLs.ratings)
    .send({
      recipe:  recipeSlug,
      rating:  rating.rating,
      comment: rating.comment,
      author:  rating.userId,
    })
    .then(res => dispatch({
      store:  RATING_STORE,
      type:   ACTION.CREATE_SUCCESS,
      recipe: recipeSlug,
      data:   toRating(res.body),
    }))
    .catch(err => handleError(err, RATINGS_STORE));
};
