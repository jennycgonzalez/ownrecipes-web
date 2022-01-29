import * as _ from 'lodash';

export function isDemoMode(): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (process.env.NODE_ENV as any) === 'demo';
}

export function getResourcePath(path: string): string {
  return `${process.env.PUBLIC_URL}${path}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateFormData(prev: any, id: string, newValue: unknown): any {
  const updFormData = _.cloneDeep(prev);
  _.set(updFormData, id, newValue);
  return updFormData;
}
