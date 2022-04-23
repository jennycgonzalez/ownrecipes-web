import renderer from 'react-test-renderer';

import Toast from '../components/Toast';

test('Toast', () => {
  const component = renderer.create(
    <Toast
        show
        >
      Some string test
    </Toast>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
