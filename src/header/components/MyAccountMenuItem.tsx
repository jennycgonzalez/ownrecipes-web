import { defineMessages, useIntl } from 'react-intl';
import { NavDropdown, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getResourcePath } from '../../common/utility';
import { UserAccount } from '../../account/store/types';

export const AccountLoginMenuItem: React.FC = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    label: {
      id: 'nav.login.title',
      description: 'Login title',
      defaultMessage: 'Login',
    },
  });

  return (
    <LinkContainer to={getResourcePath('/login')}>
      <Dropdown.Item>{formatMessage(messages.label)}</Dropdown.Item>
    </LinkContainer>
  );
};

export interface IAccountMenuMenuItemProps {
  account: UserAccount;
  onLogoutClick: () => void;
}

export const AccountMenuMenuItem: React.FC<IAccountMenuMenuItemProps> = (props: IAccountMenuMenuItemProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    hello: {
      id: 'nav.accountmenu.hello',
      description: 'Account menu greeting',
      defaultMessage: 'Hello, {name}',
    },
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
        title={(
          <>
            <div className='subtitle'>{formatMessage(messages.hello, { name: props.account.username })}</div>
            <span>{formatMessage(messages.title)}</span>
          </>
        )}
        id='basic-nav-dropdown'>
      {/* // admin is private for admin only. There is no "My account" page, it is all fake.
      <NavDropdown.Item href={'/admin'}>{formatMessage(messages.admin)}</NavDropdown.Item>
      */}
      <NavDropdown.Item onClick={props.onLogoutClick}>{formatMessage(messages.logout)}</NavDropdown.Item>
    </NavDropdown>
  );
};
