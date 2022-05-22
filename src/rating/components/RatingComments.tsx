import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Col, Row } from 'react-bootstrap';
import Spinner from 'react-spinkit';

import { Rating } from '../store/types';
import Icon from '../../common/components/Icon';
import P from '../../common/components/P';
import Modal from '../../common/components/Modal';
import Ratings from './Ratings';
import { PendingState } from '../../common/store/GenericReducerType';

export interface IRatingCommentsProps {
  recipeSlug: string;
  ratings:    Array<Rating> | undefined;
  userId:     number | undefined;
  pending:    PendingState;

  removeRating: (recipe: string, rating: number) => void;
}

const RatingComments: React.FC<IRatingCommentsProps> = ({ recipeSlug, ratings, userId, pending, removeRating }: IRatingCommentsProps) => {
  const intl = useIntl();

  const messages = defineMessages({
    no_comments: {
      id: 'rating_comments.no_comments',
      description: 'Placeholder for no comments',
      defaultMessage: '(No comments yet. Be the first!)',
    },
    confirm_delete_message: {
      id: 'rating_comments.confirm_delete',
      description: 'Are you sure you want to delete this comment?',
      defaultMessage: 'Are you sure you want to delete this comment?',
    },
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | undefined>();
  const handleDeleteClick  = (rating: number) => setShowDeleteConfirm(rating);
  const handleDeleteAccept = () => removeRating(recipeSlug, showDeleteConfirm ?? 0);
  const handleDeleteClose  = () => setShowDeleteConfirm(undefined);

  const ratingsList = ratings?.map((rating, index) => (
    <React.Fragment key={rating.id}>
      <Row>
        {index > 0 && (
          <Col xs={12}>
            <hr />
          </Col>
        )}
      </Row>
      <Row>
        <Col xs>
          <Ratings stars={rating.rating || 0} />
        </Col>
        <Col xs='auto'>
          {rating.userId === userId && (
            <Button variant='outline-danger' size='sm' onClick={() => handleDeleteClick(rating.id)}>
              <Icon icon='trash' />
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} className='rating-username'>
          {rating.userName}
        </Col>
        <Col xs={12}>
          <span>
            {rating.comment}
          </span>
        </Col>
      </Row>
    </React.Fragment>
  )) ?? [];

  const beTheFirst = (
    <Row key='be-the-first'><Col><P className='placeholder'>{intl.formatMessage(messages.no_comments)}</P></Col></Row>
  );

  return (
    <>
      {pending === PendingState.LOADING && <Spinner name='three-bounce' />}
      {ratingsList.length === 0 && beTheFirst}
      {ratingsList}

      <Modal
          show = {showDeleteConfirm != null}
          title = {intl.messages['recipe.confirm_delete_title'] as string}
          acceptTitle = {intl.messages['recipe.confirm_delete_accept']}
          onAccept = {handleDeleteAccept}
          onClose  = {handleDeleteClose}
          acceptButtonProps = {{ variant: 'danger' }}>
        {intl.formatMessage(messages.confirm_delete_message)}
      </Modal>
    </>
  );
};

export default RatingComments;
