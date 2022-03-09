import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { defineMessages, useIntl } from 'react-intl';

import * as RecipeFormActions from '../store/actions';
import * as RecipeGroupActions from '../../recipe_groups/store/actions';

import RecipeForm from '../components/RecipeForm';
import { CombinedStore } from '../../app/Store';
import { getResourcePath } from '../../common/utility';
import { Recipe } from '../../recipe/store/RecipeTypes';
import PageWrapper from '../../common/components/PageWrapper';
import { PendingState } from '../../common/store/GenericReducerType';
import useSingle from '../../common/hooks/useSingle';

const RecipeFormContainer: React.FC = () => {
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
  const nav = useNavigate();

  const fetchCuisines   = useCallback(() => dispatch(RecipeGroupActions.fetchCuisines()), [dispatch, RecipeFormActions]);
  const fetchCourses    = useCallback(() => dispatch(RecipeGroupActions.fetchCourses()) , [dispatch, RecipeFormActions]);
  const fetchTags       = useCallback(() => dispatch(RecipeGroupActions.fetchTags())    , [dispatch, RecipeFormActions]);
  const fetchRecipeList = RecipeFormActions.fetchRecipeList;
  const save            = useCallback((data: Recipe) => dispatch(RecipeFormActions.save(data)), [dispatch, RecipeFormActions]);
  const validate        = useCallback((data: Recipe) => dispatch(RecipeFormActions.validate(data)), [dispatch, RecipeFormActions]);

  const accountState    = useSelector((state: CombinedStore) => state.account);
  const recipeFormState = useSelector((state: CombinedStore) => state.recipeForm);
  const courses  = useSelector((state: CombinedStore) => state.recipeGroups.courses);
  const cuisines = useSelector((state: CombinedStore) => state.recipeGroups.cuisines);
  const tags     = useSelector((state: CombinedStore) => state.recipeGroups.tags);
  const user = accountState.item;
  const recipeForm = recipeFormState.item;

  const [isDirty, setDirty] = useState<boolean>(false);

  const recipeSlug = params.recipe ?? '';
  const isNew = recipeSlug === 'create';
  const mayEdit = user != null && (isNew || (recipeForm != null && user.id === recipeForm.author));

  useSingle(fetchCuisines, cuisines.items);
  useSingle(fetchCourses , courses.items);
  useSingle(fetchTags    , tags.items);

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

  useEffect(() => {
    if (user != null && recipeForm != null && !mayEdit) {
      nav(getResourcePath(`/recipe/${recipeSlug}`));
    }
  }, [user, recipeForm, mayEdit]);

  useEffect(() => {
    if (recipeForm == null) return;
    if (recipeFormState.pending === PendingState.COMPLETED) {
      if (isDirty) {
        setDirty(false);
      }
      if (isNew) {
        nav(getResourcePath(`/recipe/edit/${recipeForm.slug}`));
      }
    }
  }, [recipeFormState.pending]);

  // componentWillUnmount
  useEffect(() => () => {
    dispatch(RecipeFormActions.reset());
  }, []);

  const handleUpdate = (name: string, value: unknown) => {
    if (!isDirty) {
      setDirty(true);
    }
    dispatch(RecipeFormActions.update(name, value));
  };

  return (
    <PageWrapper title={isNew ? intl.formatMessage(messages.new_recipe) : recipeForm?.title}>
      <RecipeForm
          // tags   = {tags.items}
          courses   = {courses.items}
          cuisines  = {cuisines.items}
          form      = {recipeForm}

          formState = {recipeFormState}
          isDirty   = {isDirty}

          fetchRecipeList = {fetchRecipeList}
          update    = {handleUpdate}
          validate  = {validate}
          save      = {save} />
    </PageWrapper>
  );
};

export default RecipeFormContainer;
