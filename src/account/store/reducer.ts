import LocalStorageHelper from '../../common/LocalStorageHelper';
import ReduxHelper from '../../common/store/ReduxHelper';
import { AccountAction, AccountActionTypes, AccountState, ACCOUNT_STORE, ACCOUNT_TOKEN_STORAGE_KEY } from './types';

const defaultState: AccountState = ReduxHelper.getItemReducerDefaultState(ACCOUNT_STORE);

const reducer = (state = defaultState, action: AccountAction): AccountState => {
  if (state.ident === action.store) {
    switch (action.type) {
      case AccountActionTypes.LOGIN:
        {
          const user = action.user;
          LocalStorageHelper.setItem(ACCOUNT_TOKEN_STORAGE_KEY, JSON.stringify(user));
          return ReduxHelper.setItem(state, user);
        }
      case AccountActionTypes.LOGOUT:
        {
          LocalStorageHelper.removeItem(ACCOUNT_TOKEN_STORAGE_KEY);
          return defaultState;
        }
      default:
        break;
    }
  }

  return ReduxHelper.caseItemDefaultReducer(state, action, defaultState);
};

export default reducer;
