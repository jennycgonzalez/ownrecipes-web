import { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { AccountState } from '../../account/store/types';
import { ThunkDispatch } from 'redux-thunk';
import { NavigateFunction } from 'react-router';
import { Location } from 'history';

import '../css/404.css';

import { getEnvAsBoolean, getResourcePath } from '../../common/utility';
import { CombinedStore } from '../Store';
import * as AccountActions from '../../account/store/actions';

interface IAutoLoginProps {
  nav: NavigateFunction;
  loc: Location;
  children: React.ReactNode;
}

interface IDispatchProps {
  tryAutoLogin: () => void;
}

interface IStateProps {
  account: AccountState;
}

interface IAutoLoginState {
  originUrl: string;
  originSearch: string;
}

type IProps = IStateProps & IDispatchProps & IAutoLoginProps;

class AutoLogin extends Component<IProps, IAutoLoginState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      originUrl: this.props.loc.pathname,
      originSearch: this.props.loc.search,
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
      if (originUrl === getResourcePath('/') || originUrl === getResourcePath('/login')) {
        this.props.nav(getResourcePath('/home'), { replace: true });
      } else if (this.props.loc.pathname !== originUrl) {
        this.props.nav(`${originUrl}${this.state.originSearch}`, { replace: true });
      }
    } else if (prevToken != null && currToken == null) {
      setTimeout(() => {
        const isLoginRequired = getEnvAsBoolean('REACT_APP_REQUIRE_LOGIN');
        this.props.nav(getResourcePath(isLoginRequired ? '/login' : '/home'));
        this.props.nav(0);
      }, 500);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state: CombinedStore): IStateProps => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<CombinedStore, unknown, AnyAction>): IDispatchProps => ({
  tryAutoLogin:  () => dispatch(AccountActions.tryAutoLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoLogin);
