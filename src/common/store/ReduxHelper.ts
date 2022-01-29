import { AnyAction } from 'redux';
import * as _ from 'lodash';

import GenericReducerType, { PendingState } from './GenericReducerType';
import ArrayReducerType from './ArrayReducerType';
import ItemReducerType from './ItemReducerType';
import MapReducerType from './MapReducerType';

export enum ACTION {
  ERROR = 'ERROR',

  RESET = 'RESET',
  SOFT_RESET = 'SOFT_RESET',
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

export type GenericSoftResetAction = {
  store: string;
  type:  typeof ACTION.SOFT_RESET;
}

export type GenericReducerAction = GenericErrorAction | GenericResetAction | GenericSoftResetAction;

export default class ReduxHelper {
  static transformEntities<TDto, TEntity>(arr: Array<TDto>, toEntity: (dto: TDto) => TEntity): Array<TEntity> {
    return arr.map(it => toEntity(it));
  }

  static getItemReducerDefaultState = <T>(ident: string): ItemReducerType<T> => {
    const newState: ItemReducerType<T> = {
      ident: ident,

      item: undefined,

      error: undefined,
      pending: PendingState.INITIAL,
    };

    return newState;
  };

  static getArrayReducerDefaultState = <T>(ident: string): ArrayReducerType<T> => {
    const newState: ArrayReducerType<T> = {
      ident: ident,

      items: undefined,

      error: undefined,
      pending: PendingState.INITIAL,
    };

    return newState;
  };

  static getMapReducerDefaultState = <T>(ident: string): MapReducerType<T> => {
    const newState: MapReducerType<T> = {
      ident: ident,

      items: undefined,

      error: undefined,
      pending: PendingState.INITIAL,
    };

    return newState;
  };

  static setError = <T extends GenericReducerType>(state: T, error: Error | undefined): T => {
    const newState = { ...state };

    newState.error = error;
    newState.pending = PendingState.ABORTED;

    return newState;
  };

  static setItem = <T>(state: T, item: unknown | undefined): T => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newState = { ...state } as any;

    newState.error = undefined;
    newState.pending = PendingState.COMPLETED;

    newState.item  = item;

    return newState;
  };

  static setMapItem<T>(state: MapReducerType<T>, id: string, item: T): MapReducerType<T> {
    const updState = _.clone(state);
    const map = updState.items;
    const updMap = map ? _.clone(map) : new Map();

    updMap.set(id, item);

    updState.error = undefined;
    updState.pending = PendingState.COMPLETED;
    updState.items = updMap;
    return updState;
  }

  static deleteMapItem<T>(state: MapReducerType<T>, id: string): MapReducerType<T> {
    const updState = _.clone(state);
    const map = updState.items;
    const updMap = map ? _.clone(map) : new Map();

    updMap.delete(id);
    updState.error = undefined;
    updState.pending = PendingState.COMPLETED;
    updState.items = updMap;
    return updState;
  }

  static setSoftReset = <T>(state: T): T => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newState = { ...state } as any;

    newState.error = undefined;
    newState.pending = PendingState.INITIAL;

    return newState;
  };

  static caseDefaultReducer = <T extends GenericReducerType>(state: T, action: AnyAction, defaultState: T): T => {
    if (state.ident !== action.store) {
      return state;
    }

    switch (action.type) {
      case ACTION.ERROR: return ReduxHelper.setError(state, action.data);

      case ACTION.RESET: return defaultState;
      case ACTION.SOFT_RESET: return ReduxHelper.setSoftReset(state);

      default: return state;
    }
  };
}
