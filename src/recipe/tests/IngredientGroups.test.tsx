import IngredientGroups from '../components/IngredientGroups';
import createComponentWithIntlAndRouter from '../../test/createComponentWithIntlAndRouter';

import data from './data';
import { PendingState } from '../../common/store/GenericReducerType';

test('Ingredient Group component test', () => {
  const checkIngredient = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <IngredientGroups groups={data.ingredient_groups} pending={PendingState.COMPLETED} checkIngredient={checkIngredient} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
