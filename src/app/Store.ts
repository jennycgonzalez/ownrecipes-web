import { combineReducers } from 'redux';

import account from '../account/store/reducer';
import { AccountState } from '../account/store/types';
import browse, { BrowseState } from '../browse/store/Reducer';
import connection from '../connection/store/reducer';
import { ConnectionState } from '../connection/store/types';
import error from '../error/store/reducer';
import { ErrorState } from '../error/store/types';
// import list from '../../list/reducers/GroceryListReducer';
import recipe from '../recipe/store/RecipeReducer';
import { RecipeState } from '../recipe/store/RecipeTypes';
import recipes from '../recipe/store/RecipesReducer';
import { RecipesState } from '../recipe/store/RecipesTypes';
// import recipeForm from '../../recipe_form/reducers/Reducer';
// import menu from '../../menu/reducers/reducer';
import news from '../news/store/reducer';
import { NewsState } from '../news/store/types';
import ratings from '../rating/store/reducer';
import { RatingsState } from '../rating/store/types';
import settings from '../account/store/settings/reducer';
import { SettingsState } from '../account/store/settings/types';

export type CombinedStore = {
  account:    AccountState;
  browse:     BrowseState;
  connection: ConnectionState;
  error:      ErrorState;
  // list:       ListState;
  // menu:       MenuState;
  news:       NewsState;
  ratings:    RatingsState;
  recipe:     RecipeState;
  recipes:    RecipesState;
  // recipeForm: RecipeFormState;
  settings:   SettingsState;
}

const reducer = combineReducers({
  account,
  browse,
  connection,
  error,
  // list,
  // menu,
  news,
  ratings,
  recipe,
  recipes,
  // recipeForm,
  settings,
});

export default reducer;
