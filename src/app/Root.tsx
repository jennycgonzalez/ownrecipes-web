import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
        <Router>
          <App />
        </Router>
      </ContextProvider>
    </Provider>
  </Suspense>
);

export default Root;
