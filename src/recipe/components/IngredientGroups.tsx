import { IngredientGroup } from '../store/types';

import Ingredients from './Ingredients';

export interface IIngredientGroupsProps {
  groups: Array<IngredientGroup>;
  checkIngredient: (id: number, checked: boolean) => void;
}

const IngredientGroups: React.FC<IIngredientGroupsProps> = ({ groups, checkIngredient }: IIngredientGroupsProps) => {
  const ingredientGroups = groups.map((group, i) => (
    <div className='ingredient-group' key={`${group.title}-${i}`}>
      {group.title && <b>{group.title}</b>}
      <Ingredients data={group.ingredients} checkIngredient={checkIngredient} />
    </div>
  ));

  return (
    <div className='ingredient-groups'>
      {ingredientGroups}
    </div>
  );
};

export default IngredientGroups;
