import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import '../css/theme.css';

import { ThemeMode } from '../../account/store/settings/types';
import { CombinedStore } from '../Store';

const ThemeProvider: React.FC = () => {
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

  return null;
};

export default ThemeProvider;
