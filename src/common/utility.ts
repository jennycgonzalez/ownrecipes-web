import * as _ from 'lodash';
import { IntlShape } from 'react-intl';
import { IMAGE_PLACEHOLDER } from './constants';

export function isDemoMode(): boolean {
  return process.env.REACT_APP_DEMO === 'demo';
}

export function getRecipeImage(photoThumbnail: string | undefined, loadingError = false) {
  return !loadingError ? (photoThumbnail ?? '') : IMAGE_PLACEHOLDER;
}

export function getResourcePath(path: string): string {
  return `${process.env.PUBLIC_URL}${path}`;
}

export function getEnvAsBoolean(key: string, ifNull = false): boolean {
  const val = process.env[key];
  if (val == null) return ifNull;
  const valLowerCase = val.toLocaleLowerCase();
  return ['true', 'yes', '1'].includes(valLowerCase);
}

export function isNumber(str: string): boolean {
  if (typeof str !== 'string') return false; // we only process strings!
  const strTimmed = str.trim();
  if (strTimmed.endsWith('.') || strTimmed.endsWith(',')) return false;
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(str as unknown as number) && !isNaN(parseFloat(str));
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
