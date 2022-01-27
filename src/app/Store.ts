import { combineReducers } from 'redux';

import account from '../account/store/reducer';
import { AccountState } from '../account/store/types';
import error from '../error/store/reducer';
import { ErrorState } from '../error/store/types';
// import browse from '../../browse/reducers/Reducer';
// import list from '../../list/reducers/GroceryListReducer';
// import recipe from '../../recipe/reducers/Reducer';
// import recipeForm from '../../recipe_form/reducers/Reducer';
// import menu from '../../menu/reducers/reducer';
import news from '../news/store/reducer';
import { NewsState } from '../news/store/types';
// import rating from '../../rating/reducers/Reducer';

export type CombinedStore = {
  account:    AccountState;
  // browser:    BrowseState;
  error:      ErrorState;
  // list:       ListState;
  // menu:       MenuState;
  news:       NewsState;
  // rating:     RatingState;
  // recipe:     RecipeState;
  // recipeForm: RecipeFormState;
}

const reducer = combineReducers({
  account,
  // browse,
  error,
  // list,
  // menu,
  news,
  // rating,
  // recipe,
  // recipeForm,
});

export default reducer;
