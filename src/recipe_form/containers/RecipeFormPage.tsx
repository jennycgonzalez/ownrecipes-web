import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { defineMessages, useIntl } from 'react-intl';

import * as RecipeFormActions from '../store/actions';

import RecipeForm from '../components/RecipeForm';
import { CombinedStore } from '../../app/Store';
import { Recipe } from '../../recipe/store/RecipeTypes';
import PageWrapper from '../../common/components/PageWrapper';
import EditGuard from '../components/EditGuard';

const RecipeFormPage: React.FC = () => {
  const intl = useIntl();
  const messages = defineMessages({
    new_recipe: {
      id: 'recipe_form.new_recipe',
      description: 'New Recipe documentTitle',
      defaultMessage: 'New Recipe',
    },
  });

  const dispatch = useDispatch();
  const params = useParams();

  const fetchRecipeList = RecipeFormActions.fetchRecipeList;

  const save            = useCallback((data: Recipe) => dispatch(RecipeFormActions.save(data)), [dispatch, RecipeFormActions]);
  const validate        = useCallback((data: Recipe) => dispatch(RecipeFormActions.validate(data)), [dispatch, RecipeFormActions]);

  const recipeForm = useSelector((state: CombinedStore) => state.recipeForm.item);
  const validation = useSelector((state: CombinedStore) => state.recipeForm.validation);

  const recipeSlug = params.recipe ?? '';
  const isNew = recipeSlug === 'create';

  const paramsRecipe = params.recipe;
  // Load Recipe / or init.
  useEffect(() => {
    if (paramsRecipe) {
      window.scrollTo(0, 0);
      if (paramsRecipe === 'create') {
        dispatch(RecipeFormActions.create());
      } else {
        dispatch(RecipeFormActions.load(paramsRecipe));
      }
    }
  }, [paramsRecipe]);

  // componentWillUnmount
  useEffect(() => () => {
    dispatch(RecipeFormActions.reset());
  }, []);

  const handleUpdate = (name: string, value: unknown) => {
    dispatch(RecipeFormActions.update(name, value));
  };

  return (
    <PageWrapper title={isNew ? intl.formatMessage(messages.new_recipe) : recipeForm?.title}>
      <EditGuard />
      <RecipeForm
          form      = {recipeForm}
          validation = {validation}

          fetchRecipeList = {fetchRecipeList}
          update    = {handleUpdate}
          validate  = {validate}
          save      = {save} />
    </PageWrapper>
  );
};

export default RecipeFormPage;
