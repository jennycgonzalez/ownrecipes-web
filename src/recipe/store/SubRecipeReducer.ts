import { Dispatch as ReduxDispatch } from 'redux';
import { SubRecipe } from './RecipeTypes';

export const RECIPE_SUBRECIPES_STORE = '@@recipeSubrecipes';

export enum RecipeSubrecipesReducerActionTypes {
  RECIPE_SUBRECIPES_LOAD = 'RECIPE_SUBRECIPES_LOAD',
  RECIPE_SUBRECIPES_SERVINGS_UPDATE = 'RECIPE_SUBRECIPES_SERVINGS_UPDATE',
}

export interface IRecipeSubrecipesLoadAction {
  store: typeof RECIPE_SUBRECIPES_STORE;
  type: typeof RecipeSubrecipesReducerActionTypes.RECIPE_SUBRECIPES_LOAD;
  subrecipes: Array<SubRecipe>;
  formatQuantity: (numerator: number, denominator: number) => string;
}

export interface IRecipeSubrecipesIngredientsUpdateAction {
  store: typeof RECIPE_SUBRECIPES_STORE;
  type: typeof RecipeSubrecipesReducerActionTypes.RECIPE_SUBRECIPES_SERVINGS_UPDATE;
  formatQuantity: (numerator: number, denominator: number) => string;
}

export type RecipeSubrecipesState = Array<SubRecipe>;
export type RecipeSubrecipesAction = IRecipeSubrecipesLoadAction | IRecipeSubrecipesIngredientsUpdateAction;
export type RecipeSubrecipesDispatch  = ReduxDispatch<RecipeSubrecipesAction>;

const merge = (state: RecipeSubrecipesState, action: IRecipeSubrecipesLoadAction) => {
  const list: Array<number> = [];
  state
    .filter(subrecipe => subrecipe.checked)
    .forEach(subrecipe => list.push(subrecipe.child_recipe_id));

  return action.subrecipes.map(subrecipe => {
    const checked = list.includes(subrecipe.child_recipe_id);
    const custom = action.formatQuantity(subrecipe.numerator, subrecipe.denominator);
    return { ...subrecipe, quantity: custom, checked: checked };
  });
};

const defaultState: RecipeSubrecipesState = [];

const subRecipes = (state = defaultState, action: RecipeSubrecipesAction) => {
  if (action.store === RECIPE_SUBRECIPES_STORE) {
    switch (action.type) {
      case RecipeSubrecipesReducerActionTypes.RECIPE_SUBRECIPES_LOAD:
        return merge(state, action);
      case RecipeSubrecipesReducerActionTypes.RECIPE_SUBRECIPES_SERVINGS_UPDATE:
        return state.map(i => {
          const custom = action.formatQuantity(i.numerator, i.denominator);
          return { ...i, quantity: custom };
        });
      /*
        case RecipeActionTypes.RECIPE_INGREDIENT_CHECK_SUBRECIPE:
        return state.map(i => {
          if (i.child_recipe_id === action.id) {
            return { ...i, checked: action.value };
          }
          return i;
        });
      case RecipeActionTypes.RECIPE_INGREDIENT_CHECK_ALL:
        return state.map(i => ({ ...i, checked: true }));
      case RecipeActionTypes.RECIPE_INGREDIENT_UNCHECK_ALL:
        return state.map(i => ({ ...i, checked: false }));
        */
      default:
        break;
    }
  }

  return state;
};

export default subRecipes;
