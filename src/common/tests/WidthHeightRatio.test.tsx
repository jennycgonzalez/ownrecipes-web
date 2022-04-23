import renderer from 'react-test-renderer';

import WidthHeightRatio from '../components/WidthHeightRatio';

test('WidthHeightRatio', () => {
  const component = renderer.create(
    <WidthHeightRatio
        height={50}
        width={75}
        className='some class'
        >
      Some string test
    </WidthHeightRatio>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
