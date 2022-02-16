import { useSelector } from 'react-redux';

import { CombinedStore } from '../../app/Store';
import Ratings from '../../rating/containers/Ratings';
import PageWrapper from '../../common/components/PageWrapper';
import MiniBrowse from '../../browse/containers/MiniBrowse';
import RecipeContainer from './RecipeContainer';

const RecipeView: React.FC = () => {
  const recipeState  = useSelector((state: CombinedStore) => state.recipe);

  return (
    <PageWrapper title={recipeState.item?.title}>
      <RecipeContainer />
      <Ratings />
      {/* TODO Custom component */}
      <hr />
      <MiniBrowse qs='?limit=4' />
    </PageWrapper>
  );
};

export default RecipeView;
