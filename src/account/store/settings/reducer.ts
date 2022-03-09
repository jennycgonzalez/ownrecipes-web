import * as _ from 'lodash';

import { ISettingsAction, LanguageCode, parseLanguage, parseTheme, SettingsAction, SettingsActionTypes, SettingsState, SETTINGS_STORE, SETTING_LANGUAGE_STORAGE_KEY, SETTING_THEME_STORAGE_KEY, ThemeMode } from './types';

const defaultState: SettingsState = {
  themeMode: parseTheme(localStorage.getItem(SETTING_THEME_STORAGE_KEY), ThemeMode.LIGHT),
  language:  parseLanguage(localStorage.getItem(SETTING_LANGUAGE_STORAGE_KEY), LanguageCode.EN),
};

function setLanguage(state: SettingsState, action: ISettingsAction): SettingsState {
  const upd = _.cloneDeep(state);

  localStorage.setItem(SETTING_LANGUAGE_STORAGE_KEY, action.data);
  upd.language = (action.data as LanguageCode);

  return upd;
}

function setTheme(state: SettingsState, action: ISettingsAction): SettingsState {
  const upd = _.cloneDeep(state);

  localStorage.setItem(SETTING_THEME_STORAGE_KEY, action.data);
  upd.themeMode = (action.data as ThemeMode);

  return upd;
}

const reducer = (state = defaultState, action: SettingsAction): SettingsState => {
  if (action.store === SETTINGS_STORE) {
    switch (action.type) {
      case SettingsActionTypes.LANGUAGE:
        return setLanguage(state, action);
      case SettingsActionTypes.THEME_MODE:
        return setTheme(state, action);
      default:
        break;
    }
  }

  return state;
};

export default reducer;
