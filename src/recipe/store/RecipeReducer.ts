import * as _ from 'lodash';

import ingredient, { RecipeIngredientReducerActionTypes, RECIPE_INGREDIENTS_STORE } from './IngredientReducer';
import subrecipes, { RecipeSubrecipesReducerActionTypes, RECIPE_SUBRECIPES_STORE } from './SubRecipeReducer';
import fq from '../utilts/formatQuantity';
import ReduxHelper from '../../common/store/ReduxHelper';
import { Recipe, RecipeAction, RecipeActionTypes, RecipeState, RECIPE_STORE } from './types';

const defaultState: RecipeState = ReduxHelper.getItemReducerDefaultState<Recipe>(RECIPE_STORE);

const recipe = (state = defaultState, action: RecipeAction): RecipeState => {
  if (action.store !== RECIPE_STORE) return ReduxHelper.caseDefaultReducer(state, action, defaultState);

  const recipeAction = action as RecipeAction;
  switch (recipeAction.type) {
    case RecipeActionTypes.RECIPE_LOAD:
      {
        const actionRecipe = recipeAction.data;

        let subRecipes, ingredients;

        if (state.item) {
          let updItem: Recipe = _.clone(state.item);
          subRecipes = subrecipes(
            updItem.subrecipes,
            { subrecipes: actionRecipe.subrecipes,
              formatQuantity: fq.bind(this, updItem.servings, actionRecipe.servings),
              store: RECIPE_SUBRECIPES_STORE,
              type: RecipeSubrecipesReducerActionTypes.RECIPE_SUBRECIPES_LOAD }
          );
          ingredients = ingredient(
            updItem.ingredientGroups,
            { ingredientGroups: actionRecipe.ingredientGroups,
              formatQuantity: fq.bind(this, updItem.servings, actionRecipe.servings),
              store: RECIPE_INGREDIENTS_STORE,
              type: RecipeIngredientReducerActionTypes.RECIPE_INGREDIENTS_LOAD }
          );

          updItem = {
            ...actionRecipe,
            subrecipes: subRecipes,
            ingredientGroups: ingredients,
          };
          return ReduxHelper.setItem(state, updItem);
        } else {
          subRecipes = subrecipes(
            [],
            { subrecipes: actionRecipe.subrecipes,
              formatQuantity: fq.bind(this, actionRecipe.servings, actionRecipe.servings),
              store: RECIPE_SUBRECIPES_STORE,
              type: RecipeSubrecipesReducerActionTypes.RECIPE_SUBRECIPES_LOAD }
          );
          ingredients = ingredient(
            [],
            { ingredientGroups: actionRecipe.ingredientGroups,
              formatQuantity: fq.bind(this, actionRecipe.servings, actionRecipe.servings),
              store: RECIPE_INGREDIENTS_STORE,
              type: RecipeIngredientReducerActionTypes.RECIPE_INGREDIENTS_LOAD }
          );

          const updItem: Recipe = {
            ...actionRecipe,
            subrecipes: subRecipes,
            ingredientGroups: ingredients,
            customServings: actionRecipe.servings,
          };

          return ReduxHelper.setItem(state, updItem);
        }
      }
    case RecipeActionTypes.RECIPE_DELETE:
      return defaultState;
    case RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE:
      {
        if (state.item == null) return state;

        const { customServings } = recipeAction;
        let updItem: Recipe = _.clone(state.item);

        const subRecipes = subrecipes(
          updItem.subrecipes,
          { store: RECIPE_SUBRECIPES_STORE,
            type: RecipeSubrecipesReducerActionTypes.RECIPE_SUBRECIPES_SERVINGS_UPDATE,
            formatQuantity: fq.bind(this, updItem.servings, customServings) }
        );
        const ingredients = ingredient(
          updItem.ingredientGroups,
          { store: RECIPE_INGREDIENTS_STORE,
            type: RecipeIngredientReducerActionTypes.RECIPE_INGREDIENTS_SERVINGS_UPDATE,
            formatQuantity: fq.bind(this, updItem.servings, customServings) }
        );
        updItem = {
          ...updItem,
          subrecipes: subRecipes,
          ingredientGroups: ingredients,
          customServings: customServings,
        };

        return ReduxHelper.setItem(state, updItem);
      }
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
      });
      return state; */
    default: return ReduxHelper.caseDefaultReducer(state, action, defaultState);
  }
};

export default recipe;
