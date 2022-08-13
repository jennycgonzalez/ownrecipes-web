import Directions from '../components/Directions';
import createComponentWithIntlAndRouter from '../../test/createComponentWithIntlAndRouter';

import data from './data';

test('Direction component test', () => {
  const component = createComponentWithIntlAndRouter(
    <Directions data={data.directions} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
