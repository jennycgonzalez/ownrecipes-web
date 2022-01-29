import ingredient from './IngredientReducer';
import subrecipes from './SubRecipeReducer';
import fq from '../utilts/formatQuantity';
import ReduxHelper from '../../common/store/ReduxHelper';
import { Recipe, RecipeAction, RecipeActionTypes, RecipesAction, RecipeState, RECIPE_STORE } from './types';

const defaultState: RecipeState = ReduxHelper.getItemReducerDefaultState<Recipe>(RECIPE_STORE);

const recipe = (state = defaultState, action: RecipesAction): RecipeState => {
  if (action.store !== RECIPE_STORE) return ReduxHelper.caseDefaultReducer(state, action, defaultState);

  const recipeAction = action as RecipeAction;
  switch (recipeAction.type) {
    case RecipeActionTypes.RECIPE_LOAD:
      {
        const actionRecipe = recipeAction.data;

        let subRecipes, ingredients;
        /*
        const hasRecipe = state.items?.find(t => t.id === actionRecipe.id) != null;
        if (state.items && hasRecipe) {
          return state.items.map(rec => {
            if (rec.id === recipeAction.data.id) {
              subRecipes = subrecipes(
                rec.subrecipes,
                { subrecipes: actionRecipe.subrecipes,
                  formatQuantity: fq.bind(this, rec.servings, actionRecipe.servings),
                  type: action.type }
              );
              ingredients = ingredient(
                rec.ingredient_groups,
                { ingredient_groups: actionRecipe.ingredient_groups,
                  formatQuantity: fq.bind(this, rec.servings, actionRecipe.servings),
                  type: action.type }
              );
              return {
                ...actionRecipe,
                subrecipes: subRecipes,
                ingredient_groups: ingredients,
              };
            }
            return rec;
          });
        } else {
          subRecipes = subrecipes(
            [],
            { subrecipes: actionRecipe.subrecipes,
              formatQuantity: fq.bind(this, actionRecipe.servings, actionRecipe.servings),
              type: action.type }
          );
          ingredients = ingredient(
            [],
            { ingredient_groups: actionRecipe.ingredient_groups,
              formatQuantity: fq.bind(this, actionRecipe.servings, actionRecipe.servings),
              type: action.type }
          );
          */

          const updItem = {
            ...actionRecipe,
            subrecipes: subRecipes ?? [],
            ingredient_groups: ingredients ?? [],
            customServings: actionRecipe.servings,
          };

          return ReduxHelper.setItem(state, updItem);
        // }
      }
    case RecipeActionTypes.RECIPE_DELETE:
      return defaultState;
    case RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE:
      /*
      return state.items?.map(recipe => {
        if (recipe.slug === action.recipeSlug) {
          action.servings = recipe.servings;
          const subRecipes = subrecipes(
            recipe.subrecipes,
            { formatQuantity: fq.bind(this, recipe.servings, action.customServings),
              type: action.type }
          );
          const ingredients = ingredient(
            recipe.ingredient_groups,
            { formatQuantity: fq.bind(this, recipe.servings, action.customServings),
              type: action.type }
          );
          return {
            ...recipe,
            subrecipes: subRecipes,
            ingredient_groups: ingredients,
            customServings: action.customServings,
          };
        }
        return recipe;
      }); */
      return state;
    /*
    case RecipeActionTypes.RECIPE_INGREDIENT:
    case RecipeActionTypes.RECIPE_INGREDIENT_CHECK_INGREDIENT:
    case RecipeActionTypes.RECIPE_INGREDIENT_CHECK_SUBRECIPE:
    case RecipeActionTypes.RECIPE_INGREDIENT_CHECK_ALL:
    case RecipeActionTypes.RECIPE_INGREDIENT_UNCHECK_ALL:
    case RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_RESET:
      return state.items?.map(recipe => {
        if (recipe.slug === action.recipeSlug) {
          return {
            ...recipe,
            subrecipes: subrecipes(recipe.subrecipes, action),
            ingredient_groups: ingredient(recipe.ingredient_groups, action),
          };
        }
        return recipe;
      }); */
      return state;
    default: return ReduxHelper.caseDefaultReducer(state, action, defaultState);
  }
};

export default recipe;
