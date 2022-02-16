import { Dispatch as ReduxDispatch } from 'redux';
import { ACTION, GenericReducerAction } from '../../common/store/ReduxHelper';

export const FILTER_STORE = '@@filter';

export interface IFilterDataAction {
  store: typeof FILTER_STORE;
  type:  typeof ACTION.GET_SUCCESS;
  filterName: string;
  qs:    string;
  res:   Array<unknown>;
}

export type FilterAction = IFilterDataAction | GenericReducerAction;
export type FilterDispatch = ReduxDispatch<FilterAction>;
export type FilterState = {
  courses:  any,
  cuisines: any,
  ratings:  any,
};
