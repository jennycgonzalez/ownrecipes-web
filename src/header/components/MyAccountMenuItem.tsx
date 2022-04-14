import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { NavDropdown, Button } from 'react-bootstrap';

import { getResourcePath } from '../../common/utility';
import { UserAccount } from '../../account/store/types';
import { LanguageCode, Settings, ThemeMode } from '../../account/store/settings/types';
import Icon from '../../common/components/Icon';
import { LanguageDialog } from './LanguageDialog';
import { ThemeDialog } from './ThemeDialog';

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
    <Button id='login-button' variant='primary' href={getResourcePath('/login')} className='nav-link'>
      <Icon icon='box-arrow-in-right' variant='light' size='2x' className='visible-xs' />
      <span className='hidden-xs'>{formatMessage(messages.label)}</span>
    </Button>
  );
};

export interface IAccountMenuMenuItemProps {
  account:  UserAccount;
  settings: Settings;

  onChangeLanguage: (language: LanguageCode) => void;
  onChangeTheme: (theme: ThemeMode) => void;
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
    language: {
      id: 'nav.accountmenu.language',
      description: 'Item to open the language change dialog',
      defaultMessage: 'Language',
    },
    theme: {
      id: 'nav.accountmenu.theme',
      description: 'Item to open the theme change dialog',
      defaultMessage: 'Theme',
    },
    admin: {
      id: 'nav.accountmenu.admin',
      description: 'Djanog Admin Page',
      defaultMessage: 'Administration',
    },
    logout: {
      id: 'nav.accountmenu.logout',
      description: 'Logout title',
      defaultMessage: 'Logout',
    },
  });

  const [showLanguageDialog, setShowLanguageDialog] = useState<boolean>(false);
  const [showThemeDialog, setShowThemeDialog] = useState<boolean>(false);

  const handleChangeLanguageClick = () => setShowLanguageDialog(true);
  const handleLanguageDialogClose = () => setShowLanguageDialog(false);
  const handleChangeThemeClick    = () => setShowThemeDialog(true);
  const handleThemeDialogClose    = () => setShowThemeDialog(false);

  const handleChangeLanguage = (lang: LanguageCode) => {
    handleLanguageDialogClose();
    props.onChangeLanguage(lang);
  };

  const handleChangeTheme = (theme: ThemeMode) => {
    handleThemeDialogClose();
    props.onChangeTheme(theme);
  };

  return (
    <>
      <NavDropdown
          title={(
            <>
              <Icon icon='person-circle' variant='light' size='2x' className='visible-xs' />
              <div  className='hidden-xs subtitle'>{formatMessage(messages.hello, { name: props.account.username })}</div>
              <span className='hidden-xs'>{formatMessage(messages.title)}</span>
            </>
          )}
          align = 'end'
          id='my-account-dropdown'>
        <NavDropdown.Item onClick={handleChangeLanguageClick}>{`${formatMessage(messages.language)} …`}</NavDropdown.Item>
        <NavDropdown.Item onClick={handleChangeThemeClick}>{`${formatMessage(messages.theme)} …`}</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href={process.env.REACT_APP_ADMIN_URL ?? '/admin'}>{`➝ ${formatMessage(messages.admin)}`}</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={props.onLogoutClick}>{formatMessage(messages.logout)}</NavDropdown.Item>
      </NavDropdown>

      <LanguageDialog
          show     = {showLanguageDialog}
          settings = {props.settings}
          onChangeLanguage = {handleChangeLanguage}
          onClose = {handleLanguageDialogClose} />

      <ThemeDialog
          show     = {showThemeDialog}
          settings = {props.settings}
          onChangeTheme = {handleChangeTheme}
          onClose = {handleThemeDialogClose} />
    </>
  );
};
