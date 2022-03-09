import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RatingsWrapper from '../components/RatingsWrapper';
import * as RatingsActions from '../store/actions';
import { RatingCreate } from '../store/types';
import { CombinedStore } from '../../app/Store';

const Ratings: React.FC = () => {
  const dispatch = useDispatch();

  const account = useSelector((state: CombinedStore) => state.account.item);
  const recipe  = useSelector((state: CombinedStore) => state.recipe.item);
  const ratingsState = useSelector((state: CombinedStore) => state.ratings);

  const recipeSlug = recipe?.slug;
  const recipeRating = recipe?.rating;

  const addRatingCallback    = useCallback((recSlug, rating: RatingCreate) => dispatch(RatingsActions.add(recSlug, rating)), [dispatch]);
  const removeRatingCallback = useCallback((recSlug, ratingId: number)     => dispatch(RatingsActions.remove(recSlug, ratingId)), [dispatch]);

  useEffect(() => {
    if (recipeSlug == null || recipeRating == null || recipeRating === 0) return;
    dispatch(RatingsActions.load(recipeSlug));
  }, [recipeSlug, recipeRating]);

  if (recipeSlug == null) return null;
  const ratings = recipeSlug != null ? ratingsState.items?.get(recipeSlug) : undefined;

  return (
    <RatingsWrapper
        recipeSlug = {recipeSlug}
        userId     = {account?.id ?? 0}
        ratings    = {ratings}
        pending    = {ratingsState.pending}

        addRating  = {addRatingCallback}
        removeRating = {removeRatingCallback} />
  );
};

export default Ratings;
