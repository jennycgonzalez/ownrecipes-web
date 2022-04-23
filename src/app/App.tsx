import Header from '../header/containers/Header';
import Demo from './components/Demo';
import Footer from './components/Footer';

import ErrorBoundary from '../common/components/ErrorBoundary';
import { isDemoMode } from '../common/utility';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/core.css';
import './css/print.css';

import Routes from './Routes';
import AutoLogin from './AutoLogin';
import ConnectionObserver from './components/ConnectionObserver';
import InternalErrorDialog from './components/InternalErrorDialog';
import IntlMessagesCreator from './components/IntlMessagesCreator';

const App = () => {
  const main = (
    <ErrorBoundary verbose printStack>
      <AutoLogin />
      <div id='content'>
        <Header />
        {isDemoMode() && <Demo />}
        {!isDemoMode() && <ConnectionObserver />}
        {!isDemoMode() && <IntlMessagesCreator />}
        <Routes />
      </div>
      <Footer />
      <InternalErrorDialog />
    </ErrorBoundary>
  );

  return main;
};

export default App;
