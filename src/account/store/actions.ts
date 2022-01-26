import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import history from '../../common/history';
import { AccountActionTypes, ACCOUNT_STORE, AccountDispatch } from './types';
import { ACTION, GenericErrorAction } from '../../common/store/ReduxHelper';

export const getToken = (username: string, pass: string) => (dispatch: AccountDispatch) => {
  const url = serverURLs.auth_token;
  request()
    .post(url)
    .send({ username: username, password: pass })
    .then(res => {
      dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGIN, user: res.body });
      history.push('/');
    })
    .catch(err => {
      const errorAction: GenericErrorAction = { store: ACCOUNT_STORE, type: ACTION.ERROR, data: err };
      dispatch(errorAction);
    });
};

export const logUserOut = () => (dispatch: AccountDispatch) => {
  dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGOUT });
  history.push('/');
};
