import GenericReducerType from './GenericReducerType';

type ItemReducerType<T> = {
  item: T | undefined;
  dirty: boolean;
} & GenericReducerType;

export default ItemReducerType;
