import RecipeHeader from '../components/RecipeHeader';
import createComponentWithIntl from '../../test/createComponentWithIntl';

test('Test Header', () => {
  const onAddToMenuClick = jest.fn();
  const component = createComponentWithIntl(
    <RecipeHeader
        photo='1'
        title='Tasty Chili'
        rating={3}
        onAddToMenuClick={onAddToMenuClick}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test Header w/ no Photo', () => {
  const onAddToMenuClick = jest.fn();
  const component = createComponentWithIntl(
    <RecipeHeader
        title='Tasty Chili'
        rating={3}
        onAddToMenuClick={onAddToMenuClick}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test Header w/ bad rating', () => {
  const onAddToMenuClick = jest.fn();
  const component = createComponentWithIntl(
    <RecipeHeader
        title='Tasty Chili'
        rating={-1}
        onAddToMenuClick={onAddToMenuClick}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
