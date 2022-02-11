import Directions from './Directions';
import RecipeHeader from './RecipeHeader';

import '../css/recipe.css';
import { Recipe } from '../store/types';
import GenericReducerType from '../../common/store/GenericReducerType';
import IngredientsPanel from './IngredientsPanel';

interface IRecipeSchemeProps {
  recipe: Recipe;
  recipeState: GenericReducerType;
  showEditLink: boolean;

  deleteRecipe: () => void;

  // lists: Array<any>;

  // onAddToMenuClick: () => void;
  // bulkAdd: (listId: number) => void;
  // checkAllIngredients: () => void;
  // uncheckAllIngredients: () => void;

  // checkIngredient: (id: number, checked: boolean) => void;
  // checkSubRecipe:  (id: number, checked: boolean) => void;

  updateServings: (servings: number) => void;
}

const RecipeScheme: React.FC<IRecipeSchemeProps> = ({ recipe, recipeState, showEditLink, deleteRecipe, updateServings }: IRecipeSchemeProps) => (
  <div className='recipe-details'>
    <RecipeHeader
        recipe = {recipe}
        showEditLink = {showEditLink}
        // onAddToMenuClick={props.onAddToMenuClick}
        deleteRecipe = {deleteRecipe} />

    <hr />

    <IngredientsPanel
        recipe = {recipe}
        recipeState = {recipeState}

        // lists = {lists}

        // bulkAdd = {bulkAdd}
        // checkAllIngredients = {checkAllIngredients}
        // uncheckAllIngredients = {uncheckAllIngredients}

        // checkIngredient = {checkIngredient}
        // checkSubRecipe = {checkSubRecipe}

        updateServings = {updateServings} />

    <hr />

    <Directions data={recipe.directions} />
  </div>
);

export default RecipeScheme;
