import { defineMessages, useIntl } from 'react-intl';
import { Image, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CreateRecipeMenuItem from './CreateRecipeMenuItem';
import GroceryListMenuItem, { ListItemType } from './GroceryListMenuItem';
import MenuMenuItem from './MenuMenuItem';
import { AccountMenuMenuItem, AccountLoginMenuItem } from './MyAccountMenuItem';
import { getResourcePath } from '../../common/utility';
import { UserAccount } from '../../account/store/types';

import '../css/header.css';

export interface INavBarProps {
  account: UserAccount | undefined;
  lists: Array<ListItemType> | undefined;

  onLogoutClick: () => void;
  onRandomRecipeClick: () => void;
}

const NavBar: React.FC<INavBarProps> = (props: INavBarProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    brand: {
      id: 'nav.brand',
      description: 'Open Eats title',
      defaultMessage: 'Open Eats',
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

  const { account } = props;
  const isAuthenticated = account != null && account.id !== 0;

  return (
    <Navbar bg='light' collapseOnSelect className='header'>
      <Container>
        <Navbar.Brand>
          <Link to={getResourcePath('/home')}>
            <Image alt='Brand' src={getResourcePath('/images/chef.png')} width='30' height='30' className='d-inline-block align-top' />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href={getResourcePath('/browser')}>{formatMessage(messages.recipes)}</Nav.Link>
            <Nav.Link onClick={props.onRandomRecipeClick}>{formatMessage(messages.randomRecipe)}</Nav.Link>
            {isAuthenticated && <MenuMenuItem />}
            {isAuthenticated && <CreateRecipeMenuItem />}
            {isAuthenticated && <GroceryListMenuItem data={props.lists} />}
          </Nav>
          <Nav className='my-account-nav'>
            {(isAuthenticated
                ? <AccountMenuMenuItem account={account} onLogoutClick={props.onLogoutClick} />
                : <AccountLoginMenuItem />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
