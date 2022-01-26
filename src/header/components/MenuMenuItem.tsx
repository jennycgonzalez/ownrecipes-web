import { defineMessages, useIntl } from 'react-intl';
import { Nav } from 'react-bootstrap';
import { getResourcePath } from '../../common/utility';

const MenuMenuItem: React.FC = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    menu: {
      id: 'nav.menu',
      description: 'menus',
      defaultMessage: 'Menu',
    },
  });

  return (
    <Nav.Link href={getResourcePath('/menu')}>{formatMessage(messages.menu)}</Nav.Link>
  );
};

export default MenuMenuItem;
