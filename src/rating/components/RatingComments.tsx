import Ratings from './Ratings';
import { Rating } from '../store/types';
import { Button, Col, Row } from 'react-bootstrap';
import Spinner from 'react-spinkit';
import Icon from '../../common/components/Icon';

export interface IRatingCommentsProps {
  recipeSlug: string;
  ratings: Array<Rating> | undefined;
  userId: number;
  removeRating: (recipe: string, rating: number) => void;
}

const RatingComments: React.FC<IRatingCommentsProps> = ({ ratings, userId, recipeSlug, removeRating }: IRatingCommentsProps) => {
  const ratingsList = ratings?.map((rating, index) => (
    <Row key={rating.id}>
      {index > 0 && (
        <Col xs={12}>
          <hr />
        </Col>
      )}
      <Col xs={11}>
        <Ratings stars={rating.rating || 0} />
      </Col>
      <Col xs={1}>
        {userId === rating.userId && (
          <Button variant='outline-danger' size='sm' onClick={() => removeRating(recipeSlug, rating.id)}>
            <Icon icon='trash' />
          </Button>
        )}
      </Col>
      <Col xs={12} className='rating-username'>
        {rating.userName}
      </Col>
      <Col xs={12}>
        <span>
          {rating.comment}
        </span>
      </Col>
    </Row>
  ));

  const beTheFirst = (
    <Row key='be-the-first'><Col>(No comments yet. Be the first!)</Col></Row>
  );

  return (
    <>
      {ratingsList == null && <Spinner name='three-bounce' />}
      {ratingsList?.length === 0 && beTheFirst}
      {ratingsList}
    </>
  );
};

export default RatingComments;
