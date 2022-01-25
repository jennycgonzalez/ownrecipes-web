import { injectIntl, defineMessages } from 'react-intl';

import Alert from './Alert';

import '../css/login.css';

const LoginForm = props => {
  const handleSubmit = e => {
    e.preventDefault();
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    props.authActions.getToken(username, password);
  };

  const { formatMessage } = props.intl;
  const messages = defineMessages({
    please_sign_in: {
      id: 'login.please_sign_in',
      description: 'Please sign in header',
      defaultMessage: 'Please sign in',
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
      {props.user.errors ? (<Alert />) : '' }
      <h2 className='form-signin-heading'>{ formatMessage(messages.please_sign_in) }</h2>
      <input
          type='text'
          id='username'
          className='form-control'
          placeholder={formatMessage(messages.username)}
          ref='username'
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus='true' />
      <input
          type='password'
          id='password'
          className='form-control'
          placeholder={formatMessage(messages.password)}
          ref='password' />
      <button className='btn btn-lg btn-primary btn-block' type='submit'>
        { formatMessage(messages.sign_in) }
      </button>
    </form>
  );
};

export default injectIntl(LoginForm);
