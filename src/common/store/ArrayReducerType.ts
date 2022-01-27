import GenericReducerType from './GenericReducerType';

type ArrayReducerType<T> = {
  readonly items: Array<T> | undefined;
} & GenericReducerType;

export default ArrayReducerType;
