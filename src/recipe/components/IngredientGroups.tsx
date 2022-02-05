import { defineMessages, useIntl } from 'react-intl';
import Spinner from 'react-spinkit';
import P from '../../common/components/P';
import { PendingState } from '../../common/store/GenericReducerType';
import { IngredientGroup } from '../store/types';

import Ingredients from './Ingredients';

export interface IIngredientGroupsProps {
  groups: Array<IngredientGroup>;
  pending: keyof typeof PendingState;
  checkIngredient: (id: number, checked: boolean) => void;
}

const IngredientGroups: React.FC<IIngredientGroupsProps> = ({ groups, pending, checkIngredient }: IIngredientGroupsProps) => {
  const { formatMessage } = useIntl();

  const messages = defineMessages({
    no_ingredients: {
      id: 'recipe.recipe_ingredient_button.no_ingredients',
      description: 'No ingredients provided message',
      defaultMessage: '(This recipe has no ingredients.)',
    },
  });

  const ingredientGroups = groups.map(group => (
    <div className='ingredient-group' key={group.title}>
      {group.title && <b>{group.title}</b>}
      <Ingredients data={group.ingredients} checkIngredient={checkIngredient} />
    </div>
  ));

  return (
    <div className='ingredient-groups'>
      {pending === PendingState.LOADING && <Spinner name='circle' className='recipe-list-spinner' fadeIn='none' />}
      {pending === PendingState.COMPLETED && ingredientGroups.length === 0 && (
        <P className='placeholder'>{formatMessage(messages.no_ingredients)}</P>
      )}
      {ingredientGroups}
    </div>
  );
};

export default IngredientGroups;
