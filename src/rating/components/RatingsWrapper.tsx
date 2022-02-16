import { useState } from 'react';
import { Card } from 'react-bootstrap';

import '../css/recipe-rating-wrapper.css';

import { Rating, RatingCreate } from '../store/types';
import RatingComments from './RatingComments';
import NewRating from './NewRating';
import RatingsHeader from './RatingsHeader';
import { PendingState } from '../../common/store/GenericReducerType';

export interface IRatingsWrapperProps {
  recipeSlug: string;
  ratings:    Array<Rating> | undefined;
  userId:     number;
  pending:    PendingState;

  addRating: (recipeSlug: string, rating: RatingCreate) => void;
  removeRating: (recipeSlug: string, ratingId: number) => void;
}

const RatingsWrapper: React.FC<IRatingsWrapperProps> = ({ recipeSlug, ratings, userId, pending, addRating, removeRating }: IRatingsWrapperProps) => {
  const [showNewRating, setShowNewRating] = useState<boolean>(false);

  const handleAddRating = (rec: string, rating: RatingCreate) => {
    setShowNewRating(false);
    addRating(rec, rating);
  };

  return (
    <Card className='rating-panel' as='article'>
      <RatingsHeader userId={userId} showNewRating={showNewRating} onShowNewRating={() => setShowNewRating(true)} />
      <Card.Body>
        <NewRating show={showNewRating} recipeSlug={recipeSlug} userId={userId} addRating={handleAddRating} />
        <RatingComments recipeSlug={recipeSlug} ratings={ratings} pending={pending} userId={userId} removeRating={removeRating} />
      </Card.Body>
    </Card>
  );
};

export default RatingsWrapper;
