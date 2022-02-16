import ReduxHelper, { ACTION } from '../../common/store/ReduxHelper';
import { Recipe, RecipeAction, RecipeActionTypes, RECIPE_STORE } from './RecipeTypes';
import { RecipesAction, RecipesState, RECIPES_STORE } from './RecipesTypes';

const defaultState: RecipesState = ReduxHelper.getMapReducerDefaultState<Recipe>(RECIPES_STORE);

const recipes = (state = defaultState, action: RecipesAction): RecipesState => {
  if (state.ident !== action.store) return ReduxHelper.caseDefaultReducer(state, action, defaultState);

  if (action.store === RECIPE_STORE) {
    const recipeAction = action as RecipeAction;
    switch (recipeAction.type) {
      case ACTION.GET_SUCCESS:
        return ReduxHelper.setMapItem(state, recipeAction.data.slug, recipeAction.data);
      case RecipeActionTypes.RECIPE_DELETE:
        return ReduxHelper.deleteMapItem(state, recipeAction.data);
      default: break;
    }
  }

  return ReduxHelper.caseDefaultReducer(state, action, defaultState);
};

export default recipes;
