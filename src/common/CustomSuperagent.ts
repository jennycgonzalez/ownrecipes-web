import * as defaults from 'superagent-defaults';
import superRequest, { SuperAgentStatic } from 'superagent';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import moment from 'moment';

import store from './store/store';
import history from './history';
import { serverURLs } from './config';
import { AccountAction, AccountActionTypes, ACCOUNT_STORE } from '../account/store/types';

const refreshToken = (() => {
  let blocking = false;

  const refresh = (token: string) => {
    superRequest
      .post(serverURLs.refresh_token)
      .set('Accept', 'application/json')
      .send({ token: token })
      .then(res => {
        blocking = false;
        store.dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGIN, user: res.body } as AccountAction);
      })
      .catch(() => {
        blocking = false;
        store.dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGOUT } as AccountAction);
        history.push('/login');
      });
  };

  return {
    instance: (token: string) => {
      if (!blocking) {
        blocking = true;
        refresh(token);
      }
    },
  };
})();

// Create a defaults context
export const request = (): SuperAgentStatic => {
  const customRequest = defaults();

  // Add the user token if the user is logged in
  const accountState = store.getState().account;
  const account = accountState.item;
  if (account && account.id) {
    const decodedToken: JwtPayload | undefined = account.token ? jwtDecode<JwtPayload>(account.token) : undefined;

    // Check if the user's token is outdated.
    // The token expired after 14 days.
    // See: https://github.com/open-eats/openeats-api/blob/master/base/settings.py#L174
    if (decodedToken == null || decodedToken.exp == null) {
      // If the token is undefined.
      // Log the user out and direct them to the login page.
      store.dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGOUT });
      history.push('/login');
    } else if (moment(new Date()).add(10, 'days') > moment.unix(decodedToken.exp)) {
      // If it is then call for a refreshed token.
      // If the token is to old, the request will fail and
      // the user will be logged-out and redirect to the login screen.
      refreshToken.instance(account.token);
    }
    customRequest.set('Authorization', `JWT ${account.token}`);
  }

  // Make sure every request we get is json
  customRequest.set('Accept', 'application/json');

  return customRequest;
};

export default request;
