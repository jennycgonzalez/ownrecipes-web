import Icon from '../components/Icon';
import renderer from 'react-test-renderer';

test('Icon component test', () => {
  const component = renderer.create(
    <Icon icon='user' />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon component variant=light test', () => {
  const component = renderer.create(
    <Icon icon='calendar' variant='light' />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon component variant=dark test', () => {
  const component = renderer.create(
    <Icon icon='calendar' variant='filled' />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon component size=2x test', () => {
  const component = renderer.create(
    <Icon icon='calendar' size='2x' />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon component complex test', () => {
  const component = renderer.create(
    <Icon icon='pen' variant='light' size='2x' className='my-class' />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
