import { useSelector } from 'react-redux';

// Load components
import Header from '../header/containers/Header';
import Demo from './components/Demo';
import Footer from './components/Footer';

import ErrorBoundary from '../common/components/ErrorBoundary';
import { isDemoMode } from '../common/utility';

import './css/core.css';
import './css/print.css';

import Routes from './components/Routes';
import { CombinedStore } from './Store';

const App = () => {
  const accountState = useSelector((state: CombinedStore) => state.account);
  const isAuthenticated = accountState.item != null && accountState.item.id !== 0;

  const main = (
    <ErrorBoundary verbose printStack>
      <div>
        <div id='content'>
          <div>
            <Header />
            { isDemoMode() ? <Demo /> : '' }
            <Routes isAuthenticated={isAuthenticated} />
          </div>
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );

  return main;
};

export default App;
