import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import * as AuthActions from '../store/actions';
import LoginForm from '../components/LoginForm';
import { CombinedStore } from '../../common/store/reducer';
import PageWrapper from '../../common/components/PageWrapper';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const accountState = useSelector((state: CombinedStore) => state.account);

  const handleLogin = (username: string, password: string) => {
    dispatch(AuthActions.getToken(username, password));
  };

  return (
    <PageWrapper title={intl.messages['nav.login.title'] as string}>
      <LoginForm
          accountState={accountState}
          onLogin={handleLogin} />
    </PageWrapper>
  );
};

export default Login;
