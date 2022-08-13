import SubRecipes from '../components/SubRecipes';
import createComponentWithIntlAndRouter from '../../test/createComponentWithIntlAndRouter';

import data from './data';
import { SubRecipe } from '../store/RecipeTypes';

test('Test Sub Recipes', () => {
  // const checkSubRecipe = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <SubRecipes subRecipes={data.subrecipes as unknown as Array<SubRecipe>} /* checkSubRecipe={checkSubRecipe} */ />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
