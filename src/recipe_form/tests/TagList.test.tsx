import renderer from 'react-test-renderer';

import TagList from '../components/TagList';

test('TagList component test', () => {
  const component = renderer.create(
    <TagList name='tag-list' label='TagList' value={[]} onChange={() => { /* nothing */ }} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
