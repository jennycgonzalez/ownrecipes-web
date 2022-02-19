import ReduxHelper, { ACTION } from '../../common/store/ReduxHelper';
import { Rating, RatingAction, RatingsAction, RatingsState, RATINGS_STORE, RATING_STORE } from './types';

const defaultState = ReduxHelper.getMapReducerDefaultState<Rating[]>(RATINGS_STORE);

function addRating(state: RatingsState, recipe: string, rating: Rating): RatingsState {
  const updState = { ...state };
  const updMap = state.items != null ? new Map(state.items) : new Map();

  let ratings = updMap.get(recipe) ?? [];
  ratings = [...ratings];
  ratings.push(rating);

  updMap.set(recipe, ratings);
  updState.items = updMap;
  return updState;
}

function deleteRating(state: RatingsState, recipe: string, ratingId: number): RatingsState {
  const updState = { ...state };
  if (state.items == null) return state;
  const updMap = new Map(state.items);

  let ratings = updMap.get(recipe);
  if (ratings == null) return state;
  ratings = ratings.filter(r => r.id !== ratingId);

  updMap.set(recipe, ratings);
  updState.items = updMap;
  return updState;
}

const reducer = (state = defaultState, action: RatingsAction): RatingsState => {
  if (RATING_STORE === action.store) {
    const ratingAction = action as RatingAction;
    switch (ratingAction.type) {
      case ACTION.CREATE_SUCCESS:
        return addRating(state, ratingAction.recipe, ratingAction.data);
      case ACTION.DELETE_SUCCESS:
        return deleteRating(state, ratingAction.recipe, ratingAction.ratingId);
      default:
        return ReduxHelper.caseMapDefaultReducer(state, action, defaultState);
    }
  }

  if (RATINGS_STORE === action.store) {
    switch (action.type) {
      case ACTION.GET_SUCCESS:
        return ReduxHelper.setMapItem(state, action.recipe, action.data);
      default:
        break;
    }
  }

  return ReduxHelper.caseDefaultReducer(state, action, defaultState);
};

export default reducer;
