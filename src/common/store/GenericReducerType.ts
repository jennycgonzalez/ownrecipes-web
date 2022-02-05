export enum PendingState {
  INITIAL   = 'INITIAL',
  LOADING   = 'LOADING',
  SAVING    = 'SAVING',
  DELETING  = 'DELETING',
  COMPLETED = 'COMPLETED',
  ABORTED   = 'ABORTED',
}

type GenericReducerType = {
  readonly ident: string;

  error: Error | undefined;
  pending: PendingState;

  hasConnection: boolean;
};

export default GenericReducerType;
