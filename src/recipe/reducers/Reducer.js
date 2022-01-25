import { combineReducers } from 'redux';
import recipes from './RecipeReducer';
import status from './RecipeListStatusReducer';

const recipe = combineReducers({
  recipes,
  status,
});

export default recipe;
