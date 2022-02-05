import { defineMessages, useIntl } from 'react-intl';
import Alert from '../../common/components/Alert';
import GenericReducerType from '../../common/store/GenericReducerType';

export interface ILoginAlert {
  reducerState: GenericReducerType;
}

const LoginAlert: React.FC<ILoginAlert> = (props: ILoginAlert) => {
  const { formatMessage } = useIntl();

  const messages = defineMessages({
    errorTitle: {
      id: 'login.alert.error_title',
      description: 'Fail to login header',
      defaultMessage: 'Login failed',
    },
    errorMessage: {
      id: 'login.alert.incorrect_credentials',
      description: 'Fail to login message',
      defaultMessage: 'Incorrect username or password.',
    },
    noConnectionTitle: {
      id: 'alert.no_connection_title',
      description: 'No connection to backend title',
      defaultMessage: 'No connection',
    },
    noConnectionMessage: {
      id: 'alert.no_connection_message',
      description: 'No connection to backend message',
      defaultMessage: 'The service is currently unavailable. Please try again later.',
    },
  });

  const { reducerState } = props;
  const { error, hasConnection } = reducerState;

  return (
    <>
      {error && (
        <Alert severity='danger' title={formatMessage(messages.errorTitle)}>
          {formatMessage(messages.errorMessage)}
        </Alert>
      )}
      {!hasConnection && (
        <Alert severity='danger' title={formatMessage(messages.noConnectionTitle)}>
          {formatMessage(messages.noConnectionMessage)}
        </Alert>
      )}
    </>
  );
};

export default LoginAlert;
