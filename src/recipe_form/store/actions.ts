import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import validation from './validation';
import { RECIPE_FORM_STORE, RecipeFormDispatch, RecipeFormActionTypes, AutocompleteListItem } from './types';
import { ACTION } from '../../common/store/ReduxHelper';
import { Recipe, RecipeDto, toRecipe, toRecipeRequest } from '../../recipe/store/RecipeTypes';
import { createValidationResult, hasValidationError, runFieldValidator, runValidators, ValidationResult } from '../../common/store/Validation';
import { COURSES_STORE, CUISINES_STORE, TAGS_STORE } from '../../recipe_groups/store/types';

export const load = (recipeSlug: string) => (dispatch: RecipeFormDispatch) => {
  dispatch({ store: RECIPE_FORM_STORE, type: ACTION.GET_START });
  request()
    .get(`${serverURLs.recipe}${recipeSlug}/`)
    .then(res => {
      dispatch({
        store: RECIPE_FORM_STORE, type: ACTION.GET_SUCCESS, data: toRecipe(res.body) });
    })
    .catch(err => dispatch(handleError(err, RECIPE_FORM_STORE)));
};

export const update = (name: string, value: unknown) => {
  const validator = validation.find(v => name === v.name);
  const valResult: ValidationResult = createValidationResult();
  if (validator) runFieldValidator(valResult, validator.validators, name, value);

  return (dispatch: RecipeFormDispatch) => {
    dispatch({
      store: RECIPE_FORM_STORE,
      type:  RecipeFormActionTypes.RECIPE_FORM_UPDATE,
      name:  name,
      value: value,
      validation: valResult,
    });
  };
};

export const create = () => (dispatch: RecipeFormDispatch) => {
  dispatch({
    store: RECIPE_FORM_STORE,
    type:  RecipeFormActionTypes.RECIPE_FORM_INIT,
    data:  { slug: '', public: true, servings: 1 } as Recipe,
  });
};

export const validate = (data: Recipe) => (dispatch: RecipeFormDispatch) => {
  const valResult: ValidationResult = runValidators(validation, data);

  if (Object.keys(valResult).length) {
    dispatch({
      store:  RECIPE_FORM_STORE,
      type:   ACTION.VALIDATION,
      data:   valResult,
      mode:   'overwrite',
    });
  }
};

export const save = (data: Recipe) => (dispatch: RecipeFormDispatch) => {
  const monkeypatchPhotoUrls = (response: Recipe): Recipe => {
    // PATCH Recipe returns incomplete urls, see https://github.com/ownrecipes/ownrecipes-api/issues/7
    if (data.photo != null && response.photo != null && data.photo.endsWith(response.photo)) {
      response.photo = data.photo;
    }
    if (data.photoThumbnail != null && response.photoThumbnail != null && data.photoThumbnail.endsWith(response.photoThumbnail)) {
      response.photoThumbnail = data.photoThumbnail;
    }
    return response;
  };

  const valResult: ValidationResult = runValidators(validation, data);
  dispatch({
    store: RECIPE_FORM_STORE,
    type:  ACTION.VALIDATION,
    data:  valResult,
  });
  if (hasValidationError(valResult)) {
    return;
  }

  const photo = (typeof data.photo === 'object') ? data.photo : undefined;

  const isNew = !data.id;
  const r = isNew
      ? request().post(serverURLs.recipe)
      : request().patch(`${serverURLs.recipe}${data.slug}/`);

  dispatch({
    store: RECIPE_FORM_STORE,
    type:  isNew ? ACTION.CREATE_START : ACTION.UPDATE_START,
  });

  const dto = toRecipeRequest(data);
  r.send(dto)
    .then(res => {
      // send the image once the file has been created
      if (photo) {
        request()
          .patch(`${serverURLs.recipe}${res.body.slug}/`)
          .attach('photo', photo)
          .then(resPhoto => {
            dispatch({
              store: RECIPE_FORM_STORE,
              type:  isNew ? ACTION.CREATE_SUCCESS : ACTION.UPDATE_SUCCESS,
              oldId: data.id,
              data:  toRecipe(resPhoto.body),
            });
          })
          .catch(err => dispatch(handleError(err, RECIPE_FORM_STORE)));
      } else {
        dispatch({
          store: RECIPE_FORM_STORE,
          type:  isNew ? ACTION.CREATE_SUCCESS : ACTION.UPDATE_SUCCESS,
          oldId: isNew ? (null as any) : data.id, // eslint-disable-line @typescript-eslint/no-explicit-any
          data:  monkeypatchPhotoUrls(toRecipe(res.body)),
        });
      }

      // OPT HACK: Move this to recipe_groups
      dispatch(invalidateCreatableLists(data, toRecipe(res.body)));
    })
    .catch(err => dispatch(handleError(err, RECIPE_FORM_STORE)));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invalidateCreatableLists = (oldRecipe: Recipe, savedRecipe: Recipe): any => (dispatch: any) => {
  if (oldRecipe.course?.id !== savedRecipe.course?.id) {
    dispatch({ store: COURSES_STORE, type: ACTION.RESET });
  }
  if (oldRecipe.cuisine?.id !== savedRecipe.cuisine?.id) {
    dispatch({ store: CUISINES_STORE, type: ACTION.RESET });
  }
  if (oldRecipe.tags?.map(t => t.id).join('/') !== savedRecipe.tags?.map(t => t.id).join('/')) {
    dispatch({ store: TAGS_STORE, type: ACTION.RESET });
  }
};

export const fetchRecipeList = (searchTerm: string): Promise<Array<AutocompleteListItem>> => request()
    .get(`${serverURLs.recipe}?fields=id,title,slug&limit=5&search=${searchTerm}`)
    .then(res => res.body.results.map((recipe: RecipeDto) => ({ key: recipe.slug, name: recipe.slug, char: recipe.title } as AutocompleteListItem)))
    .catch(() => []);

export const preload = (recipe: Partial<Recipe>) => (dispatch: RecipeFormDispatch) => {
  dispatch({ store: RECIPE_FORM_STORE, type: ACTION.PRELOAD, data: recipe });
};

export const reset = () => (dispatch: RecipeFormDispatch) => {
  dispatch({ store: RECIPE_FORM_STORE, type: ACTION.RESET });
};
