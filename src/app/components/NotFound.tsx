import { defineMessages, useIntl } from 'react-intl';
import P from '../../common/components/P';
import PageWrapper from '../../common/components/PageWrapper';
import { getResourcePath } from '../../common/utility';

import '../css/404.css';

const NotFound = () => {
  const { formatMessage } = useIntl();

  const messages = defineMessages({
    not_found: {
      id: '404.title',
      description: '404 site title',
      defaultMessage: 'Not Found',
    },
    header: {
      id: '404.header',
      description: '404 Header',
      defaultMessage: 'Site not found',
    },
    message: {
      id: '404.message',
      description: '404 Message',
      defaultMessage: 'The page you\'re looking for does not exist.',
    },
  });

  return (
    <PageWrapper title={formatMessage(messages.not_found)}>
      <h3>{formatMessage(messages.header)}</h3>
      <img className='img-responsive' src={getResourcePath('/images/404.png')} alt='404' />
      <P>{formatMessage(messages.message)}</P>
    </PageWrapper>
  );
};

export default NotFound;
