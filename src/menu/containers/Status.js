import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as MenuStatusActions from '../actions/MenuStatusActions';
import StatusBar from '../components/StatusBar';

const Status = props => {
  const { status, menuStatusActions } = props;

  return (
    <StatusBar
        alert={status.alert}
        message={status.message}
        close={menuStatusActions.close}
    />
  );
};

Status.propTypes = {
  status: PropTypes.object.isRequired,
  menuStatusActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  status: state.menu.status,
});

const mapDispatchToProps = dispatch => ({
  menuStatusActions: bindActionCreators(MenuStatusActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Status);
