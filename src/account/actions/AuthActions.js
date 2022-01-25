import { request } from '../../common/CustomSuperagent';
import AuthConstants from '../constants/AuthConstants';
import { serverURLs } from '../../common/config';
import history from '../../common/history';

export const getToken = (username, pass) => dispatch => {
  const url = serverURLs.auth_token;
  request()
    .post(url)
    .send({ username: username, password: pass })
    .then(res => {
      dispatch({ type: AuthConstants.LOGIN_USER, user: res.body });
      history.push('/');
    })
    .catch(() => {
      dispatch({ type: AuthConstants.LOGIN_ERROR, error: true });
    });
};

export const logUserOut = () => dispatch => {
  dispatch({ type: AuthConstants.LOGOUT_USER });
  history.push('/');
};
