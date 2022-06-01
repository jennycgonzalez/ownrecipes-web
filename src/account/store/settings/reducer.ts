import { LanguageCode, toLanguageCode } from '../../../common/language';
import LocalStorageHelper from '../../../common/LocalStorageHelper';
import { ISettingsInitAction, ISettingsDataAction, parseTheme, SettingsAction, SettingsActionTypes, SettingsState, SETTINGS_STORE, SETTING_LANGUAGE_STORAGE_KEY, SETTING_THEME_STORAGE_KEY, ThemeMode } from './types';

const defaultState: SettingsState = {
  themeMode: parseTheme(LocalStorageHelper.getItem(SETTING_THEME_STORAGE_KEY), ThemeMode.LIGHT),
  language:  toLanguageCode(LocalStorageHelper.getItem(SETTING_LANGUAGE_STORAGE_KEY), LanguageCode.EN),
};

function init(state: SettingsState, action: ISettingsInitAction): SettingsState {
  const upd = { ...state };

  const keys = LocalStorageHelper.getKeys(action.tokenId);
  keys.forEach(key => {
    const val = LocalStorageHelper.getItem(key, action.tokenId);
    if (val != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (upd as any)[key] = val;
    }
  });

  return upd;
}

function setLanguage(state: SettingsState, action: ISettingsDataAction): SettingsState {
  const upd = { ...state };

  LocalStorageHelper.setItem(SETTING_LANGUAGE_STORAGE_KEY, action.data, action.tokenId);
  LocalStorageHelper.setItem(SETTING_LANGUAGE_STORAGE_KEY, action.data);
  upd.language = (action.data as LanguageCode);

  return upd;
}

function setTheme(state: SettingsState, action: ISettingsDataAction): SettingsState {
  const upd = { ...state };

  LocalStorageHelper.setItem(SETTING_THEME_STORAGE_KEY, action.data, action.tokenId);
  LocalStorageHelper.setItem(SETTING_THEME_STORAGE_KEY, action.data);
  upd.themeMode = (action.data as ThemeMode);

  return upd;
}

const reducer = (state = defaultState, action: SettingsAction): SettingsState => {
  if (action.store === SETTINGS_STORE) {
    switch (action.type) {
      case SettingsActionTypes.INIT:       return init(state, action);
      case SettingsActionTypes.LANGUAGE:   return setLanguage(state, action);
      case SettingsActionTypes.THEME_MODE: return setTheme(state, action);
      default: break;
    }
  }

  return state;
};

export default reducer;
