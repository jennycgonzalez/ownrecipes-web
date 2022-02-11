import RecipeContainer from './RecipeContainer';
import Ratings from '../../rating/containers/Ratings';
import { Col, Row } from 'react-bootstrap';
import PageWrapper from '../../common/components/PageWrapper';
import { useSelector } from 'react-redux';
import { CombinedStore } from '../../app/Store';
// import MiniBrowse from '../../browse/containers/MiniBrowse';

const RecipeView: React.FC = () => {
  const recipeState  = useSelector((state: CombinedStore) => state.recipe);

  return (
    <PageWrapper title={recipeState.item?.title}>
      <Row>
        <Col md={9}>
          <RecipeContainer />
          <Ratings />
        </Col>
        <Col md={3}>
          {/* <MiniBrowse format='col-md-12 col-sm-6 col-xs-12' qs='?limit=4' /> */}
        </Col>
      </Row>
    </PageWrapper>
  );
};

export default RecipeView;
