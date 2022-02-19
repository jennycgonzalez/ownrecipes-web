import { defineMessages, useIntl } from 'react-intl';

import { Recipe } from '../store/RecipeTypes';

// import IngredientButtons from './IngredientButtons';
import GenericReducerType, { PendingState } from '../../common/store/GenericReducerType';
import Input from '../../common/components/Input';
import { useState } from 'react';
import { updateFormData } from '../../common/utility';
import { Button } from 'react-bootstrap';
import Icon from '../../common/components/Icon';

export interface IIngredientsHeaderProps {
  recipe: Recipe;
  recipeState: GenericReducerType;

  // lists: Array<any>;

  // bulkAdd: (listId: number) => void;
  // checkAllIngredients: () => void;
  // uncheckAllIngredients: () => void;

  // checkIngredient: (id: number, checked: boolean) => void;
  // checkSubRecipe:  (id: number, checked: boolean) => void;

  updateServings: (servings: number) => void;
}

export interface IFormDataProps {
  servings: string;
}

const IngredientsHeader: React.FC<IIngredientsHeaderProps> = ({ recipe, recipeState, updateServings }: IIngredientsHeaderProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    ingredients: {
      id: 'recipe.ingredients',
      description: 'Ingredients',
      defaultMessage: 'Ingredients',
    },
    ingredients_for_servings: {
      id: 'recipe.ingredients_for_servings',
      description: 'Ingredients for[ n servings]',
      defaultMessage: 'Ingredients for',
    },
    servings: {
      id: 'recipe.servings',
      description: 'Servings',
      defaultMessage: 'Servings',
    },
    servings_input_tooltip: {
      id: 'recipe.servings_input_tooltip',
      description: 'Accessible tooltip for the (change) servings input',
      defaultMessage: 'Amount of servings',
    },
  });

  const [formData, setFormData] = useState<IFormDataProps>({ servings: recipe.customServings.toString() });
  const handleChange = (name: string, value: unknown) => {
    setFormData(prev => updateFormData(prev, name, value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateServings(parseInt(formData.servings));
  };

  const pending = recipeState.pending;
  const servings = recipe.customServings;
  const hasNoIngredients = pending === PendingState.COMPLETED && recipe.subrecipes.length === 0 && recipe.ingredientGroups.length === 0;

  return (
    <>
      {(hasNoIngredients || servings === 0) && <h2>{formatMessage(messages.ingredients)}</h2>}
      {!hasNoIngredients && servings > 0 && (
        <div className='ingredients-for-servings-row'>
          <h2>
            {formatMessage(messages.ingredients_for_servings)}
            <span className='print-only'>{`: ${recipe.customServings} ${formatMessage(messages.servings)}`}</span>
          </h2>
          <div className='custom-servings print-hidden'>
            <form onSubmit={handleSubmit} className='custom-servings'>
              <Input
                  name = 'servings'
                  type = 'number'
                  value = {formData.servings}
                  aria-label = {formatMessage(messages.servings_input_tooltip)}
                  min = {0}
                  max = {1000}
                  autoComplete = 'off'
                  change = {handleChange} />
              <Button type='submit' variant='primary'>
                <Icon icon='arrow-repeat' variant='light' />
                {formatMessage(messages.servings)}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default IngredientsHeader;
