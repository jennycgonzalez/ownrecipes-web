import { Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';

import Spinner from './components/Spinner';

import App from './App';

import localeDe from '../locale/de.json';
import localeEn from '../locale/en.json';

type SupportedLanguages = 'de' | 'en';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const locales: Record<SupportedLanguages, any> = {
  de: localeDe,
  en: localeEn,
};

let language: SupportedLanguages = navigator.language.split(/[-_]/)[0] as unknown as SupportedLanguages; // language without region code
if (!['de', 'en'].includes(language)) {
  language = 'en';
}

// TODO make language user changable

const Root = () => (
  <Suspense fallback={<Spinner />}>
    <IntlProvider locale={language} defaultLocale='en' messages={locales[language]}>
      <Router>
        <App />
      </Router>
    </IntlProvider>
  </Suspense>
);

export default Root;
