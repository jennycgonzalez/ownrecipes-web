import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import Input from '../../common/components/Input';
import { updateFormData } from '../../common/utility';
import { RatingCreate } from '../store/types';

export interface INewRatingProps {
  show: boolean;
  recipeSlug: string;
  userId: number;

  addRating: (recipeSlug: string, rating: RatingCreate) => void;
}

export interface IFormDataProps {
  rating:  string;
  comment: string;
}

const NewRating: React.FC<INewRatingProps> = ({ show, recipeSlug, userId, addRating }: INewRatingProps) => {
  const intl = useIntl();

  const [formData, setFormData] = useState<IFormDataProps>({ rating: '', comment: '' });

  const handleChange = (name: string, value: unknown) => {
    setFormData(prev => updateFormData(prev, name, value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newRating: RatingCreate = {
      rating:     parseInt(formData.rating),
      comment:    formData.comment,
      userId:     userId,
    };
    addRating(recipeSlug, newRating);
    setFormData({ rating: '', comment: '' });
  };

  const { formatMessage } = intl;
  const messages = defineMessages({
    new_rating_title: {
      id: 'newRating.create.title',
      description: 'Fieldset legend for creating a new rating',
      defaultMessage: 'Your new rating',
    },
    rating_placeholder: {
      id: 'newRating.create.rating_placeholder',
      description: 'Rating placeholder',
      defaultMessage: 'Rate this recipe from 0 to 5',
    },
    rating_label: {
      id: 'newRating.create.rating_label',
      description: 'Rating label',
      defaultMessage: 'Rating',
    },
    rating_comment_placeholder: {
      id: 'newRating.create.rating_comment_placeholder',
      description: 'Rating placeholder',
      defaultMessage: 'Leave a comment!',
    },
    rating_comment_label: {
      id: 'newRating.create.rating_comment_label',
      description: 'Rating label',
      defaultMessage: 'Comments',
    },
    submit: {
      id: 'newRating.create.submit',
      description: 'Submit recipe button',
      defaultMessage: 'Comment',
    },
  });

  if (!show) return null;

  return (
    <>
      <form onSubmit={handleSubmit} className='new-rating'>
        <fieldset>
          <legend className='new-rating-heading'>{formatMessage(messages.new_rating_title)}</legend>
          <Row>
            <Col lg={4} md={5} sm={12}>
              <Input
                  name='rating'
                  type='number'
                  label={formatMessage(messages.rating_label)}
                  placeholder={formatMessage(messages.rating_placeholder)}
                  change={handleChange}
                  value={formData.rating} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                  name='comment'
                  rows={4}
                  label={formatMessage(messages.rating_comment_label)}
                  placeholder={formatMessage(messages.rating_comment_placeholder)}
                  change={handleChange}
                  value={formData.comment}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button type='submit' variant='primary' disabled={formData.rating.length === 0 || formData.comment.length === 0}>
                {formatMessage(messages.submit)}
              </Button>
            </Col>
          </Row>
        </fieldset>
      </form>
      <hr />
    </>
  );
};

export default NewRating;
