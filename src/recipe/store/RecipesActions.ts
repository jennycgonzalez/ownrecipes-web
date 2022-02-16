import { RecipesDispatch, RECIPES_STORE } from './RecipesTypes';
import { ACTION } from '../../common/store/ReduxHelper';

// eslint-disable-next-line import/prefer-default-export
export const softReset = () => (dispatch: RecipesDispatch) => {
  dispatch({ store: RECIPES_STORE, type: ACTION.SOFT_RESET });
};
