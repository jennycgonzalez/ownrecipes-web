import { useParams } from 'react-router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RatingsWrapper from '../components/RatingsWrapper';
import * as RatingsActions from '../store/actions';
import { RatingCreate } from '../store/types';
import { CombinedStore } from '../../app/Store';

const Ratings: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const recipeSlug = params.recipe ?? '';

  const ratingsState = useSelector((state: CombinedStore) => state.ratings);
  const account = useSelector((state: CombinedStore) => state.account.item);

  const addRatingCallback    = useCallback((recSlug, rating: RatingCreate) => dispatch(RatingsActions.add(recSlug, rating)), [dispatch]);
  const removeRatingCallback = useCallback((recSlug, ratingId: number)     => dispatch(RatingsActions.remove(recSlug, ratingId)), [dispatch]);

  useEffect(() => {
    dispatch(RatingsActions.load(recipeSlug));
  }, []);

  const ratings = ratingsState.items?.get(params.recipe ?? '');
  return (
    <RatingsWrapper
        recipeSlug = {recipeSlug}
        userId     = {account?.id ?? 0}
        ratings    = {ratings}

        addRating  = {addRatingCallback}
        removeRating = {removeRatingCallback} />
  );
};

export default Ratings;
