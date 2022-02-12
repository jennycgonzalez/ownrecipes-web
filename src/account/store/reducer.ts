import ReduxHelper from '../../common/store/ReduxHelper';
import { AccountAction, AccountActionTypes, AccountState, ACCOUNT_STORE, ACCOUNT_TOKEN_STORAGE_KEY } from './types';

const defaultState: AccountState = ReduxHelper.getItemReducerDefaultState(ACCOUNT_STORE);

const reducer = (state = defaultState, action: AccountAction): AccountState => {
  if (state.ident !== action.store) return ReduxHelper.caseDefaultReducer(state, action,defaultState);

  switch (action.type) {
    case AccountActionTypes.LOGIN:
      {
        const user = action.user;
        localStorage.setItem(ACCOUNT_TOKEN_STORAGE_KEY, JSON.stringify(user));
        return ReduxHelper.setItem(state, action.user);
      }
    case AccountActionTypes.LOGOUT:
      localStorage.removeItem(ACCOUNT_TOKEN_STORAGE_KEY);
      return defaultState;
    default:
      return ReduxHelper.caseDefaultReducer(state, action, defaultState);
  }
};

export default reducer;
