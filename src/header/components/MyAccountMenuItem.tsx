import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { NavDropdown, Dropdown, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getResourcePath } from '../../common/utility';
import { UserAccount } from '../../account/store/types';
import Modal from '../../common/components/Modal';
import { LanguageCode, Settings, ThemeMode } from '../../account/store/settings/types';

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
    language_modal_title: {
      id: 'nav.accountmenu.language_modal_title',
      description: 'Change language dialog title',
      defaultMessage: 'Choose language',
    },
    language_de: {
      id: 'language.code.de',
      description: 'German',
      defaultMessage: 'Deutsch (German)',
    },
    language_en: {
      id: 'language.code.en',
      description: 'English',
      defaultMessage: 'English',
    },
    theme: {
      id: 'nav.accountmenu.theme',
      description: 'Item to open the theme change dialog',
      defaultMessage: 'Theme',
    },
    theme_modal_title: {
      id: 'nav.accountmenu.theme_modal_title',
      description: 'Change theme mode dialog title',
      defaultMessage: 'Choose theme',
    },
    theme_mode_dark: {
      id: 'theme.mode.dark',
      description: 'Dark mode',
      defaultMessage: 'Dark',
    },
    theme_mode_light: {
      id: 'theme.mode.light',
      description: 'Light mode',
      defaultMessage: 'Light',
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

  const languageButtons = Object.values(LanguageCode).map(l => (
    <ListGroup.Item key={l} action disabled={props.settings.language === l} onClick={() => handleChangeLanguage(l)}>{formatMessage(messages[`language_${l}`])}</ListGroup.Item>
  ));

  const themeButtons = Object.values(ThemeMode).map(t => (
    <ListGroup.Item key={t} action disabled={props.settings.themeMode === t} onClick={() => handleChangeTheme(t)}>{formatMessage(messages[`theme_mode_${t}`])}</ListGroup.Item>
  ));

  return (
    <>
      <NavDropdown
          title={(
            <>
              <div className='subtitle'>{formatMessage(messages.hello, { name: props.account.username })}</div>
              <span>{formatMessage(messages.title)}</span>
            </>
          )}
          id='basic-nav-dropdown'>
        <NavDropdown.Item onClick={handleChangeLanguageClick}>{`${formatMessage(messages.language)} …`}</NavDropdown.Item>
        <NavDropdown.Item onClick={handleChangeThemeClick}>{`${formatMessage(messages.theme)} …`}</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href={process.env.REACT_APP_ADMIN_URL ?? '/admin'}>{`➝ ${formatMessage(messages.admin)}`}</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={props.onLogoutClick}>{formatMessage(messages.logout)}</NavDropdown.Item>
      </NavDropdown>

      <Modal
          show = {showLanguageDialog}
          title = {formatMessage(messages.language_modal_title)}
          onClose = {handleLanguageDialogClose}
          size = 'sm'
          noCloseButton>
        <ListGroup>
          {languageButtons}
        </ListGroup>
      </Modal>

      <Modal
          show = {showThemeDialog}
          title = {formatMessage(messages.theme_modal_title)}
          onClose = {handleThemeDialogClose}
          size = 'sm'
          noCloseButton>
        <ListGroup>
          {themeButtons}
        </ListGroup>
      </Modal>
    </>
  );
};
