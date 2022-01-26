import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import * as AuthActions from '../store/actions';
import LoginForm from '../components/LoginForm';
import { CombinedStore } from '../../app/Store';
import PageWrapper from '../../common/components/PageWrapper';
import { Modal } from 'react-bootstrap';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const accountState = useSelector((state: CombinedStore) => state.account);

  const handleLogin = (username: string, password: string) => {
    dispatch(AuthActions.getToken(username, password));
  };

  return (
    <PageWrapper title={intl.messages['nav.login.title'] as string}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>OpenEats</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <LoginForm
              accountState={accountState}
              onLogin={handleLogin} />
        </Modal.Body>
      </Modal.Dialog>
    </PageWrapper>
  );
};

export default Login;
