import { Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';

import Spinner from './Spinner/Spinner';

import '../css/core.css';
import '../css/print.css';

import App from './App';

// const language = navigator.language.split(/[-_]/)[0];  // language without region code
// eslint-disable-next-line import/no-dynamic-require
const messages = require(`../../locale/en.json`);

const Root = () => (
  <Suspense fallback={<Spinner />}>
    <IntlProvider locale='en' messages={messages}>
      <Router>
        <App />
      </Router>
    </IntlProvider>
  </Suspense>
);

export default Root;
