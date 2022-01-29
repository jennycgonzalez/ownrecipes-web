import Spinner from 'react-spinkit';
import { DropdownButton, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { PendingState } from '../../common/store/GenericReducerType';
import Icon from '../../common/components/Icon';

export type IListsListType = {
  id:    number;
  title: string;
}

export interface IIngredientButtonsProps {
  lists: Array<IListsListType>;
  pending: keyof typeof PendingState;

  bulkAdd: (listId: number) => void;
  checkAll: () => void;
  unCheckAll: () => void;
}

const IngredientButtons: React.FC<IIngredientButtonsProps> = ({ lists, pending, bulkAdd, checkAll, unCheckAll }: IIngredientButtonsProps) => {
  const intl = useIntl();

  const messages = defineMessages({
    save: {
      id: 'recipe.recipe_ingredient_button.save',
      description: 'Save to list',
      defaultMessage: 'Add To',
    },
    check_all: {
      id: 'recipe.recipe_ingredient_button.check_all',
      description: 'Check All',
      defaultMessage: 'Check All',
    },
    clear: {
      id: 'recipe.recipe_ingredient_button.clear',
      description: 'Clear',
      defaultMessage: 'Clear',
    },
  });

  const listTitles: Array<React.ReactNode> = lists?.map(list => (
    <Dropdown.Item
        key={list.id}
        eventKey={list.id}
        onClick={() => bulkAdd(list.id)}>
      { list.title }
    </Dropdown.Item>
  )) ?? [];

  const listStatus = pending;

  let checkmark: React.ReactNode = '';
  if (listStatus === PendingState.LOADING) {
    checkmark = (
      <Spinner name='circle' className='recipe-list-spinner' fadeIn='none' />
    );
  } else if (listStatus === PendingState.COMPLETED) {
    checkmark = (
      <Icon icon='check' variant='light' />
    );
  } else if (listStatus === PendingState.ABORTED) {
    checkmark = (
      <Icon icon='x' variant='light' />
    );
  }

  const dropdown = (
    <DropdownButton title={intl.formatMessage(messages.save)} id='ing-save'>
      {listTitles}
    </DropdownButton>
  );

  return (
    <div className='ingredients-save'>
      <ButtonGroup>
        <Button onClick={checkAll} variant='outline-primary'>
          {intl.formatMessage(messages.check_all)}
        </Button>
        <Button onClick={unCheckAll} variant='outline-primary'>
          {intl.formatMessage(messages.clear)}
        </Button>
        {listTitles.length > 0 && dropdown}
      </ButtonGroup>
      { checkmark }
    </div>
  );
};

export default IngredientButtons;
