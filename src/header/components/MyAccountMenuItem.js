import { injectIntl, defineMessages } from 'react-intl';
import { NavDropdown, Dropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AccountLoginMenuItemBase = props => {
  const { formatMessage } = props.intl;
  const messages = defineMessages({
    label: {
      id: 'nav.login.title',
      description: 'Login title',
      defaultMessage: 'Login',
    },
  });

  return (
    <LinkContainer to='/login'>
      <Dropdown.Item>{ formatMessage(messages.label) }</Dropdown.Item>
    </LinkContainer>
  );
};

const AccountMenuMenuItemBase = props => {
  const { formatMessage } = props.intl;
  const messages = defineMessages({
    title: {
      id: 'nav.accountmenu.title',
      description: 'Account menu title',
      defaultMessage: 'Account',
    },
    logout: {
      id: 'nav.accountmenu.logout',
      description: 'Logout title',
      defaultMessage: 'Logout',
    },
    admin: {
      id: 'nav.accountmenu.admin',
      description: 'My Account',
      defaultMessage: 'My Account',
    },
  });

  return (
    <NavDropdown
        eventKey={1}
        title={formatMessage(messages.title)}
        id='basic-nav-dropdown'>
      <Dropdown.Item href='/admin/'>{formatMessage(messages.admin)}</Dropdown.Item>
      <Dropdown.Item divider />
      <NavItem onClick={props.authActions.logUserOut}>
        { formatMessage(messages.logout) }
      </NavItem>
    </NavDropdown>
  );
};

export const AccountMenuMenuItem = injectIntl(AccountMenuMenuItemBase);
export const AccountLoginMenuItem = injectIntl(AccountLoginMenuItemBase);
