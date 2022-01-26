import GenericReducerType from './GenericReducerType';

type ItemReducerType<T> = {
  readonly item: T | undefined;
} & GenericReducerType;

export default ItemReducerType;
