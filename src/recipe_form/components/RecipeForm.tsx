import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import '../css/recipe_form.css';

import Checkbox from '../../common/components/Checkbox';
import FileSelect from '../../common/components/FileSelect';
import Input from '../../common/components/Input';
import RecipeGroupSelect from './RecipeGroupSelect';

import IngredientGroupsBox from './IngredientGroupsBox';
import DirectionBox from './DirectionBox';
import SubRecipeBox from './SubRecipeBox';
import TagList from './TagList';
import Status from './Status';
import { Course, Cuisine, Recipe } from '../../recipe/store/RecipeTypes';
import { AutocompleteListItem, RecipeFormState } from '../store/types';
import { getRecipeImage, getResourcePath } from '../../common/utility';
import { formatValidation } from '../../common/store/Validation';
import WidthHeightRatio from '../../common/components/WidthHeightRatio';
import Image from '../../common/components/Image';

export interface IRecipeFormProps {
  form:      Recipe | undefined;

  formState: RecipeFormState;
  isDirty:   boolean;

  courses:   Array<Course> | undefined;
  cuisines:  Array<Cuisine> | undefined;

  fetchRecipeList: (searchTerm: string) => Promise<AutocompleteListItem[]>;

  update:   (name: string, value: unknown) => void;
  validate: (form: Recipe) => void;
  save:     (form: Recipe) => void;
}

const RecipeForm: React.FC<IRecipeFormProps> = ({
    form, formState, isDirty, courses, cuisines,
    fetchRecipeList, update, validate, save } : IRecipeFormProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    name_label: {
      id: 'recipe.create.name_label',
      description: 'Recipe name label',
      defaultMessage: 'Recipe name',
    },
    course_label: {
      id: 'recipe.create.course_label',
      description: 'Course label',
      defaultMessage: 'Course',
    },
    cuisine_label: {
      id: 'recipe.create.cuisine_label',
      description: 'Cuisine label',
      defaultMessage: 'Cuisine',
    },
    tags_label: {
      id: 'recipe.create.tags_label',
      description: 'Tags label',
      defaultMessage: 'Tags',
    },
    tags_tooltip: {
      id: 'recipe.create.tags_tooltip',
      description: 'Tags tooltip',
      defaultMessage: 'Separate each tag by comma.',
    },
    prep_time_label: {
      id: 'recipe.create.prep_time_label',
      description: 'Prep time label',
      defaultMessage: 'Prep time (min)',
    },
    cooking_time_label: {
      id: 'recipe.create.cooking_time_label',
      description: 'Cooking time label',
      defaultMessage: 'Cooking time (min)',
    },
    servings_label: {
      id: 'recipe.create.servings_label',
      description: 'Servings label',
      defaultMessage: 'Servings',
    },
    information_label: {
      id: 'recipe.create.information_label',
      description: 'Recipe information label',
      defaultMessage: 'Recipe information',
    },
    information_placeholder: {
      id: 'recipe.create.information_placeholder',
      description: 'Recipe information placeholder',
      defaultMessage: 'A quick description of the recipe',
    },
    source_label: {
      id: 'recipe.create.source_label',
      description: 'Rating source label',
      defaultMessage: 'Source',
    },
    source_tooltip: {
      id: 'recipe.create.source_tooltip',
      description: 'Rating source tooltip',
      defaultMessage: 'Where the original recipe is from.',
    },
    photo_label: {
      id: 'recipe.create.photo_label',
      description: 'Photo label',
      defaultMessage: 'Photo',
    },
    photo_help_text: {
      id: 'recipe.create.photo_help_text',
      description: 'The photo must be smaller than 500 kB.',
      defaultMessage: 'The photo must be smaller than 500 kB.',
    },
    public_label: {
      id: 'recipe.create.public_label',
      description: 'Recipe set public label',
      defaultMessage: 'Public Recipe',
    },
    submit: {
      id: 'recipe.create.submit',
      description: 'Submit recipe button',
      defaultMessage: 'Submit recipe',
    },
    save: {
      id: 'recipe.create.save',
      description: 'Save recipe button',
      defaultMessage: 'Save',
    },
    view: {
      id: 'recipe.create.view',
      description: 'View recipe button',
      defaultMessage: 'View',
    },
  });

  const isNew = form == null || form.id == null || form.id === 0;
  const showViewButton = !isNew && !isDirty && form?.slug != null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (form == null) return;
    e.preventDefault();
    save(form);
  };

  const handleInvalide = () => {
    if (form == null) return;
    validate(form);
  };

  return (
    <Form className='recipe-form' onSubmit={handleSubmit} onInvalid={handleInvalide}>
      <Container>
        <Row>
          <Status queryState={formState} />
        </Row>
        <Row>
          <Col id='recipe-meta' md={5} lg={4}>
            <Row>
              <Col xs={12}>
                <Input
                    name     = 'title'
                    label    = {formatMessage(messages.name_label)}
                    value    = {form?.title ?? ''}
                    required
                    errors   = {formatValidation(intl, formState.validation?.title)}
                    onChange = {update} />
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <WidthHeightRatio height={66.67} width={100}>
                  <Image
                      src   = {getRecipeImage(form?.photoThumbnail ?? '/images/fried-eggs.jpg')}
                      alt   = ''
                      style = {{ objectFit: 'contain' }} />
                </WidthHeightRatio>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <FileSelect
                    name     = 'photo'
                    label    = {formatMessage(messages.photo_label)}
                    helpText = {formatMessage(messages.photo_help_text)}
                    accept   = 'image/*'
                    onChange = {update} />
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={6}>
                <RecipeGroupSelect
                    name     = 'course'
                    label    = {formatMessage(messages.course_label)}
                    data     = {courses}
                    value    = {form?.course ?? ''}
                    required
                    errors   = {formatValidation(intl, formState.validation?.course)}
                    onChange = {update} />
              </Col>
              <Col xs={12} sm={6}>
                <RecipeGroupSelect
                    name     = 'cuisine'
                    label    = {formatMessage(messages.cuisine_label)}
                    data     = {cuisines}
                    value    = {form?.cuisine ?? ''}
                    required
                    errors   = {formatValidation(intl, formState.validation?.cuisine)}
                    onChange = {update} />
              </Col>
              <Col xs={12}>
                <TagList
                    name     = 'tags'
                    label    = {formatMessage(messages.tags_label)}
                    tooltip  = {formatMessage(messages.tags_tooltip)}
                    tags     = {form?.tags ?? []}
                    errors   = {formatValidation(intl, formState.validation?.tags)}
                    onChange = {update} />
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={6}>
                <Input
                    name     = 'prepTime'
                    type     = 'number'
                    label    = {formatMessage(messages.prep_time_label)}
                    value    = {form?.prepTime ?? ''}
                    min      = {1}
                    max      = {999}
                    errors   = {formatValidation(intl, formState.validation?.prepTime)}
                    onChange = {update} />
              </Col>
              <Col xs={12} sm={6}>
                <Input
                    name     = 'cookTime'
                    type     = 'number'
                    label    = {formatMessage(messages.cooking_time_label)}
                    value    = {form?.cookTime ?? ''}
                    errors   = {formatValidation(intl, formState.validation?.cookTime)}
                    onChange = {update} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Input
                    name     = 'servings'
                    type     = 'number'
                    label    = {formatMessage(messages.servings_label)}
                    value    = {form?.servings ?? ''}
                    min      = {1}
                    max      = {999}
                    required
                    errors   = {formatValidation(intl, formState.validation?.servings)}
                    onChange = {update} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Input
                    name     = 'source'
                    label    = {formatMessage(messages.source_label)}
                    tooltip  = {formatMessage(messages.source_tooltip)}
                    value    = {form?.source ?? ''}
                    errors   = {formatValidation(intl, formState.validation?.source)}
                    onChange = {update} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Checkbox
                    name      = 'public'
                    label     = {formatMessage(messages.public_label)}
                    value     = {form?.public ?? false}
                    errors    = {formatValidation(intl, formState.validation?.public)}
                    onChange  = {update} />
              </Col>
            </Row>

          </Col>
          <Col id='recipe' md={7} lg={8}>
            <Input
                name     = 'info'
                rows     = {4}
                label    = {formatMessage(messages.information_label)}
                placeholder = {formatMessage(messages.information_placeholder)}
                value    = {form?.info ?? ''}
                errors   = {formatValidation(intl, formState.validation?.info)}
                onChange = {update} />
            <IngredientGroupsBox
                name     = 'ingredientGroups'
                groups   = {form?.ingredientGroups}
                errors   = {formatValidation(intl, formState.validation?.ingredientGroups)}
                onChange = {update} />
            <SubRecipeBox
                name       = 'subrecipes'
                subrecipes = {form?.subrecipes}
                errors     = {formatValidation(intl, formState.validation?.subrecipes)}
                fetchRecipeList = {fetchRecipeList}
                onChange   = {update} />
            <DirectionBox
                name       = 'directions'
                directions = {form?.directions ?? ''}
                errors     = {formatValidation(intl, formState.validation?.directions)}
                onChange   = {update} />

            <Button
                variant = 'primary'
                type    = 'submit'
                as = {showViewButton ? Link as any : undefined}
                to = {showViewButton ? getResourcePath(`/recipe/${form.slug}`) : null}>
              {formatMessage(showViewButton ? messages.view : messages.submit)}
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default RecipeForm;
