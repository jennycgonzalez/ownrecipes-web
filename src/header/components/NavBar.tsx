import { defineMessages, useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { Image, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Icon from '../../common/components/Icon';
import CreateRecipeMenuItem from './CreateRecipeMenuItem';
// import GroceryListMenuItem, { ListItemType } from './GroceryListMenuItem';
// import MenuMenuItem from './MenuMenuItem';
import { AccountMenuMenuItem, AccountLoginMenuItem } from './MyAccountMenuItem';
import { getResourcePath } from '../../common/utility';
import { UserAccount } from '../../account/store/types';

import '../css/header.css';
import { LanguageCode, Settings, ThemeMode } from '../../account/store/settings/types';
import LoginSettings from './LoginSettings';

export interface INavBarProps {
  account:  UserAccount | undefined;
  settings: Settings;
  // lists:    Array<ListItemType> | undefined;

  isLoginPage: boolean;

  onChangeLanguage: (language: LanguageCode) => void;
  onChangeTheme: (theme: ThemeMode) => void;
  onLogoutClick: () => void;
  onRandomRecipeClick: () => void;
}

const NavBar: React.FC<INavBarProps> = ({
    account, settings, isLoginPage,
    onChangeLanguage,  onChangeTheme, onLogoutClick, onRandomRecipeClick }: INavBarProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    home: {
      id: 'nav.home',
      description: 'Home',
      defaultMessage: 'Home',
    },
    recipes: {
      id: 'nav.recipes',
      description: 'Navbar Recipes',
      defaultMessage: 'Browse',
    },
    randomRecipe: {
      id: 'nav.randomRecipe',
      description: 'Random Recipe',
      defaultMessage: 'Random',
    },
  });

  const [isScreenMdUp, setIsScreenMdUp] = useState<boolean>(false);
  useEffect(() => {
    /* OPT This would make a good hoc. */
    const handler = (e: MediaQueryListEvent) => setIsScreenMdUp(e.matches);
    window.matchMedia('(min-width: 768px)').addEventListener('change', handler);
    setIsScreenMdUp(window.matchMedia('(min-width: 768px)').matches);
  }, []);

  const isAuthenticated = account != null && account.id !== 0;

  const myAccountBtn = isAuthenticated && (
    <AccountMenuMenuItem
        account  = {account}
        settings = {settings}
        onChangeLanguage = {onChangeLanguage}
        onChangeTheme = {onChangeTheme}
        onLogoutClick = {onLogoutClick} />
  );
  const settingsBnt = !isAuthenticated && (
    <LoginSettings
        settings = {settings}
        onChangeLanguage = {onChangeLanguage}
        onChangeTheme = {onChangeTheme} />
  );
  const loginBtn = !isAuthenticated && !isLoginPage && (
    <AccountLoginMenuItem />
  );

  return (
    <Navbar collapseOnSelect className='header' expand='md' id='header-navbar'>
      <Container>
        <Navbar.Toggle><Icon icon='list' variant='light' size='2x' /></Navbar.Toggle>
        <Navbar.Brand>
          <Link to={getResourcePath('/home')} title={formatMessage(messages.home)}>
            <Image alt='Brand' src={getResourcePath('/images/chef.png')} width='30' height='30' className='d-inline-block align-top' />
          </Link>
        </Navbar.Brand>
        {!isScreenMdUp && (
          <div className='my-account-nav'>
            {isAuthenticated && (
              myAccountBtn
            )}
            {!isAuthenticated && (
              settingsBnt
            )}
            {!isAuthenticated && !isLoginPage && (
              loginBtn
            )}
          </div>
        )}
        <Navbar.Collapse>
          <Nav className='header-nav'>
            <Nav.Link href={getResourcePath('/browser')}>{formatMessage(messages.recipes)}</Nav.Link>
            <Nav.Link onClick={onRandomRecipeClick}>{formatMessage(messages.randomRecipe)}</Nav.Link>
            {/* isAuthenticated && <MenuMenuItem /> */}
            {isAuthenticated && <CreateRecipeMenuItem />}
            {/* isAuthenticated && <GroceryListMenuItem data={props.lists} /> */}
          </Nav>
          {isScreenMdUp && (
            <div className='header-nav my-account-nav'>
              {isAuthenticated && (
                myAccountBtn
              )}
              {!isAuthenticated && (
                settingsBnt
              )}
              {!isAuthenticated && !isLoginPage && (
                loginBtn
              )}
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
