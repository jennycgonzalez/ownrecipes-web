import { Link } from 'react-router-dom';

// import { Checkbox } from '../../common/components/FormComponents';
import { getResourcePath } from '../../common/utility';
import { SubRecipe } from '../store/types';

export interface ISubRecipesProps {
  subRecipes: Array<SubRecipe>;

  // checkSubRecipe: (id: number, checked: boolean) => void;
}

const SubRecipes: React.FC<ISubRecipesProps> = ({ subRecipes /* , checkSubRecipe */ }: ISubRecipesProps) => {
  const subRecipesList = subRecipes.map(subRecipe => (
    <li className='ingredient' key={subRecipe.child_recipe_id}>
      {/*
      <Checkbox
          name={String(subRecipe.child_recipe_id)}
          checked={subRecipe.checked ?? false}
          change={(_id, checked) => checkSubRecipe(subRecipe.child_recipe_id, checked)} /> */}
      {subRecipe.quantity != null && subRecipe.quantity.length > 0 && (
        <span className='quantity'>
          {subRecipe.quantity}
          {' '}
        </span>
      )}
      {subRecipe.measurement && (
        <span className='measurement'>
          {subRecipe.measurement}
          {' '}
        </span>
      )}
      {subRecipe.title && (
        <Link to={getResourcePath(`/recipe/${subRecipe.slug}`)} className='title'>{ subRecipe.title }</Link>
      )}
    </li>
  ));

  if (subRecipesList.length === 0) return null;

  return (
    <ul className='ingredients'>
      {subRecipesList}
    </ul>
  );
};

export default SubRecipes;
