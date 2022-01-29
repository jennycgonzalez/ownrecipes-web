import SubRecipes from '../components/SubRecipes';
import createComponentWithIntlAndRouter from '../../test/createComponentWithIntlAndRouter';

import data from './data';

test('Test Sub Recipes', () => {
  const checkSubRecipe = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <SubRecipes subRecipes={data.subrecipes} checkSubRecipe={checkSubRecipe} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
