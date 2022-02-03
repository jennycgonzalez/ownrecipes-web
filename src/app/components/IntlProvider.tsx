import { useEffect, useState } from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { LanguageCode, parseLanguage, SETTING_LANGUAGE_STORAGE_KEY } from '../../account/store/settings/types';

import localeDe from '../../locale/de.json';
import localeEn from '../../locale/en.json';
import { CombinedStore } from '../Store';

export interface IIntlProviderProps {
  children: React.ReactNode;
}

function toSupportedLanguage(lang: string | undefined): LanguageCode {
  if (lang == null) return LanguageCode.EN;

  const langg = lang.toLocaleLowerCase();
  switch (langg) {
    case 'de':
    case 'en':
      return (langg as LanguageCode);
    default: return LanguageCode.EN;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMessagesFromLang(lang: LanguageCode): any {
  switch (lang) {
    case LanguageCode.DE: return localeDe;
    case LanguageCode.EN: return localeEn;
    default: return localeEn;
  }
}

const IntlProvider: React.FC<IIntlProviderProps> = (props: IIntlProviderProps) => {
  const DEFAULT_LANGUAGE = toSupportedLanguage(process.env.REACT_APP_LOCALE);

  const settings = useSelector((state: CombinedStore) => state.settings);

  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    let newLanguage: LanguageCode;

    const userLanguageKey = localStorage.getItem(SETTING_LANGUAGE_STORAGE_KEY);
    if (userLanguageKey != null) {
      newLanguage = parseLanguage(userLanguageKey, DEFAULT_LANGUAGE);
    } else {
      const browserLanguage = (navigator.languages && navigator.languages[0]) || navigator.language;
      let browserLanguageWithoutRegionCode: LanguageCode = browserLanguage.toLowerCase().split(/[-_]/)[0] as unknown as LanguageCode;
      if (!Object.values(LanguageCode).includes(browserLanguageWithoutRegionCode as LanguageCode)) {
        browserLanguageWithoutRegionCode = DEFAULT_LANGUAGE;
      }
      newLanguage = browserLanguageWithoutRegionCode;
    }

    if (newLanguage !== language) {
      setLanguage(newLanguage);
    }
  }, []);

  useEffect(() => {
    if (settings.language !== language) {
      setLanguage(settings.language);
    }
  }, [settings.language]);

  return (
    <ReactIntlProvider locale={language} defaultLocale={DEFAULT_LANGUAGE} messages={getMessagesFromLang(language)}>
      {props.children}
    </ReactIntlProvider>
  );
};

export default IntlProvider;
