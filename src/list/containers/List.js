import { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import authCheckRedirect from '../../common/authCheckRedirect';
import GroceryList from '../components/GroceryList';
import * as ListActions from '../actions/ListActions';
import documentTitle from '../../common/documentTitle';

class List extends Component {
  componentDidMount() {
    authCheckRedirect();
    this.props.listActions.load();
  }

  componentWillUnmount() {
    documentTitle();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.lists.length > 0 && nextProps.match.params.list) {
      if (!(nextProps.lists.find(t => t.slug === nextProps.match.params.list))) {
        this.props.history.push('/list/');
      }
    }
  }

  render() {
    const { match, lists, listActions, intl } = this.props;
    const list = lists.find(t => t.slug === match.params.list);
    documentTitle(list ? list.title : intl.messages['new_list.header']);
    return (
      <GroceryList
          lists={lists}
          activeListID={list ? list.id : 0}
          listActions={listActions}
      />
    );
  }
}

List.propTypes = {
  lists: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  listActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  lists: state.list.lists,
  error: state.list.error,
});

const mapDispatchToProps = dispatch => ({
  listActions: bindActionCreators(ListActions, dispatch),
});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(List));
