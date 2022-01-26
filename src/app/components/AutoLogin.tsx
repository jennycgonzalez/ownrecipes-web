import { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { AccountState } from '../../account/store/types';
import { ThunkDispatch } from 'redux-thunk';

import { getResourcePath } from '../../common/utility';
import { CombinedStore } from '../Store';
import * as AccountActions from '../../account/store/actions';

import '../css/404.css';
import history from '../../common/history';

interface IDispatchProps {
  tryAutoLogin: () => void;
}

interface IStateProps {
  account: AccountState;
}

interface IAutoLoginState {
  originUrl: string;
}

type IProps = IStateProps & IDispatchProps;

class AutoLogin extends Component<IProps, IAutoLoginState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      originUrl: history.location.pathname,
    };
  }

  componentDidMount() {
    if (this.props.account.item == null) {
      this.props.tryAutoLogin();
    }
  }

  componentDidUpdate(prevProps: IProps) {
    const prevToken = prevProps.account.item;
    const currToken = this.props.account.item;
    const originUrl = this.state.originUrl;

    if (prevToken == null && currToken != null) {
      if (originUrl === '/' || originUrl === '/login') {
        history.replace(getResourcePath('/home'));
      } else {
        history.replace(originUrl);
      }
    }

    if (prevToken != null && currToken == null) {
      setTimeout(() => {
        history.push(getResourcePath('/login'));
        history.go(0);
      }, 500);
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: CombinedStore): IStateProps => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<CombinedStore, unknown, AnyAction>): IDispatchProps => ({
  tryAutoLogin:  () => dispatch(AccountActions.tryAutoLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoLogin);
