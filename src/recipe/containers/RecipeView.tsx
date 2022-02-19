import { useSelector } from 'react-redux';

import { CombinedStore } from '../../app/Store';
import Ratings from '../../rating/containers/Ratings';
import PageWrapper from '../../common/components/PageWrapper';
import RecipeContainer from './RecipeContainer';
import RecipeFooter from '../components/RecipeFooter';

const RecipeView: React.FC = () => {
  const recipeState  = useSelector((state: CombinedStore) => state.recipe);

  return (
    <PageWrapper title={recipeState.item?.title}>
      <RecipeContainer />
      <Ratings />
      <RecipeFooter />
    </PageWrapper>
  );
};

export default RecipeView;
