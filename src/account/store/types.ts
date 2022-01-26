import { Dispatch as ReduxDispatch } from 'redux';
import ItemReducerType from '../../common/store/ItemReducerType';
import { GenericErrorAction } from '../../common/store/ReduxHelper';

export type UserAccount = {
  id: number;
  token: string;
}

export enum AccountActionTypes {
  LOGIN  = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export const ACCOUNT_STORE = '@@account';
export const ACCOUNT_TOKEN_STORAGE_KEY = 'openeats-token';

export interface IAccountLoginAction {
  store: typeof ACCOUNT_STORE;
  type: typeof AccountActionTypes.LOGIN;
  user: UserAccount;
}

export interface IAccountLogoutAction {
  store: typeof ACCOUNT_STORE;
  type: typeof AccountActionTypes.LOGOUT;
}

// TODO Wrap generic item
export type AccountState    = ItemReducerType<UserAccount>;
export type AccountAction   = IAccountLoginAction | IAccountLogoutAction | GenericErrorAction;
export type AccountDispatch = ReduxDispatch<AccountAction>;
