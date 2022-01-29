import { RecipeDispatch, RECIPES_STORE } from './types';
import { ACTION } from '../../common/store/ReduxHelper';

// eslint-disable-next-line import/prefer-default-export
export const softReset = () => (dispatch: RecipeDispatch) => {
  dispatch({ store: RECIPES_STORE, type: ACTION.SOFT_RESET });
};
