import { defineMessages, useIntl } from 'react-intl';
import Alert from '../../common/components/Alert';

const LoginAlert: React.FC = () => {
  const intl = useIntl();

  const messages = defineMessages({
    title: {
      id: 'login.alert.unable_to_login',
      description: 'Fail to login header',
      defaultMessage: 'Unable to login!',
    },
    message: {
      id: 'login.alert.confirm',
      description: 'Fail to login message',
      defaultMessage: 'Please confirm that the username and password are correct.',
    },
  });

  return (
    <Alert severity='danger' title={intl.formatMessage(messages.title)}>
      {intl.formatMessage(messages.message)}
    </Alert>
  );
};

export default LoginAlert;
