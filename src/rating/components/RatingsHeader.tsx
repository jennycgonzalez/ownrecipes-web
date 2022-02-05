import { Button, Card, Col, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

export interface IRatingsHeaderProps {
  userId: number;
  showNewRating: boolean;
  onShowNewRating: () => void;
}

const RatingsHeader: React.FC<IRatingsHeaderProps> = ({ userId, showNewRating, onShowNewRating }: IRatingsHeaderProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    title: {
      id: 'recipe.comments.title',
      description: 'Comments heading',
      defaultMessage: 'Comments',
    },
    new_rating_button: {
      id: 'recipe.comments.new_rating',
      description: 'Label for the new rating button',
      defaultMessage: 'New rating',
    },
  });

  return (
    <Card.Header>
      <Row>
        <Col className='ratings-heading-col'>
          <h2>{formatMessage(messages.title)}</h2>
        </Col>
        {userId > 0 && !showNewRating && (
          <Col xs='auto'>
            <Button variant='outline-primary' onClick={onShowNewRating}>{formatMessage(messages.new_rating_button)}</Button>
          </Col>
        )}
      </Row>
    </Card.Header>
  );
};

export default RatingsHeader;
