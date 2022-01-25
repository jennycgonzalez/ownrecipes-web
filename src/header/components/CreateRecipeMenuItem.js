import { injectIntl, defineMessages } from 'react-intl';
import { Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CreateRecipeMenuItemBase = props => {
  const { formatMessage } = props.intl;
  const messages = defineMessages({
    create_recipe: {
      id: 'nav.create_recipe',
      description: 'Create recipe title',
      defaultMessage: 'Create',
    },
  });

  return (
    <LinkContainer to='/recipe/create'>
      <Dropdown.Item>{ formatMessage(messages.create_recipe) }</Dropdown.Item>
    </LinkContainer>
  );
};

export const CreateRecipeMenuItem = injectIntl(CreateRecipeMenuItemBase);
export default CreateRecipeMenuItem;
