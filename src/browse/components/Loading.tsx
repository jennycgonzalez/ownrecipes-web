import { Col, Row } from 'react-bootstrap';
import Spinner from 'react-spinkit';

const Loading: React.FC = () => (
  <Row>
    <Col xs={12}>
      <Row id='browse'>
        <div className='spinner'>
          <Spinner className='spinner-obj' name='circle' fadeIn='none' />
        </div>
      </Row>
    </Col>
  </Row>
);

export default Loading;
