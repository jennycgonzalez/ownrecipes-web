import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { CombinedStore } from '../../app/Store';

import MiniBrowse from '../../browse/containers/MiniBrowse';

const RecipeFooter: React.FC = () => {
  const intl = useIntl();

  const miniBrowseState = useSelector((state: CombinedStore) => state.browse.miniBrowse);

  if (!miniBrowseState.hasConnection || miniBrowseState.error) return null;

  return (
    <>
      <hr />
      <article className='recipe-footer'>
        <MiniBrowse heading={intl.messages['nav.home.recommended_recipes_title'] as string} count={4} />
      </article>
    </>
  );
};

export default RecipeFooter;
