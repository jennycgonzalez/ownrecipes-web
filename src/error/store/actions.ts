import { CombinedStore } from '../../app/Store';
import { ACTION } from '../../common/store/ReduxHelper';
import { ErrorActionTypes, ErrorDispatch, ERROR_STORE } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setErrorAction = (store: string, type: ACTION.ERROR | ErrorActionTypes.SET_APP_ERROR, error: Error): any => ({
  store: store,
  type: type,
  data: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store: store,
    name: error.name,
    message: error.message,
    stack: error.stack,
    error: error,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setError = (store: string, error: Error): any => (dispatch: ErrorDispatch) => {
  dispatch(setErrorAction(ERROR_STORE , ErrorActionTypes.SET_APP_ERROR, error));
  dispatch(setErrorAction(store, ACTION.ERROR, error));
};

export function resetError() {
  return (dispatch: ErrorDispatch, getState: () => CombinedStore) => {
    dispatch({
      store: ERROR_STORE,
      type: ACTION.RESET,
    });

    const origin = getState().error?.store;
    if (origin != null) {
      dispatch({
        store: origin,
        type: ACTION.RESET,
      });
    }
  };
}
