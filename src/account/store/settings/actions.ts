import { CombinedStore } from '../../../app/Store';
import { LanguageCode } from '../../../common/language';
import { ThemeMode, SettingsDispatch, SETTINGS_STORE, SettingsActionTypes, SettingsAction } from './types';

export const init = (tokenId: string | undefined): SettingsAction => ({
  store: SETTINGS_STORE, type: SettingsActionTypes.INIT, tokenId: tokenId,
});

export const changeThemeMode = (newThemeMode: ThemeMode) => (dispatch: SettingsDispatch, getState: () => CombinedStore) => {
  dispatch({ store: SETTINGS_STORE, type: SettingsActionTypes.THEME_MODE, data: newThemeMode, tokenId: getState().account.item?.username });
};

export const changeLanguage = (newLanguage: LanguageCode) => (dispatch: SettingsDispatch, getState: () => CombinedStore) => {
  dispatch({ store: SETTINGS_STORE, type: SettingsActionTypes.LANGUAGE, data: newLanguage, tokenId: getState().account.item?.username });
};
