import Ratings from './Ratings';
import { Rating } from '../store/types';
import { Button, Col, Row } from 'react-bootstrap';
import Spinner from 'react-spinkit';
import Icon from '../../common/components/Icon';
import P from '../../common/components/P';
import { defineMessages, useIntl } from 'react-intl';

export interface IRatingCommentsProps {
  recipeSlug: string;
  ratings: Array<Rating> | undefined;
  userId: number;
  removeRating: (recipe: string, rating: number) => void;
}

function getReversedArray<T>(arr: Array<T> | undefined): Array<T> | undefined {
  if (arr == null) return undefined;
  const rev = [...arr];
  rev.reverse();
  return rev;
}

const RatingComments: React.FC<IRatingCommentsProps> = ({ ratings, userId, recipeSlug, removeRating }: IRatingCommentsProps) => {
  const { formatMessage } = useIntl();

  const messages = defineMessages({
    no_comments: {
      id: 'rating_comments.no_comments',
      description: 'Placeholder for no comments',
      defaultMessage: '(No comments yet. Be the first!)',
    },
  });

  const ratingsReversed = getReversedArray(ratings);
  const ratingsList = ratingsReversed?.map((rating, index) => (
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

  // TODO color: secondaryText
  const beTheFirst = (
    <Row key='be-the-first'><Col><P variant='body2'>{formatMessage(messages.no_comments)}</P></Col></Row>
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
