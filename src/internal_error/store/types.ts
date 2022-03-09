import { Dispatch as ReduxDispatch } from 'redux';
import { ACTION, GenericResetAction } from '../../common/store/ReduxHelper';

export type InternalError = {
  /** Store-Ident */
  store: string;

  name:    string;
  message: string;
  stack?:  string;

  url?: string;
  method?: string;
  data?: string;
  response?: unknown;

  error: Error;
}

export const INTERNAL_ERROR_STORE = '@@INTERNAL_ERROR_STORE';

interface IInternalErrorSetAction {
  store: typeof INTERNAL_ERROR_STORE;
  type:  ACTION.ERROR;
  data:  InternalError;
}

export type InternalErrorAction = IInternalErrorSetAction | GenericResetAction;
export type InternalErrorDispatch = ReduxDispatch<InternalErrorAction>;
export type InternalErrorState = {
  readonly item: InternalError | undefined;
};
