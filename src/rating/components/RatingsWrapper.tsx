import RatingComments from './RatingComments';
import NewRating from './NewRating';

import '../css/recipe-rating-wrapper.css';
import { Rating, RatingCreate } from '../store/types';
import { Card } from 'react-bootstrap';

export interface IRatingsWrapperProps {
  recipeSlug: string;
  ratings:    Array<Rating> | undefined;
  userId:     number;

  addRating: (recipeSlug: string, rating: RatingCreate) => void;
  removeRating: (recipeSlug: string, ratingId: number) => void;
}

const RatingsWrapper: React.FC<IRatingsWrapperProps> = ({ recipeSlug, userId, ratings, addRating, removeRating }: IRatingsWrapperProps) => (
  <Card className='rating-panel'>
    <Card.Header>
      <h2>Comments</h2>
    </Card.Header>
    <Card.Body>
      <RatingComments recipeSlug={recipeSlug} ratings={ratings} userId={userId} removeRating={removeRating} />
    </Card.Body>
    {userId > 0 && (
      <Card.Footer>
        <NewRating recipeSlug={recipeSlug} userId={userId} addRating={addRating} />
      </Card.Footer>
    )}
  </Card>
);

export default RatingsWrapper;
