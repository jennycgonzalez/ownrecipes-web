import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import history from '../../common/history';
import { AccountActionTypes, ACCOUNT_STORE, AccountDispatch } from './types';
import { ACTION, GenericErrorAction } from '../../common/store/ReduxHelper';
import { getResourcePath } from '../../common/utility';

export const getToken = (username: string, pass: string) => (dispatch: AccountDispatch) => {
  const url = serverURLs.auth_token;
  request()
    .post(url)
    .send({ username: username, password: pass })
    .then(res => {
      dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGIN, user: res.body });
      history.push(getResourcePath('/home'));
    })
    .catch(err => {
      const errorAction: GenericErrorAction = { store: ACCOUNT_STORE, type: ACTION.ERROR, data: err };
      dispatch(errorAction);
      // TODO properly handle error
      // dispatch(setError(ACCOUNT_STORE, err));
    });
};

export const logUserOut = () => (dispatch: AccountDispatch) => {
  dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGOUT });
  history.push(getResourcePath('/login'));
};
