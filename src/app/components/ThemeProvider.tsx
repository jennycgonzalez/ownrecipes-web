import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ThemeMode } from '../../account/store/settings/types';
import { CombinedStore } from '../Store';

import '../css/theme.css';

export interface IThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<IThemeProviderProps> = (props: IThemeProviderProps) => {
  const settings = useSelector((state: CombinedStore) => state.settings);

  const [theme, setTheme] = useState<ThemeMode>();

  useEffect(() => {
    if (settings.themeMode !== theme) {
      setTheme(settings.themeMode);

      const doc = document;
      if (doc == null) return;
      const docElement = doc.documentElement;
      if (docElement == null) return;

      docElement.classList.add('color-theme-in-transition');

      docElement.setAttribute('data-theme', settings.themeMode);
      window.setTimeout(() => {
        docElement.classList.remove('color-theme-in-transition');
      }, 1000);
    }
  }, [settings.themeMode]);

  return <>{props.children}</>;
};

export default ThemeProvider;
