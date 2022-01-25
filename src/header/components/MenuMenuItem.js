import { injectIntl, defineMessages } from 'react-intl';
import { Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MenuMenuItemBase = props => {
  const { formatMessage } = props.intl;
  const messages = defineMessages({
    menu: {
      id: 'nav.menu',
      description: 'menus',
      defaultMessage: 'Menu',
    },
  });

  return (
    <LinkContainer to='/menu/'>
      <Dropdown.Item>{ formatMessage(messages.menu) }</Dropdown.Item>
    </LinkContainer>
  );
};

export const MenuMenuItem = injectIntl(MenuMenuItemBase);
export default MenuMenuItem;
