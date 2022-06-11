import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'react-bootstrap';

import '../css/browse.css';

import { CombinedStore } from '../../app/Store';
import { Recipe, RecipeList } from '../../recipe/store/RecipeTypes';
import * as RecipeActions from '../../recipe/store/RecipeActions';
import ListRecipes from '../components/ListRecipes';
import * as MiniBrowseActions from '../store/MiniBrowseActions';
import useDispatch from '../../common/hooks/useDispatch';
import Icon from '../../common/components/Icon';
import Tooltip from '../../common/components/Tooltip';

interface IMiniBrowseProps {
  heading: string;
  count: number;
}

const MiniBrowse: React.FC<IMiniBrowseProps> = ({ heading, count }: IMiniBrowseProps) => {
  const { formatMessage }  = useIntl();
  const messages = defineMessages({
    shuffleSuggestionsButton: {
      id: 'browse.shuffle_suggestions_button_title',
      description: 'Title/tooltip of the icon button to shuffle the suggestions.',
      defaultMessage: 'Shuffle suggestions',
    },
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const miniBrowseItems = useSelector((state: CombinedStore) => state.browse.miniBrowse.items);

  useEffect(() => {
    dispatch(MiniBrowseActions.loadMiniBrowse(`?limit=${String(count)}`));
  }, [location]);

  const handleShuffleClick = () => {
    dispatch(MiniBrowseActions.loadMiniBrowse(`?limit=${String(count)}`));
  };

  const handleOpenRecipe = (rec: RecipeList) => {
    const recipeSlug = params.recipe ?? '';
    if (recipeSlug !== rec.slug) {
      dispatch(RecipeActions.preload(rec as Recipe));
    }
  };

  return (
    <>
      <h2 id='suggestions-heading'>{heading}</h2>
      <Tooltip id='shuffle tooltip' tooltip={formatMessage(messages.shuffleSuggestionsButton)}>
        <Button id='shuffle-suggestions-button' variant='outline-primary' aria-label={formatMessage(messages.shuffleSuggestionsButton)} onClick={handleShuffleClick}>
          <Icon icon='arrow-repeat' variant='light' />
        </Button>
      </Tooltip>
      <ListRecipes data={miniBrowseItems} onOpenRecipe={handleOpenRecipe} />
    </>
  );
};

export default MiniBrowse;
