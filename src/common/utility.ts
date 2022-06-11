import * as _ from 'lodash';
import { IntlShape } from 'react-intl';
import { IMAGE_PLACEHOLDER } from './constants';

export function isDemoMode(): boolean {
  return getEnv('REACT_APP_DEMO') === 'demo';
}

export function getRecipeImage(photoThumbnail: string | undefined, loadingError = false) {
  return !loadingError ? (photoThumbnail ?? '') : IMAGE_PLACEHOLDER;
}

export function getResourcePath(path: string): string {
  return `${process.env.PUBLIC_URL}${path}`;
}

export function getEnv(env: string, ifNull?: string): string | undefined {
  return process.env[env] ?? ifNull;
}

export function getEnvAsBoolean(env: string, ifNull = false): boolean {
  const val = getEnv(env);
  if (val == null) return ifNull;
  const valLowerCase = val.toLocaleLowerCase();
  return ['true', 'yes', '1'].includes(valLowerCase);
}

export function requireEnv(env: string): string {
  const val = getEnv(env);
  if (val == null || val.length === 0) {
    throw new Error(`Invalid setup: The .env-variable "${env}" is missing. Please check your .env-files and rebuild.`);
  }
  return val;
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

export function sortByLabel(a: { label: string }, b: { label: string}): number {
  return a.label.localeCompare(b.label);
}
