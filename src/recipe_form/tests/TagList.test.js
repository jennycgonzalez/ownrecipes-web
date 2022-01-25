import TagList from '../components/TagList';
import renderer from 'react-test-renderer';

test('TagList component test', () => {
  const component = renderer.create(
    <TagList />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
