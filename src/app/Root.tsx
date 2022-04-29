import { Suspense } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Spinner from './components/Spinner';
import store from '../common/store/store';
import ContextProvider from './components/ContextProvider';
import ThemeProvider from './components/ThemeProvider';
import App from './App';

const Root = () => (
  <Suspense fallback={<Spinner />}>
    <Provider store={store}>
      <ThemeProvider />
      <ContextProvider>
        {process.env.REACT_APP_DEMO !== 'demo' && <BrowserRouter><App /></BrowserRouter>}
        {process.env.REACT_APP_DEMO === 'demo' && <HashRouter><App /></HashRouter>}
      </ContextProvider>
    </Provider>
  </Suspense>
);

export default Root;
