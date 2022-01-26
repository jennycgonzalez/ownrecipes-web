import { ACTION } from '../../common/store/ReduxHelper';
import { ErrorAction, ErrorActionTypes, ErrorState } from './types';

const defaultState = null;

const reducer = (state = defaultState, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case ErrorActionTypes.SET_APP_ERROR:
      {
        const newState: ErrorState = {
          store: action.store,

          name: action.data.name,
          message: action.data.message,
          stack: action.data.stack,

          error: action.data,
        };
        return newState;
      }
    case ACTION.RESET: return defaultState;
    default: return state;
  }
};

export default reducer;
