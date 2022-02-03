import { Dispatch as ReduxDispatch } from 'redux';

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum LanguageCode {
  DE = 'de',
  EN = 'en',
}

export function parseTheme(theme: string | undefined | null, def: ThemeMode): ThemeMode {
  if (theme == null) return def;
  if (Object.values(ThemeMode).includes(theme as ThemeMode)) {
    return (theme as ThemeMode);
  } else {
    return def;
  }
}

export function parseLanguage(lang: string | undefined | null, def: LanguageCode): LanguageCode {
  if (lang == null) return def;
  if (Object.values(LanguageCode).includes(lang as LanguageCode)) {
    return (lang as LanguageCode);
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
