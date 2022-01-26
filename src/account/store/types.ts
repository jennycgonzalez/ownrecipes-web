import { Dispatch as ReduxDispatch } from 'redux';
import ItemReducerType from '../../common/store/ItemReducerType';
import { GenericErrorAction } from '../../common/store/ReduxHelper';

type User = {
  id: number;
  token: string;
}

export enum AccountActionTypes {
  LOGIN  = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export const ACCOUNT_STORE = '@@account';

export interface IAccountLoginAction {
  store: typeof ACCOUNT_STORE;
  type: typeof AccountActionTypes.LOGIN;
  user: User;
}

export interface IAccountLogoutAction {
  store: typeof ACCOUNT_STORE;
  type: typeof AccountActionTypes.LOGOUT;
}

// TODO Wrap generic item
export type AccountState    = ItemReducerType<User>;
export type AccountAction   = IAccountLoginAction | IAccountLogoutAction | GenericErrorAction;
export type AccountDispatch = ReduxDispatch<AccountAction>;
