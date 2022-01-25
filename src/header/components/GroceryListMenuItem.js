import { injectIntl, defineMessages } from 'react-intl';
import { NavDropdown, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const GroceryListMenuItemBase = props => {
  const { formatMessage } = props.intl;
  const messages = defineMessages({
    grocery_list: {
      id: 'nav.grocery_list',
      description: 'Grocery List',
      defaultMessage: 'Grocery List',
    },
  });

  const lists = props.data.map(list => (
    <LinkContainer to={`/list/${list.slug}`} key={list.id}>
      <Dropdown.Item>{list.title}</Dropdown.Item>
    </LinkContainer>
  ));

  return (
    <NavDropdown
        eventKey='list'
        title={formatMessage(messages.grocery_list)}
        id='basic-nav-dropdown'>
      { lists }
      {(props.data.length > 0 ? <Dropdown.Item divider /> : null)}
      <LinkContainer to='/list'>
        <Dropdown.Item>{ formatMessage(messages.grocery_list) }</Dropdown.Item>
      </LinkContainer>
    </NavDropdown>

  );
};

export const GroceryListMenuItem = injectIntl(GroceryListMenuItemBase);
export default GroceryListMenuItem;
