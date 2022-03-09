/* eslint-disable camelcase */
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
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
import WidthHeightRatio from '../../common/components/WidthHeightRatio';
import Image from '../../common/components/Image';

export interface IRecipeHeaderProps {
  recipe:       Recipe | undefined;
  showEditLink: boolean;

  onEditRecipe: () => void;
  deleteRecipe: () => void;
  // onAddToMenuClick: () => void;
}

const RecipeHeader: React.FC<IRecipeHeaderProps> = ({ recipe, showEditLink, onEditRecipe, deleteRecipe }: IRecipeHeaderProps) => {
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

  const handleEditClick    = () => onEditRecipe();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const handleDeleteClick  = () => setShowDeleteConfirm(true);
  const handleDeleteAccept = () => deleteRecipe();
  const handleDeleteClose  = () => setShowDeleteConfirm(false);

  const editLink = showEditLink ? (
    <Link to={getResourcePath(`/recipe/edit/${recipe?.slug}`)} onClick={handleEditClick}>
      <Button variant='primary' size='sm'>
        <i className='bi bi-pencil-fill' />
      </Button>
    </Link>
  ) : null;

  const deleteLink = showEditLink ? (
    <Button variant='outline-danger' size='sm' onClick={handleDeleteClick}>
      <Icon icon='trash' />
    </Button>
  ) : null;

  let hostname = '';
  if (recipe?.source) {
    // Get Host name of a URL
    const a = document.createElement('a');
    a.href = recipe.source;
    hostname = a.hostname;
  }

  const chips = (
    <>
      <div className='recipe-header-chips'>
        {recipe && recipe.prepTime != null && recipe.prepTime > 0 && (
          <Chip variant='secondary'>
            <Icon icon='clock' />
            {`${formatMessage(messages.prep_time)}: `}
            {recipe.prepTime}
            {` ${formatMessage(messages.minutes)}`}
          </Chip>
        )}
        {recipe != null && recipe.cookTime != null && recipe.cookTime > 0 && (
          <Chip variant='secondary'>
            <Icon icon='clock' />
            {`${formatMessage(messages.cooking_time)}: `}
            {recipe.cookTime}
            {` ${formatMessage(messages.minutes)}`}
          </Chip>
        )}
        {recipe?.course != null && recipe.course.title != null && recipe.course.title.length > 0 && (
          <Chip variant='secondary'>
            <Icon icon='bar-chart' />
            {optionallyFormatMessage(intl, 'course.', recipe.course.title)}
          </Chip>
        )}
        {recipe?.cuisine != null && recipe.cuisine.title != null && recipe.cuisine.title.length > 0 && (
          <Chip variant='secondary'>
            <Icon icon='globe' variant='light' />
            {optionallyFormatMessage(intl, 'cuisine.', recipe.cuisine.title)}
          </Chip>
        )}
      </div>
      <div className='recipe-header-chips'>
        <Chip variant='secondary'>
          <Icon icon='calendar' />
          {recipe?.updateDate?.toLocaleDateString(intl.locale)}
        </Chip>
        <Chip variant='secondary'>
          <Icon icon='person' />
          {recipe?.username ?? ''}
        </Chip>
      </div>
    </>
  );

  return (
    <>
      <article className='recipe-header'>
        <h1 className='d-block d-xl-none'>{recipe?.title}</h1>

        {recipe != null && recipe.photo && (
          <Row className='flex-row-reverse'>
            <Col xl={6} lg={12} className='img-wrapper print-hidden'>
              <WidthHeightRatio height={66.67} width={100}>
                <Image
                    src = {recipe.photo}
                    alt = ''
                    className='img-responsive print-hidden' />
              </WidthHeightRatio>
              <div className='options print-hidden'>
                <div className='options-wrapper'>
                  {showEditLink && (
                    <>
                      {editLink}
                      {deleteLink}
                    </>
                  )}
                  {/*
                    <Button variant='outline-primary' aria-label='Add receipt to menu' onClick={onAddToMenuClick}>
                      <Icon icon='calendar' />
                    </Button>
                  */}
                  <Button variant='outline-primary' aria-label='Print receipt' onClick={window.print}>
                    <Icon icon='printer' />
                  </Button>
                </div>
              </div>
            </Col>
            <Col sm={7} xs={12} className='col-sm-push-5 print-only'>
              <WidthHeightRatio height={66.67} width={100} className='print-only print-image'>
                <Image
                    src = {recipe.photoThumbnail ?? recipe.photo}
                    alt = '' />
              </WidthHeightRatio>
            </Col>

            <Col xl={6} lg={12} className='info-wrapper'>
              <h1 className='d-none d-xl-block'>{recipe?.title}</h1>
              <P>{recipe?.info}</P>
              <Ratings stars={recipe?.rating ?? 0} />
              {chips}
              {recipe?.source && (
                <div>
                  {`${formatMessage(messages.source)}: `}
                  <a href={recipe.source}>{hostname}</a>
                </div>
              )}
            </Col>
          </Row>
        )}
      </article>

      <Modal
          show        = {showDeleteConfirm}
          title       = {formatMessage(messages.confirm_delete_title)}
          acceptTitle = {formatMessage(messages.confirm_delete_accept)}
          onAccept    = {handleDeleteAccept}
          onClose     = {handleDeleteClose}
          className   = 'delete'>
        {formatMessage(messages.confirm_delete_message)}
      </Modal>
    </>
  );
};

export default RecipeHeader;
