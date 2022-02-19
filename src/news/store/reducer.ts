import ReduxHelper, { ACTION } from '../../common/store/ReduxHelper';
import { NewsAction, NewsState, NEWS_STORE } from './types';

const defaultState: NewsState = ReduxHelper.getArrayReducerDefaultState(NEWS_STORE);

const reducer = (state = defaultState, action: NewsAction): NewsState => {
  if (state.ident === action.store) {
    switch (action.type) {
      case ACTION.GET_SUCCESS:
        return ReduxHelper.setArray(state, action.data);
      default: break;
    }
  }

  return ReduxHelper.caseArrayDefaultReducer(state, action, defaultState);
};

export default reducer;
