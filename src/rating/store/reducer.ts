import ReduxHelper from '../../common/store/ReduxHelper';
import { Rating, RatingsAction, RatingsActionTypes, RatingsState, RATINGS_STORE } from './types';

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
  switch (action.type) {
    case RatingsActionTypes.LOAD:
      return ReduxHelper.setMapItem(state, action.recipe, action.data);
    case RatingsActionTypes.ADD:
      return addRating(state, action.recipe, action.data);
    case RatingsActionTypes.DELETE:
      return deleteRating(state, action.recipe, action.ratingId);
    default:
      return state;
  }
};

export default reducer;
