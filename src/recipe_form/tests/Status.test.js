import Status from '../components/Status';
import renderer from 'react-test-renderer';

test('Status component test', () => {
  const component = renderer.create(
    <Status status={{ message: [] }} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
