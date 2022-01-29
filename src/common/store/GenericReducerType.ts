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
  pending: keyof typeof PendingState;
};

export default GenericReducerType;
