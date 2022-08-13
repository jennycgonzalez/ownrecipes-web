import { combineReducers } from 'redux';

import account from '../account/store/reducer';
import { AccountState } from '../account/store/types';
import browse, { BrowseState } from '../browse/store/Reducer';
import connection from '../connection/store/reducer';
import { ConnectionState } from '../connection/store/types';
import internalError from '../internal_error/store/reducer';
import { InternalErrorState } from '../internal_error/store/types';
// import list from '../../list/reducers/GroceryListReducer';
import recipe from '../recipe/store/RecipeReducer';
import { RecipeState } from '../recipe/store/RecipeTypes';
import recipeForm from '../recipe_form/store/reducer';
import { RecipeFormState } from '../recipe_form/store/types';
import recipeGroups from '../recipe_groups/store/reducer';
import { RecipeGroupsState } from '../recipe_groups/store/types';
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
  internalError: InternalErrorState;
  // list:       ListState;
  // menu:       MenuState;
  news:       NewsState;
  ratings:    RatingsState;
  recipe:     RecipeState;
  recipeGroups: RecipeGroupsState;
  recipeForm: RecipeFormState;
  settings:   SettingsState;
}

const reducer = combineReducers({
  account,
  browse,
  connection,
  internalError,
  // list,
  // menu,
  news,
  ratings,
  recipe,
  recipeForm,
  recipeGroups,
  settings,
});

export default reducer;
