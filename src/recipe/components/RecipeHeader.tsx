/* eslint-disable camelcase */
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { useState } from 'react';

import '../css/recipe_header.css';

import { getResourcePath, optionallyFormatMessage } from '../../common/utility';
import Icon from '../../common/components/Icon';
import Chip from '../../common/components/Chip';
import Ratings from '../../rating/components/Ratings';
import P from '../../common/components/P';
import { Recipe } from '../store/RecipeTypes';
import Modal from '../../common/components/Modal';

export interface IRecipeHeaderProps {
  recipe: Recipe;
  showEditLink: boolean;

  deleteRecipe: () => void;
  // onAddToMenuClick: () => void;
}

const RecipeHeader: React.FC<IRecipeHeaderProps> = ({ recipe, showEditLink, deleteRecipe }: IRecipeHeaderProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;

  const messages = defineMessages({
    recipe_comments: {
      id: 'recipe.comments',
      description: 'Button to comments',
      defaultMessage: 'Comments',
    },
    prep_time: {
      id: 'recipe.prep_time',
      description: 'Preparation time',
      defaultMessage: 'Prep time',
    },
    cooking_time: {
      id: 'recipe.cooking_time',
      description: 'Cooking time',
      defaultMessage: 'Cooking time',
    },
    minutes: {
      id: 'recipe.minutes',
      description: 'minutes',
      defaultMessage: 'minutes',
    },
    source: {
      id: 'recipe.source',
      description: 'Source of the recipe',
      defaultMessage: 'Source',
    },
    created_by: {
      id: 'recipe.created_by',
      description: 'Created by',
      defaultMessage: 'Created by',
    },
    last_updated: {
      id: 'recipe.last_updated',
      description: 'Last Updated',
      defaultMessage: 'Last Updated',
    },
    confirm_delete_title: {
      id: 'recipe.confirm_delete_title',
      description: 'Confirm deletion - dialog title',
      defaultMessage: 'Confirm deletion',
    },
    confirm_delete_message: {
      id: 'recipe.confirm_delete',
      description: 'Are you sure you want to delete this recipe?',
      defaultMessage: 'Are you sure you want to delete this recipe?',
    },
    confirm_delete_accept: {
      id: 'recipe.confirm_delete_accept',
      description: 'Confirm deletion - Accept button title',
      defaultMessage: 'Delete',
    },
  });

  const { slug, title, photo, photoThumbnail, info, username, prepTime, cookTime, updateDate, course, cuisine, rating, source } = recipe;

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const handleDeleteClick = () => setShowDeleteConfirm(true);
  const handleDeleteAccept = () => deleteRecipe();
  const handleDeleteClose = () => setShowDeleteConfirm(false);

  const editLink = showEditLink ? (
    <Link to={getResourcePath(`/recipe/edit/${slug}`)}>
      <Button variant='primary' size='sm'>
        <i className='bi bi-pencil-fill' />
      </Button>
    </Link>
  ) : null;

  const deleteLink = showEditLink ? (
    <Button variant='danger' size='sm' onClick={handleDeleteClick}>
      <Icon icon='trash' />
    </Button>
  ) : null;

  let hostname = '';
  if (source) {
    // Get Host name of a URL
    const a = document.createElement('a');
    a.href = source;
    hostname = a.hostname;
  }

  const sourceLink = (
    <div>
      {`${formatMessage(messages.source)}: `}
      <a href={source}>{hostname}</a>
    </div>
  );

  return (
    <>
      <article className='recipe-header'>
        <h1>{title}</h1>

        {photo && (
          <Row>
            <Col xs={12} className='mobile-image'>
              <img className='img-responsive print-hidden' src={photo} alt={title} />
            </Col>
            <Col sm={7} xs={12} className='col-sm-push-5'>
              <P className='print-only print-image'>
                <img className='img-responsive' src={photoThumbnail} alt={title} />
              </P>
            </Col>
          </Row>
        )}

        <div className='options print-hidden'>
          {/*
            <Button variant='outline-primary' aria-label='Add receipt to menu' onClick={onAddToMenuClick}>
              <Icon icon='calendar' />
            </Button>
          */}
          <Button variant='outline-primary' aria-label='Print receipt' onClick={window.print}>
            <Icon icon='printer' />
          </Button>
          {showEditLink && (
            <Col xs='auto'>
              <ButtonGroup>
                {editLink}
                {deleteLink}
              </ButtonGroup>
            </Col>
          )}
        </div>

        <Row>
          <P>{info}</P>
        </Row>

        <Row>
          <Ratings stars={rating} />
        </Row>

        <Row className='recipe-header-chips'>
          {prepTime > 0 && (
            <Chip variant='secondary'>
              <Icon icon='clock' />
              {`${formatMessage(messages.prep_time)}: `}
              {prepTime}
              {` ${formatMessage(messages.minutes)}`}
            </Chip>
          )}
          {cookTime > 0 && (
            <Chip variant='secondary'>
              <Icon icon='clock' />
              {`${formatMessage(messages.cooking_time)}: `}
              {cookTime}
              {` ${formatMessage(messages.minutes)}`}
            </Chip>
          )}
          {course != null && course.title != null && course.title.length > 0 && (
            <Chip variant='secondary'>
              <Icon icon='bar-chart' />
              {optionallyFormatMessage(intl, 'course.', course.title)}
            </Chip>
          )}
          {cuisine != null && cuisine.title != null && cuisine.title.length > 0 && (
            <Chip variant='secondary'>
              <Icon icon='globe' variant='light' />
              {optionallyFormatMessage(intl, 'cuisine.', cuisine.title)}
            </Chip>
          )}
        </Row>

        <Row className='recipe-header-chips'>
          <Chip variant='secondary'>
            <Icon icon='calendar' />
            {updateDate.toLocaleDateString(intl.locale)}
          </Chip>
          <Chip variant='secondary'>
            <Icon icon='person' />
            {username}
          </Chip>
        </Row>

        {source && (
          <Row>
            {sourceLink}
          </Row>
        )}
      </article>

      <Modal
          show={showDeleteConfirm}
          title={formatMessage(messages.confirm_delete_title)}
          acceptTitle={formatMessage(messages.confirm_delete_accept)}
          onAccept={handleDeleteAccept}
          onClose={handleDeleteClose}
          className='delete'>
        {formatMessage(messages.confirm_delete_message)}
      </Modal>
    </>
  );
};

export default RecipeHeader;
