import { ThemeMode, SettingsDispatch, SETTINGS_STORE, LanguageCode, SettingsActionTypes } from './types';

export const changeThemeMode = (newThemeMode: ThemeMode) => (dispatch: SettingsDispatch) => {
  dispatch({ store: SETTINGS_STORE, type: SettingsActionTypes.THEME_MODE, data: newThemeMode });
};

export const changeLanguage = (newLanguage: LanguageCode) => (dispatch: SettingsDispatch) => {
  dispatch({ store: SETTINGS_STORE, type: SettingsActionTypes.LANGUAGE, data: newLanguage });
};
