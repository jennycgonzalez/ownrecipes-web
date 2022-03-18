import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

// Load components
import Header from '../header/containers/Header';
import Demo from './components/Demo';
import Footer from './components/Footer';

import ErrorBoundary from '../common/components/ErrorBoundary';
import { isDemoMode } from '../common/utility';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/core.css';
import './css/print.css';

import { CombinedStore } from './Store';
import Routes from './components/Routes';
import AutoLogin from './components/AutoLogin';
import ConnectionObserver from './components/ConnectionObserver';
import InternalErrorDialog from './components/InternalErrorDialog';
import IntlMessagesCreator from './components/IntlMessagesCreator';

const App = () => {
  const nav = useNavigate();
  const location = useLocation();

  const account = useSelector((state: CombinedStore) => state.account.item);
  const isAuthenticated = account != null && account.id !== 0;

  const main = (
    <ErrorBoundary verbose printStack>
      <AutoLogin nav={nav} loc={location}>
        <div id='content'>
          <Header />
          {isDemoMode() && <Demo />}
          {!isDemoMode() && <ConnectionObserver />}
          {!isDemoMode() && <IntlMessagesCreator />}
          <Routes isAuthenticated={isAuthenticated} />
        </div>
        <Footer />
      </AutoLogin>
      <InternalErrorDialog />
    </ErrorBoundary>
  );

  return main;
};

export default App;
