import renderer from 'react-test-renderer';

import Loading from '../components/Loading';

test('Loading component test', () => {
  const component = renderer.create(
    <Loading message='Loading ...' />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
