import { Dispatch as ReduxDispatch } from 'redux';
import ItemReducerType from '../../common/store/ItemReducerType';
import { GenericReducerAction } from '../../common/store/ReduxHelper';

export type UserAccount = {
  id: number;
  token: string;
}

export enum AccountActionTypes {
  LOGIN  = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export const ACCOUNT_STORE = '@@account';
export const ACCOUNT_TOKEN_STORAGE_KEY = 'ownrecipes-token';

export interface IAccountLoginAction {
  store: typeof ACCOUNT_STORE;
  type: typeof AccountActionTypes.LOGIN;
  user: UserAccount;
}

export interface IAccountLogoutAction {
  store: typeof ACCOUNT_STORE;
  type: typeof AccountActionTypes.LOGOUT;
}

export type AccountState    = ItemReducerType<UserAccount>;
export type AccountAction   = IAccountLoginAction | IAccountLogoutAction | GenericReducerAction;
export type AccountDispatch = ReduxDispatch<AccountAction>;
