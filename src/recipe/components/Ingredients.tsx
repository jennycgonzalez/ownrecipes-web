import { Checkbox } from '../../common/components/FormComponents';
import { Ingredient } from '../store/types';

export interface IIngredientsProps {
  data: Array<Ingredient>;
  checkIngredient: (id: number, checked: boolean) => void;
}

const Ingredients: React.FC<IIngredientsProps> = ({ data, checkIngredient }: IIngredientsProps) => {
  const ingredients = data.map(ingredient => (
    <li className='ingredient' key={String(ingredient.id)}>
      <Checkbox
          name    = {String(ingredient.id)}
          checked = {ingredient.checked ?? false}
          change  = {(name, newValue) => checkIngredient(parseInt(name), newValue)} />
      {ingredient.quantity !== 0 && <span className='quantity'>{`${ingredient.quantity} `}</span>}
      {ingredient.measurement    && <span className='measurement'>{`${ingredient.measurement} `}</span>}
      {ingredient.title          && <span className='title'>{ingredient.title}</span>}
    </li>
  ));

  return (
    <ul className='ingredients'>
      {ingredients}
    </ul>
  );
};

export default Ingredients;
