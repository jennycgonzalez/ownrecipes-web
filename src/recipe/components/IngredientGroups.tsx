import { IngredientGroup } from '../store/RecipeTypes';

import Ingredients from './Ingredients';

export interface IIngredientGroupsProps {
  groups: Array<IngredientGroup> | undefined;
  // checkIngredient: (id: number, checked: boolean) => void;
}

const IngredientGroups: React.FC<IIngredientGroupsProps> = ({ groups /* , checkIngredient */ }: IIngredientGroupsProps) => {
  const ingredientGroups = groups?.map(group => (
    <div className='ingredient-group' key={group.title}>
      {groups.length > 1 && group.title && <h3 className='subheading'>{group.title}</h3>}
      <Ingredients
          data={group.ingredients}
          // checkIngredient={checkIngredient}
          />
    </div>
  ));

  return (
    <>{ingredientGroups}</>
  );
};

export default IngredientGroups;
