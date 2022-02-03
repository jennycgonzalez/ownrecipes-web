import { IntlProvider as ReactIntlProvider } from 'react-intl';

import localeDe from '../../locale/de.json';
import localeEn from '../../locale/en.json';

export interface IIntlProviderProps {
  children: React.ReactNode;
}

type SupportedLanguages = 'de' | 'en';

function toSupportedLanguage(lang: string | undefined): 'de' | 'en' {
  if (lang == null) return 'en';

  const langg = lang.toLocaleLowerCase();
  switch (langg) {
    case 'de':
    case 'en':
      return langg;
    default: return 'en';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMessagesFromLang(lang: SupportedLanguages): any {
  switch (lang) {
    case 'de': return localeDe;
    case 'en': return localeEn;
    default:   return localeEn;
  }
}

const IntlProvider: React.FC<IIntlProviderProps> = (props: IIntlProviderProps) => {
  const DEFAULT_LANGUAGE = toSupportedLanguage(process.env.REACT_APP_LOCALE);
  const language = (navigator.languages && navigator.languages[0]) || navigator.language;
  let languageWithoutRegionCode: SupportedLanguages = language.toLowerCase().split(/[-_]/)[0] as unknown as SupportedLanguages;
  if (!['de', 'en'].includes(languageWithoutRegionCode)) {
    languageWithoutRegionCode = DEFAULT_LANGUAGE;
  }

  return (
    <ReactIntlProvider locale={languageWithoutRegionCode} defaultLocale={DEFAULT_LANGUAGE} messages={getMessagesFromLang(languageWithoutRegionCode)}>
      {props.children}
    </ReactIntlProvider>
  );
};

export default IntlProvider;
