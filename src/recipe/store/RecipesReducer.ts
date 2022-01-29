import ReduxHelper from '../../common/store/ReduxHelper';
import { Recipe, RecipeAction, RecipeActionTypes, RecipesAction, RecipesState, RECIPES_STORE, RECIPE_STORE } from './types';

const defaultState: RecipesState = ReduxHelper.getMapReducerDefaultState<Recipe>(RECIPES_STORE);

const recipes = (state = defaultState, action: RecipesAction): RecipesState => {
  if (action.store === RECIPE_STORE) {
    const recipeAction = action as RecipeAction;
    switch (recipeAction.type) {
      case RecipeActionTypes.RECIPE_LOAD:
        return ReduxHelper.setMapItem(state, recipeAction.data.slug, recipeAction.data);
      case RecipeActionTypes.RECIPE_DELETE:
        return ReduxHelper.deleteMapItem(state, recipeAction.data);
      default: break;
    }
  }

  return ReduxHelper.caseDefaultReducer(state, action, defaultState);
};

export default recipes;
