import { AnyAction } from 'redux';
import ArrayReducerType from './ArrayReducerType';

import GenericReducerType from './GenericReducerType';
import ItemReducerType from './ItemReducerType';

export enum ACTION {
  ERROR = 'ERROR',

  RESET = 'RESET',
}

export type GenericErrorAction = {
  store: string;
  type:  typeof ACTION.ERROR;
  data?: Error | undefined;
}

export type GenericResetAction = {
  store: string;
  type:  typeof ACTION.RESET;
}

export type GenericReducerAction = GenericErrorAction | GenericResetAction;

export default class ReduxHelper {
  static getItemReducerDefaultState = <T>(ident: string): ItemReducerType<T> => {
    const newState: ItemReducerType<T> = {
      ident: ident,

      item: undefined,

      error: undefined,
    };

    return newState;
  };

  static getArrayReducerDefaultState = <T>(ident: string): ArrayReducerType<T> => {
    const newState: ArrayReducerType<T> = {
      ident: ident,

      items: undefined,

      error: undefined,
    };

    return newState;
  };

  static setError = <T extends GenericReducerType>(state: T, error: Error | undefined): T => {
    const newState = { ...state };

    newState.error = error;

    return newState;
  };

  static setItem = <T>(state: T, item: unknown | undefined): T => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newState = { ...state } as any;

    newState.error = undefined;

    newState.item  = item;

    return newState;
  };

  static caseDefaultReducer = <T extends GenericReducerType>(state: T, action: AnyAction, defaultState: T): T => {
    if (state.ident !== action.store) {
      return state;
    }

    switch (action.type) {
      case ACTION.ERROR: return ReduxHelper.setError(state, action.data);

      case ACTION.RESET: return defaultState;

      default: return state;
    }
  };
}
