import GenericReducerType from './GenericReducerType';

type MapReducerType<T> = {
  items: Record<string, T> | undefined;
} & GenericReducerType;

export default MapReducerType;
