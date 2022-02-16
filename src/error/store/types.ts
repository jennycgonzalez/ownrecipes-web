import { Dispatch as ReduxDispatch } from 'redux';
import { GenericReducerAction } from '../../common/store/ReduxHelper';

export type IError = {
  store:   string;
  name:    string;
  message: string;
  stack?:  string;
  error:   Error;
}

export const ERROR_STORE = '@@error';

export enum ErrorActionTypes {
  SET_APP_ERROR = '@@error/SET_APP_ERROR',
}

interface IErrorDataAction {
  store: string; // Any store can throw an error
  type:  typeof ErrorActionTypes.SET_APP_ERROR;
  data:  IError;
}

export type ErrorState = IError | null;
export type ErrorAction = IErrorDataAction | GenericReducerAction;
export type ErrorDispatch = ReduxDispatch<ErrorAction>;
