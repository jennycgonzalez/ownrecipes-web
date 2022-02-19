import { defineMessages, useIntl } from 'react-intl';
import P from '../../common/components/P';

const NoResults: React.FC = () => {
  const intl = useIntl();
  const messages = defineMessages({
    no_results: {
      id: 'browse.no_results',
      description: 'No results header',
      defaultMessage: 'There are no results for your search.',
    },
  });

  // TODO enhance message by providing more information about how to improve the search.
  // This also seems to be a nice spot to put some additional information about how the
  // search works.

  return (
    <P className='no-results placeholder'>{intl.formatMessage(messages.no_results)}</P>
  );
};

export default NoResults;
