import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';

import '../css/browse.css';

import { CombinedStore } from '../../app/Store';
import { Recipe, RecipeList } from '../../recipe/store/RecipeTypes';
import * as RecipeActions from '../../recipe/store/RecipeActions';
import ListRecipes from '../components/ListRecipes';
import * as MiniBrowseActions from '../store/MiniBrowseActions';

interface IMiniBrowseProps {
  qs: string;
}

const MiniBrowse: React.FC<IMiniBrowseProps> = ({ qs }: IMiniBrowseProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const miniBrowseItems = useSelector((state: CombinedStore) => state.browse.miniBrowse.items);

  useEffect(() => {
    dispatch(MiniBrowseActions.loadMiniBrowse(qs));
  }, [location]);

  const handleOpenRecipe = (rec: RecipeList) => {
    const recipeSlug = params.recipe ?? '';
    if (recipeSlug !== rec.slug) {
      dispatch(RecipeActions.preload(rec as Recipe));
    }
  };

  return (
    <ListRecipes data={miniBrowseItems} onOpenRecipe={handleOpenRecipe} />
  );
};

export default MiniBrowse;
