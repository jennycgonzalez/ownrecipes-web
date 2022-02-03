// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import NavBar from '../components/NavBar';
import * as AuthActions from '../../account/store/actions';
// import * as ListActions from '../../list/store/actions';
import * as RandomRecipeActions from '../actions/RandomRecipeActions';
import * as SettingsActions from '../../account/store/settings/actions';
import { CombinedStore } from '../../app/Store';
import { ListItemType } from '../components/GroceryListMenuItem';
import { LanguageCode, ThemeMode } from '../../account/store/settings/types';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const accountState = useSelector((state: CombinedStore) => state.account);
  const settings = useSelector((state: CombinedStore) => state.settings);
  // const listState = useSelector((state: CombinedStore) => state.list.lists);
  const listState: Array<ListItemType> = [];

  /* TODO
  useEffect(() => {
    dispatch(ListActions.load());
  }, []); */

  const handleChangeLanguage = (language: LanguageCode) => {
    dispatch(SettingsActions.changeLanguage(language));
  };

  const handleChangeTheme = (mode: ThemeMode) => {
    dispatch(SettingsActions.changeThemeMode(mode));
  };

  const handleLogoutClick = () => {
    dispatch(AuthActions.logUserOut());
  };

  const handleRandomRecipe = () => {
    dispatch(RandomRecipeActions.randomRecipe(nav));
  };

  return (
    <NavBar
        account  = {accountState.item}
        settings = {settings}
        lists    = {listState}

        onChangeLanguage={handleChangeLanguage}
        onChangeTheme={handleChangeTheme}
        onLogoutClick={handleLogoutClick}
        onRandomRecipeClick={handleRandomRecipe} />
  );
};

export default Header;
