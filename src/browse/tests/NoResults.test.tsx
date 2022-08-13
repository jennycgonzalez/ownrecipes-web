import NoResults from '../components/NoResults';
import createComponentWithIntl from '../../test/createComponentWithIntl';

test('NoResults component test', () => {
  const component = createComponentWithIntl(
    <NoResults />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
