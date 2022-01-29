import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

// Load components
import Header from '../header/containers/Header';
import Demo from './components/Demo';
import Footer from './components/Footer';

import ErrorBoundary from '../common/components/ErrorBoundary';
import { isDemoMode } from '../common/utility';

import './css/core.css';
import './css/print.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Routes from './components/Routes';
import { CombinedStore } from './Store';
import AutoLogin from './components/AutoLogin';

const App = () => {
  const account = useSelector((state: CombinedStore) => state.account.item);
  const isAuthenticated = account != null && account.id !== 0;

  const nav = useNavigate();
  const location = useLocation();

  const main = (
    <ErrorBoundary verbose printStack>
      <AutoLogin nav={nav} loc={location}>
        <div id='content'>
          <Header />
          { isDemoMode() ? <Demo /> : '' }
          <Routes isAuthenticated={isAuthenticated} />
        </div>
        <Footer />
      </AutoLogin>
    </ErrorBoundary>
  );

  return main;
};

export default App;
