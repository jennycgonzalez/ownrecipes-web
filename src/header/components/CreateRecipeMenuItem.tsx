import { defineMessages, useIntl } from 'react-intl';

import { getResourcePath } from '../../common/utility';
import NavLink from './NavLink';

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
    <NavLink to={getResourcePath('/recipe/create')}>{formatMessage(messages.create_recipe)}</NavLink>
  );
};

export default CreateRecipeMenuItem;
