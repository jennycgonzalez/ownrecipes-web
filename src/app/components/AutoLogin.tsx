import { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { AccountState } from '../../account/store/types';
import { ThunkDispatch } from 'redux-thunk';
import { NavigateFunction } from 'react-router';
import { Location } from 'history';

import { getResourcePath } from '../../common/utility';
import { CombinedStore } from '../Store';
import * as AccountActions from '../../account/store/actions';

import '../css/404.css';

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
      if (originUrl === '/' || originUrl === '/login') {
        this.props.nav(getResourcePath('/home'));
      } else {
        this.props.nav(`${originUrl}${this.state.originSearch}`);
      }
    } else if (prevToken != null && currToken == null) {
      setTimeout(() => {
        this.props.nav(getResourcePath('/home'));
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
