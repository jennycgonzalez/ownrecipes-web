import { Button, Card, Col, Row } from 'react-bootstrap';
import Icon from '../../common/components/Icon';
import Ratings from '../../rating/components/Ratings';

export interface IRecipeHeaderProps {
  photo?: string;
  title:  string;
  rating: number;
  onAddToMenuClick: () => void;
}

const RecipeHeader: React.FC<IRecipeHeaderProps> = ({ photo, title, rating, onAddToMenuClick }: IRecipeHeaderProps) => {
  if (photo) {
    return (
      <Card.Header className='hero-image' style={{ backgroundImage: `url(${photo})` }}>
        <Row className='title'>
          <Col xs={12}>
            <h2>{title}</h2>
            <Ratings stars={rating} />
          </Col>
        </Row>
        <Row className='options print-hidden'>
          <Col xs={12}>
            <Button variant='primary' onClick={onAddToMenuClick}>
              <Icon icon='calendar' />
            </Button>
            <Button variant='primary' onClick={window.print}>
              <Icon icon='printer' aria-hidden='true' aria-describedby='Print' />
            </Button>
          </Col>
        </Row>
      </Card.Header>
    );
  }

  return (
    <Card.Header>
      <Row>
        <Col xs={12}>
          <h2>{title}</h2>
          <Ratings stars={rating} />
        </Col>
      </Row>
    </Card.Header>
  );
};

export default RecipeHeader;
