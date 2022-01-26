import ReduxHelper from '../../common/store/ReduxHelper';
import { AccountAction, AccountActionTypes, AccountState, ACCOUNT_STORE } from './types';

const defaultState: AccountState = ReduxHelper.getItemReducerDefaultState(ACCOUNT_STORE);

const reducer = (state = defaultState, action: AccountAction): AccountState => {
  switch (action.type) {
    case AccountActionTypes.LOGIN:
      {
        const user = JSON.stringify(action.user);
        localStorage.setItem('user', user);
        return ReduxHelper.setItem(state, action.user);
      }
    case AccountActionTypes.LOGOUT:
      localStorage.removeItem('user');
      return defaultState;
    default:
      return ReduxHelper.caseDefaultReducer(state, action, defaultState);
  }
};

export default reducer;
