import GenericReducerType from './GenericReducerType';

type ItemReducerType<T> = {
  item: T | undefined;
  error: Error | undefined;
} & GenericReducerType;

export default ItemReducerType;
