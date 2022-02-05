import Alert from '../components/Alert';
import renderer from 'react-test-renderer';

const TITLE = 'This is some alert';
const MSG = 'This is some message';
const MSG_JSX = (
  <span className='some-span-class'>
    <p className='some-p-class'>{MSG}</p>
  </span>
);

test('Alert component test', () => {
  const component = renderer.create(
    <Alert severity='danger' title={TITLE}>
      {MSG}
    </Alert>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Alert component jsx test', () => {
  const component = renderer.create(
    <Alert severity='danger' title={TITLE}>
      {MSG_JSX}
    </Alert>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Alert component info test', () => {
  const component = renderer.create(
    <Alert severity='info' title={TITLE}>
      {MSG}
    </Alert>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
