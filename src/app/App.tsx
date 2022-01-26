import { Provider } from 'react-redux';

// Load components
// import Header from '../header/containers/Header';
import Demo from './components/Demo';
import Footer from './components/Footer';

import store from '../common/store/store';
import ErrorBoundary from '../common/components/ErrorBoundary';
import { isDemoMode } from '../common/utility';

import './css/core.css';
import './css/print.css';

import Routes from './components/Routes';

const App = () => {
  // TODO Check if isAuthenticated
  const isAuthenticated = false;

  const main = (
    <Provider store={store}>
      <ErrorBoundary verbose printStack>
        <div>
          <div id='content'>
            <div>
              {/* <Header /> */}
              { isDemoMode() ? <Demo /> : '' }
              <Routes isAuthenticated={isAuthenticated} />
            </div>
          </div>
          <Footer />
        </div>
      </ErrorBoundary>
    </Provider>
  );

  return main;
};

export default App;
