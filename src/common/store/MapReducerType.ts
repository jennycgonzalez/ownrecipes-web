import GenericReducerType from './GenericReducerType';

type MapReducerType<T> = {
  items: Map<string, T> | undefined;
} & GenericReducerType;

export default MapReducerType;
