import { ValidationResult } from './Validation';

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

  error:      Error | undefined;
  validation: ValidationResult | undefined;
  pending:    PendingState;

  hasConnection: boolean;
};

export default GenericReducerType;
