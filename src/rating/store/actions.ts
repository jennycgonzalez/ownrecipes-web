import { RatingCreate, RatingsActionTypes, RatingsDispatch, RATINGS_STORE, toRating } from './types';
import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import ReduxHelper from '../../common/store/ReduxHelper';

export const load = (recipeSlug: string) => (dispatch: RatingsDispatch) => {
  request()
    .get(`${serverURLs.ratings}?recipe__slug=${recipeSlug}`)
    .then(res => dispatch({
      store:  RATINGS_STORE,
      type:   RatingsActionTypes.LOAD,
      recipe: recipeSlug,
      data:   ReduxHelper.transformEntities(res.body.results, toRating),
    }))
    .catch(err => handleError(err, RATINGS_STORE));
};

export const remove = (recipeSlug: string, id: number) => (dispatch: RatingsDispatch) => {
  request()
    .delete(`${serverURLs.ratings}${id}/`)
    .then(() => dispatch({
      store:  RATINGS_STORE,
      type:   RatingsActionTypes.DELETE,
      ratingId: id,
      recipe:   recipeSlug,
    }))
    .catch(err => handleError(err, RATINGS_STORE));
};

export const add = (recipeSlug: string, rating: RatingCreate) => (dispatch: RatingsDispatch) => {
  request()
    .post(serverURLs.ratings)
    .send({
      recipe:  recipeSlug,
      rating:  rating.rating,
      comment: rating.comment,
      author:  rating.userId,
    })
    .then(res => dispatch({
      store:  RATINGS_STORE,
      type:   RatingsActionTypes.ADD,
      recipe: recipeSlug,
      data:   toRating(res.body),
    }))
    .catch(err => handleError(err, RATINGS_STORE));
};
