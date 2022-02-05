import { DropdownButton, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { PendingState } from '../../common/store/GenericReducerType';

export type IListsListType = {
  id:    number;
  title: string;
}

export interface IIngredientButtonsProps {
  lists: Array<IListsListType>;
  pending: PendingState;

  bulkAdd: (listId: number) => void;
  checkAll: () => void;
  unCheckAll: () => void;
}

const IngredientButtons: React.FC<IIngredientButtonsProps> = ({ lists, pending, bulkAdd, checkAll, unCheckAll }: IIngredientButtonsProps) => {
  const { formatMessage } = useIntl();

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

  const listTitles: Array<React.ReactNode> = lists.map(list => (
    <Dropdown.Item
        key={list.id}
        eventKey={list.id}
        onClick={() => bulkAdd(list.id)}>
      { list.title }
    </Dropdown.Item>
  ));

  const dropdown = (
    <DropdownButton title={formatMessage(messages.save)} id='ing-save'>
      {listTitles}
    </DropdownButton>
  );

  /* TODO Lists
  let checkmark = '';
  if (pending === PendingState.LOADING) {
    checkmark = (
      <Spinner spinnerName="circle" className="recipe-list-spinner" noFadeIn />
    )
  } else if (pending === PendingState.COMPLETED) {
    checkmark = (
      <div className="glyphicon glyphicon-ok"/>
    );
  } else if (pending === PendingState.ABORTED) {
    checkmark = (
      <div className="glyphicon glyphicon-remove"/>
    );
  } */

  return (
    <div className='ingredients-buttons'>
      <ButtonGroup>
        <Button onClick={checkAll} variant='outline-primary'>
          {formatMessage(messages.check_all)}
        </Button>
        <Button onClick={unCheckAll} variant='outline-primary'>
          {formatMessage(messages.clear)}
        </Button>
        {listTitles.length > 0 && dropdown}
        {/* pending && checkmark */}
      </ButtonGroup>
    </div>
  );
};

export default IngredientButtons;
