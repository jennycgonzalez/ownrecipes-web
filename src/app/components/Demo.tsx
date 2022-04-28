import { defineMessages, useIntl } from 'react-intl';

import '../css/demo.css';

import Alert from '../../common/components/Alert';

const Demo = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    demoAlertTitle: {
      id: 'demo.alert.title',
      description: 'DEMO NOTICE',
      defaultMessage: 'DEMO NOTICE',
    },
    demoAlertMessage: {
      id: 'demo.alert.message',
      description: 'Info text that the app is deployed as demo site.',
      defaultMessage: 'Everything is Read-Only! This is a demo version of OwnRecipes and has no API connected to it.',
    },
  });

  return (
    <div className='list-error demo-no-margin'>
      <Alert severity='info' className='demo-alert demo-no-margin' title={formatMessage(messages.demoAlertTitle)}>
        {formatMessage(messages.demoAlertMessage)}
      </Alert>
    </div>
  );
};

export default Demo;
