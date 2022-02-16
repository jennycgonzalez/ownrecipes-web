import { Col, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

const NoResults: React.FC = () => {
  const intl = useIntl();
  const messages = defineMessages({
    no_results: {
      id: 'browse.no_results',
      description: 'No results header',
      defaultMessage: 'There are no results for your search.',
    },
  });

  return (
    <Row>
      <Col xs={12}>
        <Row id='browse'>
          <div className='spinner'>
            <h3 className='no-results'>{intl.formatMessage(messages.no_results)}</h3>
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default NoResults;
