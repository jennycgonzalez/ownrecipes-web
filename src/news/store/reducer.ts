import ReduxHelper from '../../common/store/ReduxHelper';
import { NewsAction, NewsActionTypes, NewsState, NEWS_STORE } from './types';

const defaultState: NewsState = ReduxHelper.getArrayReducerDefaultState(NEWS_STORE);

const reducer = (state = defaultState, action: NewsAction): NewsState => {
  switch (action.type) {
    case NewsActionTypes.NEWS_LOAD:
      return { ...state, items: action.data };
    default:
      return state;
  }
};

export default reducer;
