import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Dispatch as ReduxDispatch } from 'redux';
import ItemReducerType from '../../common/store/ItemReducerType';
import { GenericItemReducerAction } from '../../common/store/ReduxHelper';

export type LoginDto = {
  id:    number;
  token: string;
}

export type UserAccount = {
  id:       number;
  token:    string;
  username: string;
  email:    string;
}

export type OwnrecipesPayload = {
  username: string;
  email:    string;
  user_id:  number;
} & JwtPayload;

export const toUserAccount = (loginDto: LoginDto): UserAccount => {
  const { token } = loginDto;
  if (token == null) throw new Error('Invalid response: token may not be null');
  const decodedToken: OwnrecipesPayload | undefined = jwtDecode<OwnrecipesPayload>(token);

  if (decodedToken.username == null) throw new Error('Invalid response: The token is incomplete (username is missing)');
  if (decodedToken.email == null)    throw new Error('Invalid response: The token is incomplete (email is missing)');

  return {
    id:       loginDto.id,
    token:    token,
    username: decodedToken.username,
    email:    decodedToken.email,
  };
};

export enum AccountActionTypes {
  LOGIN  = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export const ACCOUNT_STORE = '@@account';
export const ACCOUNT_TOKEN_STORAGE_KEY = 'ownrecipes-token';

export interface IAccountLoginAction {
  store: typeof ACCOUNT_STORE;
  type:  typeof AccountActionTypes.LOGIN;
  user:  UserAccount;
}

export interface IAccountLogoutAction {
  store: typeof ACCOUNT_STORE;
  type:  typeof AccountActionTypes.LOGOUT;
}

export type AccountState    = ItemReducerType<UserAccount>;
export type AccountAction   = IAccountLoginAction | IAccountLogoutAction | GenericItemReducerAction;
export type AccountDispatch = ReduxDispatch<AccountAction>;
