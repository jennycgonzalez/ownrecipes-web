import { AnyAction } from 'redux';
import * as _ from 'lodash';

import GenericReducerType, { PendingState } from './GenericReducerType';
import ArrayReducerType from './ArrayReducerType';
import ItemReducerType from './ItemReducerType';
import MapReducerType from './MapReducerType';

export enum ACTION {
  CREATE_START   = 'CREATE_START',
  CREATE_SUCCESS = 'CREATE_SUCCESS',

  DELETE_START   = 'DELETE_START',
  DELETE_SUCCESS = 'DELETE_SUCCESS',

  GET_START   = 'GET_START',
  GET_SUCCESS = 'GET_SUCCESS',

  LOADING = 'LOADING',
  ERROR   = 'ERROR',

  RESET      = 'RESET',
  SOFT_RESET = 'SOFT_RESET',

  NO_CONNECTION = 'NO_CONNECTION',
}

export type CreateStartAction = {
  store: string;
  type:  typeof ACTION.CREATE_START;
}

export type DeleteStartAction = {
  store: string;
  type:  typeof ACTION.DELETE_START;
}

export type GenericErrorAction = {
  store: string;
  type:  typeof ACTION.ERROR;
  data?: Error | undefined;
}

export type GetStartAction = {
  store: string;
  type:  typeof ACTION.GET_START;
}

export type GenericLoadingAction = {
  store: string;
  type:  typeof ACTION.LOADING;
}

export type GenericNoConnectionAction = {
  store: string;
  type:  typeof ACTION.NO_CONNECTION;
}

export type GenericResetAction = {
  store: string;
  type:  typeof ACTION.RESET;
}

export type GenericSoftResetAction = {
  store: string;
  type:  typeof ACTION.SOFT_RESET;
}

export type GenericReducerAction      = GenericErrorAction | GenericLoadingAction | GenericNoConnectionAction | GenericResetAction | GenericSoftResetAction;
export type GenericItemReducerAction  = GetStartAction | CreateStartAction | DeleteStartAction | GenericReducerAction;
export type GenericArrayReducerAction = GetStartAction | GenericReducerAction;
export type GenericMapReducerAction   = GetStartAction | GenericReducerAction;

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
      hasConnection: true,
    };

    return newState;
  };

  static getArrayReducerDefaultState = <T>(ident: string): ArrayReducerType<T> => {
    const newState: ArrayReducerType<T> = {
      ident: ident,

      items: undefined,

      error: undefined,
      pending: PendingState.INITIAL,
      hasConnection: true,
    };

    return newState;
  };

  static getMapReducerDefaultState = <T>(ident: string): MapReducerType<T> => {
    const newState: MapReducerType<T> = {
      ident: ident,

      items: undefined,

      error: undefined,
      pending: PendingState.INITIAL,
      hasConnection: true,
    };

    return newState;
  };

  static setError = <T extends GenericReducerType>(state: T, error: Error | undefined): T => {
    const newState = { ...state };

    newState.error   = error;
    newState.pending = PendingState.ABORTED;
    newState.hasConnection = true;

    return newState;
  };

  static setPending = <T extends GenericReducerType>(state: T, pending: PendingState): T => {
    const newState = { ...state };

    newState.error   = undefined;
    newState.pending = pending;

    return newState;
  };

  static setItem = <T>(state: T, item: unknown | undefined): T => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newState = { ...state } as any;

    newState.error   = undefined;
    newState.pending = PendingState.COMPLETED;
    newState.hasConnection = true;

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
    updState.hasConnection = true;
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
    updState.hasConnection = true;
    updState.items = updMap;
    return updState;
  }

  static setSoftReset = <T>(state: T): T => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newState = { ...state } as any;

    newState.error = undefined;
    newState.pending = PendingState.INITIAL;
    newState.hasConnection = true;

    return newState;
  };

  static setNoConnection = <T>(state: T): T => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newState = { ...state } as any;

    newState.error = undefined;
    newState.pending = PendingState.INITIAL;
    newState.hasConnection = false;

    return newState;
  };

  static caseItemDefaultReducer = <T>(state: ItemReducerType<T>, action: AnyAction, defaultState: ItemReducerType<T>): ItemReducerType<T> => {
    if (state.ident !== action.store) {
      return ReduxHelper.caseDefaultReducer(state, action, defaultState);
    }

    switch (action.type) {
      case ACTION.CREATE_START:
        return ReduxHelper.setPending(state, PendingState.SAVING);
      case ACTION.DELETE_START:
        return ReduxHelper.setPending(state, PendingState.DELETING);
      case ACTION.GET_START:
        return ReduxHelper.setPending(state, PendingState.LOADING);
      default:
        return ReduxHelper.caseDefaultReducer(state, action, defaultState);
    }
  };

  static caseArrayDefaultReducer = <T>(state: ArrayReducerType<T>, action: AnyAction, defaultState: ArrayReducerType<T>, itemStoreIdent?: string): ArrayReducerType<T> => {
    if (itemStoreIdent === action.store) {
      switch (action.type) {
        case ACTION.GET_SUCCESS:
          {
            if (action.data == null) return state;

            const updState = { ...state };
            const updItems = state.items != null ? [...state.items] : [];
            updItems.push(action.data);
            updState.items = updItems;
            return updState;
          }
        case ACTION.DELETE_SUCCESS:
          {
            if (action.data == null || state.items == null) return state;

            const updState = { ...state };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updItems = [...state.items].filter((item: any) => item.id === action.data);
            if (updItems.length < state.items.length) {
              updState.items = updItems;
              return updState;
            } else {
              return state;
            }
          }
        default: ReduxHelper.caseDefaultReducer(state, action, defaultState);
      }
    }

    if (state.ident !== action.store) {
      return ReduxHelper.caseDefaultReducer(state, action, defaultState);
    }

    switch (action.type) {
      case ACTION.GET_START:
        return ReduxHelper.setPending(state, PendingState.LOADING);
      case ACTION.GET_SUCCESS:
        {
          if (action.data == null) return state;

          const updState = { ...state };
          updState.items = action.data;
          return updState;
        }
      default:
        return ReduxHelper.caseDefaultReducer(state, action, defaultState);
    }
  };

  static caseMapDefaultReducer = <T>(state: MapReducerType<T>, action: AnyAction, defaultState: MapReducerType<T>, itemStoreIdent?: string): MapReducerType<T> => {
    if (itemStoreIdent === action.store) {
      switch (action.type) {
        case ACTION.GET_SUCCESS:
          {
            if (action.data == null) return state;

            const updState = { ...state };
            const updItems = state.items != null ? new Map(state.items) : new Map();
            updItems.set(action.data.id, action.data);
            updState.items = updItems;
            return updState;
          }
        case ACTION.DELETE_SUCCESS:
          {
            if (action.data == null || state.items == null) return state;

            const updState = { ...state };
            const updItems = new Map(state.items);
            if (updItems.delete(action.data)) {
              updState.items = updItems;
              return updState;
            } else {
              return state;
            }
          }
        default: ReduxHelper.caseDefaultReducer(state, action, defaultState);
      }
    }

    if (state.ident !== action.store) {
      return ReduxHelper.caseDefaultReducer(state, action, defaultState);
    }

    switch (action.type) {
      case ACTION.GET_START:
        return ReduxHelper.setPending(state, PendingState.LOADING);
      default:
        return ReduxHelper.caseDefaultReducer(state, action, defaultState);
    }
  };

  static caseDefaultReducer = <T extends GenericReducerType>(state: T, action: AnyAction, defaultState: T): T => {
    if (state.ident !== action.store) {
      return state;
    }

    switch (action.type) {
      case ACTION.LOADING:       return ReduxHelper.setPending(state, PendingState.LOADING);

      case ACTION.ERROR:         return ReduxHelper.setError(state, action.data);

      case ACTION.RESET:         return defaultState;
      case ACTION.SOFT_RESET:    return ReduxHelper.setSoftReset(state);

      case ACTION.NO_CONNECTION: return ReduxHelper.setNoConnection(state);

      default: return state;
    }
  };
}
