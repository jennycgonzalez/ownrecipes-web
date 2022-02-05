import P from '../components/P';
import renderer from 'react-test-renderer';

test('P string', () => {
  const component = renderer.create(
    <P>Some string test</P>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('P jsx', () => {
  const component = renderer.create(
    <P>
      <div className='foo jsx'>
        <span>Some string test</span>
      </div>
    </P>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('P variant body1', () => {
  const component = renderer.create(
    <P variant='body1'>Some string test</P>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('P variant body2', () => {
  const component = renderer.create(
    <P variant='body2'>Some string test</P>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
