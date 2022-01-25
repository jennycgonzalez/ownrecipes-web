import { combineReducers } from 'redux';
import status from './status';
import form from './RecipeFormReducer';
import recipeGroups from './RecipeGroupsReducer';

const recipe = combineReducers({
  form,
  status,
  recipeGroups,
});

export default recipe;
