import { Dispatch as ReduxDispatch } from 'redux';
import ArrayReducerType from '../../common/store/ArrayReducerType';
import { ACTION, GenericArrayReducerAction } from '../../common/store/ReduxHelper';
import { RecipeList } from '../../recipe/store/RecipeTypes';

export const MINI_BROWSE_STORE = '@@browserMini';

export interface IMiniBrowseDataAction {
  store: typeof MINI_BROWSE_STORE;
  type:  typeof ACTION.GET_SUCCESS;
  data:  Array<RecipeList>;
}

export type MiniBrowseState    = ArrayReducerType<RecipeList>;
export type MiniBrowseAction   = IMiniBrowseDataAction | GenericArrayReducerAction;
export type MiniBrowseDispatch = ReduxDispatch<MiniBrowseAction>;
