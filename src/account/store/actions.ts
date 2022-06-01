import jwtDecode, { JwtPayload } from 'jwt-decode';
import moment from 'moment';

import { handleError, refreshToken, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { AccountActionTypes, ACCOUNT_STORE, AccountDispatch, ACCOUNT_TOKEN_STORAGE_KEY, UserAccount, LoginDto, toUserAccount } from './types';
import { ACTION } from '../../common/store/ReduxHelper';
import LocalStorageHelper from '../../common/LocalStorageHelper';

export const getToken = (username: string, pass: string) => (dispatch: AccountDispatch) => {
  dispatch({ store: ACCOUNT_STORE, type: ACTION.GET_START });

  const url = serverURLs.auth_token;
  request()
    .post(url)
    .send({ username: username, password: pass })
    .then(res => {
      const data: LoginDto = res.body;
      dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGIN, user: toUserAccount(data) });
    })
    .catch(err => dispatch(handleError(err, ACCOUNT_STORE)));
};

export const tryAutoLogin = () => (dispatch: AccountDispatch) => {
  dispatch({ store: ACCOUNT_STORE, type: ACTION.GET_START });

  const storageItem = LocalStorageHelper.getItem(ACCOUNT_TOKEN_STORAGE_KEY);
  if (storageItem == null) {
    dispatch({ store: ACCOUNT_STORE, type: ACTION.SOFT_RESET });
    return;
  }
  const user: UserAccount = JSON.parse(storageItem);
  const decodedToken: JwtPayload | undefined = user.token ? jwtDecode<JwtPayload>(user.token) : undefined;

  if (user.token != null && decodedToken != null) {
    if (decodedToken.exp != null && (moment(new Date()).add(2, 'days') > moment.unix(decodedToken.exp))) {
      refreshToken.instance(user.token);
    } else {
      dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGIN, user: user });
    }
  } else {
    dispatch({ store: ACCOUNT_STORE, type: ACTION.SOFT_RESET });
  }
};

export const logUserOut = () => (dispatch: AccountDispatch) => {
  dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGOUT });
};
