import { combineReducers } from 'redux';
import user from '../account/reducers/LoginReducer';
import browse from '../browse/reducers/Reducer';
import list from '../list/reducers/GroceryListReducer';
import recipe from '../recipe/reducers/Reducer';
import recipeForm from '../recipe_form/reducers/Reducer';
import menu from '../menu/reducers/reducer';
import news from '../news/reducers/NewsReducer';
import rating from '../rating/reducers/Reducer';

const reducer = combineReducers({
  list,
  user,
  news,
  menu,
  browse,
  recipe,
  rating,
  recipeForm,
});

export default reducer;
