import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { RecipeActionTypes, RecipeDispatch, RECIPE_STORE, toRecipe } from './RecipeTypes';
import { ACTION } from '../../common/store/ReduxHelper';

export const load = (recipeSlug: string) => (dispatch: RecipeDispatch) => {
  dispatch({ store: RECIPE_STORE, type: ACTION.GET_START });
  request()
    .get(`${serverURLs.recipe}${recipeSlug}/`)
    .then(res => {
      dispatch({ store: RECIPE_STORE, type: ACTION.GET_SUCCESS, data: toRecipe(res.body) });
    })
    .catch(err => dispatch(handleError(err, RECIPE_STORE)));
};

export const deleteRecipe = (recipeSlug: string) => (dispatch: RecipeDispatch) => {
  dispatch({ store: RECIPE_STORE, type: ACTION.DELETE_START });
  request()
    .get(`${serverURLs.recipe}${recipeSlug}/`)
    .then(() => {
      dispatch({ store: RECIPE_STORE, type: RecipeActionTypes.RECIPE_DELETE, data: recipeSlug });
    })
    .catch(err => dispatch(handleError(err, RECIPE_STORE)));
};

export const updateServings = (recipeSlug: string, value: number) => (dispatch: RecipeDispatch) => {
  dispatch({
    store: RECIPE_STORE,
    type: RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE,
    recipeSlug: recipeSlug,
    customServings: value,
  });
};

export const resetServings = (recipeSlug: string) => (dispatch: RecipeDispatch) => {
  dispatch({
    store: RECIPE_STORE,
    type: RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_RESET,
    recipeSlug: recipeSlug,
  });
};

export const checkIngredient = (recipeSlug: string, id: number, value: boolean) => (dispatch: RecipeDispatch) => {
  dispatch({
    store: RECIPE_STORE,
    type: RecipeActionTypes.RECIPE_INGREDIENT_CHECK_INGREDIENT,
    recipeSlug: recipeSlug,
    id: id,
    value: value,
  });
};

export const checkSubRecipe = (recipeSlug: string, id: number, value: boolean) => (dispatch: RecipeDispatch) => {
  dispatch({
    store: RECIPE_STORE,
    type: RecipeActionTypes.RECIPE_INGREDIENT_CHECK_SUBRECIPE,
    recipeSlug: recipeSlug,
    id: id,
    value: value,
  });
};

export const checkAll = (recipeSlug: string) => (dispatch: RecipeDispatch) => {
  dispatch({
    store: RECIPE_STORE,
    type: RecipeActionTypes.RECIPE_INGREDIENT_CHECK_ALL,
    recipeSlug: recipeSlug,
  });
};

export const unCheckAll = (recipeSlug: string) => (dispatch: RecipeDispatch) => {
  dispatch({
    store: RECIPE_STORE,
    type: RecipeActionTypes.RECIPE_INGREDIENT_UNCHECK_ALL,
    recipeSlug: recipeSlug,
  });
};

/*
export const bulkAdd = (recipeState: Recipe, list: string) => (dispatch: RecipeDispatch) => {
  const format = (i: Ingredient) => {
    const quantity = i.quantity && i.quantity !== '0' ? `${i.quantity} ` : '';
    const measurement = i.measurement ? `${i.measurement} ` : '';
    return quantity + measurement + i.title;
  };

  let checkedIngredients = recipeState.ingredient_groups.map(item => item.ingredients.reduce((myList, ingredient) => {
      if (ingredient && ingredient.checked) {
        myList.push({ list: list, title: format(ingredient) });
      }
      return myList;
    }, []));

  const checkedSubRecipe = recipeState.subrecipes.reduce((myList, ingredient) => {
    if (ingredient && ingredient.checked) {
      myList.push({ list: list, title: format(ingredient) });
    }
    return myList;
  }, []);

  checkedIngredients = checkedIngredients.reduce((a, b) => a.concat(b), []).concat(checkedSubRecipe);

  if (checkedIngredients.length > 0) {
    dispatch({ type: RecipeConstants.RECIPE_LIST_LOADING });
    request()
      .post(serverURLs.bulk_list_item)
      .send(checkedIngredients)
      .then(res => {
        dispatch({ type: RecipeConstants.RECIPE_LIST_COMPLETE });
        dispatch({
          type: RecipeConstants.RECIPE_INGREDIENT_UNCHECK_ALL,
          recipeSlug: recipeState.slug,
        });
      })
      .catch(err => { dispatch({ type: RecipeConstants.RECIPE_LIST_ERROR }); });
  }
};
*/
