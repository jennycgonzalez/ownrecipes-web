import { defineMessages, useIntl } from 'react-intl';
import { Nav } from 'react-bootstrap';
import { getResourcePath } from '../../common/utility';

const CreateRecipeMenuItem: React.FC = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    create_recipe: {
      id: 'nav.create_recipe',
      description: 'Create recipe title',
      defaultMessage: 'Create',
    },
  });

  return (
    <Nav.Link href={getResourcePath('/recipe/create')}>{formatMessage(messages.create_recipe)}</Nav.Link>
  );
};

export default CreateRecipeMenuItem;
