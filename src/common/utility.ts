import * as _ from 'lodash';
import { IntlShape } from 'react-intl';

export function isDemoMode(): boolean {
  return process.env.REACT_APP_DEMO === 'demo';
}

export function getRecipeImage(photoThumbnail: string | undefined, loadingError = false) {
  return !loadingError ? (photoThumbnail ?? '') : '/images/fried-eggs.jpg';
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

export function optionallyFormatMessage(intl: IntlShape, baseMessageId: string, msgId: string, values?: Record<string, React.ReactNode>): string {
  const fullMsgId = `${baseMessageId}${msgId}`;
  const msg = intl.messages[fullMsgId];

  if (msg == null) {
    return msgId;
  } else if (msg.length === 0) {
    return '';
  } else {
    // HACK: Ignore locales generator.
    return (intl as IntlShape).formatMessage({ id: fullMsgId }, values) as string;
  }
}
