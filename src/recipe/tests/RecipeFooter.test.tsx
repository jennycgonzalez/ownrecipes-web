import RecipeFooter from '../components/RecipeFooter';
import createComponentWithIntlAndRouter from '../../test/createComponentWithIntlAndRouter';

test('Test Footer without Edit Link', () => {
  const deleteRecipe = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <RecipeFooter
        slug='123'
        source='google.com'
        username='Ryan Noelk'
        updateDate='2017-01-01'
        showEditLink={false}
        deleteRecipe={deleteRecipe}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test Footer with Edit Link', () => {
  const deleteRecipe = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <RecipeFooter
        slug='123'
        source='google.com'
        username='Ryan Noelk'
        updateDate='2017-01-01'
        showEditLink
        deleteRecipe={deleteRecipe}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
