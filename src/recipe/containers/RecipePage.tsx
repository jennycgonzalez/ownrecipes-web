import { useSelector } from 'react-redux';

import { CombinedStore } from '../../app/Store';
import Ratings from '../../rating/containers/Ratings';
import PageWrapper from '../../common/components/PageWrapper';
import RecipeContainer from './RecipeContainer';
import RecipeFooter from '../components/RecipeFooter';
import { PendingState } from '../../common/store/GenericReducerType';
import { useMemo } from 'react';

const RecipePage: React.FC = () => {
  const recipeState  = useSelector((state: CombinedStore) => state.recipe);

  const ratings = useMemo(() => <Ratings />, [recipeState.item?.id, recipeState.pending]);
  const footer  = useMemo(() => <RecipeFooter />, [recipeState.item?.id]);

  return (
    <PageWrapper title={recipeState.item?.title}>
      <RecipeContainer />
      {recipeState.pending === PendingState.COMPLETED && ratings}
      {recipeState.pending === PendingState.COMPLETED && footer}
    </PageWrapper>
  );
};

export default RecipePage;
