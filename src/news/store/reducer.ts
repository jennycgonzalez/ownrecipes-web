import ReduxHelper from '../../common/store/ReduxHelper';
import { NewsAction, NewsState, NEWS_STORE } from './types';

const defaultState: NewsState = ReduxHelper.getArrayReducerDefaultState(NEWS_STORE);

const reducer = (state = defaultState, action: NewsAction): NewsState => (
  ReduxHelper.caseArrayDefaultReducer(state, action, defaultState)
);

export default reducer;
