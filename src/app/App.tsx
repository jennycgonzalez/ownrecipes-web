import Header from '../header/containers/Header';
import Demo from './components/Demo';
import Footer from './components/Footer';

import ErrorBoundary from '../common/components/ErrorBoundary';

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
        {process.env.REACT_APP_DEMO === 'demo' && <Demo />}
        {process.env.REACT_APP_DEMO !== 'demo' && <ConnectionObserver />}
        {process.env.REACT_APP_DEMO !== 'demo' && <IntlMessagesCreator />}
        <Routes />
      </div>
      <Footer />
      <InternalErrorDialog />
    </ErrorBoundary>
  );

  return main;
};

export default App;
