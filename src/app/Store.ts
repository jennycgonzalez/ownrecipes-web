import { combineReducers } from 'redux';

import account from '../account/store/reducer';
import { AccountState } from '../account/store/types';
import error from '../error/store/reducer';
import { ErrorState } from '../error/store/types';
// import browse from '../../browse/reducers/Reducer';
// import list from '../../list/reducers/GroceryListReducer';
import recipe from '../recipe/store/RecipeReducer';
import recipes from '../recipe/store/RecipesReducer';
import { RecipeState, RecipesState } from '../recipe/store/types';
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
  // browser:    BrowseState;
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
  // browse,
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
