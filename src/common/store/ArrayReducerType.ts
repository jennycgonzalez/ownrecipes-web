import GenericReducerType from './GenericReducerType';

type ArrayReducerType<T> = {
  items: Array<T> | undefined;
} & GenericReducerType;

export default ArrayReducerType;
