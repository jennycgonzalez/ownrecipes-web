import * as _ from 'lodash';
import { IntlShape } from 'react-intl';

export function isDemoMode(): boolean {
  return process.env.REACT_APP_DEMO === 'demo';
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

export function optionallyFormatMessage(intl: IntlShape, baseMessageId: string, value: string, values?: Record<string, React.ReactNode>): string {
  const msgId = `${baseMessageId}${value}`;
  const msg = intl.messages[msgId];

  if (msg == null) {
    return value;
  } else if (msg.length === 0) {
    return '';
  } else {
    // HACK: Ignore locales generator.
    return (intl as IntlShape).formatMessage({ id: msgId }, values) as string;
  }
}
