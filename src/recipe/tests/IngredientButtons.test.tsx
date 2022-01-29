import IngredientButtons from '../components/IngredientButtons';
import createComponentWithIntlAndRouter from '../../test/createComponentWithIntlAndRouter';
import { PendingState } from '../../common/store/GenericReducerType';

const lists = [{ id: 1, title: 'title' },{ id: 2, title: 'tütle' }];

test('Ingredient Buttons Default', () => {
  const bulkAdd = jest.fn();
  const checkAll = jest.fn();
  const unCheckAll = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <IngredientButtons
        pending={PendingState.INITIAL}
        lists={lists}
        bulkAdd={bulkAdd}
        checkAll={checkAll}
        unCheckAll={unCheckAll}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Ingredient Buttons Loading', () => {
  const bulkAdd = jest.fn();
  const checkAll = jest.fn();
  const unCheckAll = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <IngredientButtons
        pending={PendingState.ABORTED}
        lists={lists}
        bulkAdd={bulkAdd}
        checkAll={checkAll}
        unCheckAll={unCheckAll}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Ingredient Buttons Complete', () => {
  const bulkAdd = jest.fn();
  const checkAll = jest.fn();
  const unCheckAll = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <IngredientButtons
        pending={PendingState.COMPLETED}
        lists={lists}
        bulkAdd={bulkAdd}
        checkAll={checkAll}
        unCheckAll={unCheckAll}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Ingredient Buttons Error', () => {
  const bulkAdd = jest.fn();
  const checkAll = jest.fn();
  const unCheckAll = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <IngredientButtons
        pending={PendingState.ABORTED}
        lists={lists}
        bulkAdd={bulkAdd}
        checkAll={checkAll}
        unCheckAll={unCheckAll}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
