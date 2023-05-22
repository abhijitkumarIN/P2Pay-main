import { path } from 'ramda';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function getOwnerFromContext(context: Record<string, string>): string {
  const owner = getValueFromContext(context, ['user', 'cognito:id']);

  if (isNilOrEmpty(owner)) throw new Error('Owner can not be null.');

  return owner;
}

export function getTokenFromContext(context: Record<string, string>): string {
  const token = getValueFromContext(context, ['token']);

  if (isNilOrEmpty(token)) throw new Error('Token can not be null.');

  return token;
}

//#region Private methods
function getValueFromContext(context: Record<string, string>, entryPath: string[]): string | undefined {
  if (isNilOrEmpty(context)) throw new Error('The context is not valid.');

  return path(entryPath, context);
}
//#endregion
