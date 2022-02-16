import IngredientGroups from '../components/IngredientGroups';
import createComponentWithIntlAndRouter from '../../test/createComponentWithIntlAndRouter';

import data from './data';
import { IngredientGroup } from '../store/RecipeTypes';

test('Ingredient Group component test', () => {
  // const checkIngredient = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <IngredientGroups groups={data.ingredient_groups as unknown as Array<IngredientGroup>} /* checkIngredient={checkIngredient} */ />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
