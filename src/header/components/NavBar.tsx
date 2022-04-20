import { defineMessages, useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { Image, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import '../css/header.css';

import Icon from '../../common/components/Icon';
import CreateRecipeMenuItem from './CreateRecipeMenuItem';
// import GroceryListMenuItem, { ListItemType } from './GroceryListMenuItem';
// import MenuMenuItem from './MenuMenuItem';
import { AccountMenuMenuItem, AccountLoginMenuItem } from './MyAccountMenuItem';
import { getEnvAsBoolean, getResourcePath } from '../../common/utility';
import { UserAccount } from '../../account/store/types';
import { LanguageCode, Settings, ThemeMode } from '../../account/store/settings/types';
import LoginSettings from './LoginSettings';
import NavSearch from './NavSearch';
import NavLink from './NavLink';

export interface INavBarProps {
  account:  UserAccount | undefined;
  settings: Settings;
  // lists:    Array<ListItemType> | undefined;

  locationPath: string;

  onChangeLanguage: (language: LanguageCode) => void;
  onChangeTheme: (theme: ThemeMode) => void;
  onLogoutClick: () => void;
  onRandomRecipeClick: () => void;
}

const NavBar: React.FC<INavBarProps> = ({
    account, settings, locationPath,
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
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);
  const handleExpandSearch = (expanded: boolean) => setIsSearchExpanded(expanded);

  const isAuthenticated = account != null && account.id !== 0;
  const isLoginRequired = getEnvAsBoolean('REACT_APP_REQUIRE_LOGIN');
  const isLoginPage = locationPath.endsWith('login');
  const isBrowserPage = locationPath.endsWith('browser');

  const myAccountBtn = isAuthenticated && (
    <AccountMenuMenuItem
        account  = {account}
        settings = {settings}
        onChangeLanguage = {onChangeLanguage}
        onChangeTheme = {onChangeTheme}
        onLogoutClick = {onLogoutClick} />
  );
  const settingsBnt = (
    <LoginSettings
        settings = {settings}
        onChangeLanguage = {onChangeLanguage}
        onChangeTheme = {onChangeTheme} />
  );
  const loginBtn = (
    <AccountLoginMenuItem />
  );
  const navSearch = !isBrowserPage && (
    <NavSearch onExpandSearch={handleExpandSearch} />
  );

  return (
    <Navbar collapseOnSelect className='header' expand='md' id='header-navbar'>
      <Container className={classNames({ 'search-expanded': isSearchExpanded })}>
        <Navbar.Toggle><Icon icon='list' variant='light' size='2x' /></Navbar.Toggle>
        <Navbar.Brand>
          <Link to={getResourcePath('/home')} title={formatMessage(messages.home)}>
            <Image alt='Brand' src={getResourcePath('/images/chef.png')} width='30' height='30' className='d-inline-block align-top' />
          </Link>
        </Navbar.Brand>
        {!isScreenMdUp && (
          <div className='my-account-nav'>
            {navSearch}
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
          <Nav className={classNames('header-nav', { 'collapse-d-lg': isSearchExpanded })}>
            {(!isLoginRequired || isAuthenticated) && <NavLink to={getResourcePath('/browser')}>{formatMessage(messages.recipes)}</NavLink>}
            {(!isLoginRequired || isAuthenticated) && <NavLink as='button' onClick={onRandomRecipeClick}>{formatMessage(messages.randomRecipe)}</NavLink>}
            {/* isAuthenticated && <MenuMenuItem /> */}
            {isAuthenticated && <CreateRecipeMenuItem />}
            {/* isAuthenticated && <GroceryListMenuItem data={props.lists} /> */}
          </Nav>
          {isScreenMdUp && (
            <div className='header-nav my-account-nav'>
              {(!isLoginRequired || isAuthenticated) && navSearch}
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
