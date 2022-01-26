import { defineMessages, useIntl } from 'react-intl';
import { getResourcePath } from '../../common/utility';

import '../css/404.css';

const NotFound = () => {
  const intl = useIntl();

  const messages = defineMessages({
    header: {
      id: '404.header',
      description: '404 Header',
      defaultMessage: 'Our chef\'s ruined this recipe in the test kitchen, we suggest you try something else',
    },
    message: {
      id: '404.message',
      description: '404 Message',
      defaultMessage: 'Sorry the page came back with a 404 error we can\'t find what you are looking for',
    },
  });

  return (
    <div className='not-found'>
      <h3>{ intl.formatMessage(messages.header) }</h3>
      <img className='img-responsive' src={getResourcePath('/images/404.png')} alt='404' />
      <p>{ intl.formatMessage(messages.message) }</p>
    </div>
  );
};

export default NotFound;
