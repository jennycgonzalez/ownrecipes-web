import { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import bindIndexToActionCreators from '../../common/bindIndexToActionCreators';
import ListItems from '../components/ListItems';
import * as ItemActions from '../actions/ItemActions';

class Items extends Component {
  componentDidMount() {
    if (this.props.activeListID) {
      this.props.itemActions.load(this.props.activeListID);
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.activeListID !== this.props.activeListID) {
      this.props.itemActions.load(nextProps.activeListID);
    }
  }

  render() {
    const { activeListID, items, itemActions } = this.props;
    return (
      <ListItems
          activeListID={activeListID}
          items={items}
          itemActions={itemActions}
      />
    );
  }
}

Items.propTypes = {
  activeListID: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  itemActions: PropTypes.object.isRequired,
};

const getItemsFromList = (lists, listId) => {
  const list = lists.find(t => t.id === listId);
  if (list) {
    return list.items;
  }

  return [];
};

const mapStateToProps = (state, props) => ({
  items: getItemsFromList(state.list.lists, props.activeListID),
});

const mapDispatchToProps = (dispatch, props) => ({
  itemActions: bindActionCreators(
    bindIndexToActionCreators(ItemActions, props.activeListID),
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
