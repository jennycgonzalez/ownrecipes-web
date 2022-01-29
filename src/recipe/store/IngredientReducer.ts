import ReduxHelper from '../../common/store/ReduxHelper';
import { RecipeAction, RecipeActionTypes } from './types';

/*
const ingredients = (state, cb) => state.map(ig => ({
  ...ig,
  ingredients: ig.ingredients.map(ingredient => cb(ingredient)),
}));

const merge = (state, action) => {
  const list = [];
  // eslint-disable-next-line
  state.map((ig) => {
    // eslint-disable-next-line
    ig.ingredients.map(ingredient => {
      if (ingredient.checked) {
        list.push(ingredient.id);
      }
    });
  });

  return ingredients(action.ingredient_groups, i => {
    const checked = list.includes(i.id);
    const custom = action.formatQuantity(i.numerator, i.denominator);
    return { ...i, quantity: custom, checked: checked };
  });
};
*/

const recipes = (state = [], action: RecipeAction) => {
  switch (action.type) {
    /*
    case RecipeActionTypes.RECIPE_LOAD:
      return state ? merge(state, action) : action;
    case RecipeActionTypes.RECIPE_INGREDIENT_CHECK_INGREDIENT:
      return ingredients(state, i => {
        if (i.id === action.id) {
          return { ...i, checked: action.value };
        }
        return i;
      });
    case RecipeActionTypes.RECIPE_INGREDIENT_CHECK_ALL:
      return ingredients(state, i => ({ ...i, checked: true }));
    case RecipeActionTypes.RECIPE_INGREDIENT_UNCHECK_ALL:
      return ingredients(state, i => ({ ...i, checked: false }));
    case RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE:
      return ingredients(state, i => {
        const custom = action.formatQuantity(i.numerator, i.denominator);
        return { ...i, quantity: custom };
      });
    */
    default:
      return state;
  }
};

export default recipes;
