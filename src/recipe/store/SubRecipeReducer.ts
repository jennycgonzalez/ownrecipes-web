import { RecipeActionTypes } from './types';

/*
const merge = (state, action) => {
  const list = [];
  // eslint-disable-next-line
  state.map((i) => {
    if (i.checked) {
      list.push(i.id);
    }
  });

  return action.subrecipes.map(i => {
    const checked = list.includes(i.child_recipe_id);
    const custom = action.formatQuantity(i.numerator, i.denominator);
    return { ...i, quantity: custom, checked: checked };
  });
};
*/

const subRecipes = (state = [], action: any) => {
  switch (action.type) {
    /*
    case RecipeActionTypes.RECIPE_LOAD:
      return state ? merge(state, action) : action;
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
    case RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE:
      return state.map(i => {
        const custom = action.formatQuantity(i.numerator, i.denominator);
        return { ...i, quantity: custom };
      });
      */
    default:
      return state;
  }
};

export default subRecipes;
