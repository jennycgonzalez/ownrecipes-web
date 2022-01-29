import IngredientGroups from '../components/IngredientGroups';
import renderer from 'react-test-renderer';

import data from './data';

test('Ingredient Group component test', () => {
  const checkIngredient = jest.fn();
  const component = renderer.create(
    <IngredientGroups groups={data.ingredient_groups} checkIngredient={checkIngredient} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
