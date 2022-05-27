import { Dispatch as ReduxDispatch } from 'redux';
import { LanguageCode } from '../../../common/language';

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export function parseTheme(theme: string | undefined | null, def: ThemeMode): ThemeMode {
  if (theme == null) return def;
  if (Object.values(ThemeMode).includes(theme as ThemeMode)) {
    return (theme as ThemeMode);
  } else {
    return def;
  }
}

export enum SettingsActionTypes {
  THEME_MODE = 'THEME_MODE',
  LANGUAGE   = 'LANGUAGE',
}

export type Settings = {
  themeMode: ThemeMode;
  language:  LanguageCode;
}

export const SETTINGS_STORE = '@@settings';
export const SETTING_THEME_STORAGE_KEY = 'ownrecipes-theme';
export const SETTING_LANGUAGE_STORAGE_KEY = 'ownrecipes-lang';

export interface ISettingsAction {
  store: typeof SETTINGS_STORE;
  type: keyof typeof SettingsActionTypes;
  data: string;
}

export type SettingsState    = Settings;
export type SettingsAction   = ISettingsAction;
export type SettingsDispatch = ReduxDispatch<SettingsAction>;
