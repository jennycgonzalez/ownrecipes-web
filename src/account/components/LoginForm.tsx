import { defineMessages, useIntl } from 'react-intl';
import * as _ from 'lodash';

import Alert from './Alert';

import '../css/login.css';
import { AccountState } from '../store/types';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export interface ILoginFormProps {
  accountState: AccountState;

  onLogin: (username: string, password: string) => void;
}

interface ILoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC<ILoginFormProps> = (props: ILoginFormProps) => {
  const intl = useIntl();

  const [formData, setFormData] = useState<ILoginFormData>({ username: '', password: '' });

  const handleChange = (attr: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => {
      const newState = _.cloneDeep(prev);
      _.set(newState, attr, event.target.value);
      return newState;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onLogin(formData.username, formData.password);
  };

  const { formatMessage } = intl;
  const messages = defineMessages({
    please_sign_in: {
      id: 'login.please_sign_in',
      description: 'Please sign in header',
      defaultMessage: 'Sign In',
    },
    username: {
      id: 'login.username',
      description: 'Username placeholder',
      defaultMessage: 'Username',
    },
    password: {
      id: 'login.password',
      description: 'Password placeholder',
      defaultMessage: 'Password',
    },
    sign_in: {
      id: 'login.sign_in',
      description: 'Sign in button',
      defaultMessage: 'Sign in',
    },
  });

  return (
    <form className='form-signin' onSubmit={handleSubmit}>
      {props.accountState.error && <Alert />}
      <h2 className='form-signin-heading'>{formatMessage(messages.please_sign_in)}</h2>
      <input
          type='text'
          id='username'
          className='form-control'
          placeholder={formatMessage(messages.username)}
          onChange={event => handleChange('username', event)}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus />
      <input
          type='password'
          id='password'
          className='form-control'
          placeholder={formatMessage(messages.password)}
          onChange={event => handleChange('password', event)} />
      <Button variant='primary' type='submit' className='btn-block'>
        { formatMessage(messages.sign_in) }
      </Button>
    </form>
  );
};

export default LoginForm;
