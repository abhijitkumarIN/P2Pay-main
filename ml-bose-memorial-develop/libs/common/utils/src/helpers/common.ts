import { ColumnData, FormatProps, Row, ViewOptionFormattedType, ViewShapeType } from '@kleeen/types';
import { camelCase, upperFirst, words } from 'lodash';
import { isNil, pipe } from 'ramda';

import { isNilOrEmpty } from '../validators';
import mergeWith from 'lodash.mergewith';
import uniqueId from 'lodash.uniqueid';
import { v4 as uuid } from 'uuid';

export const generateId = (id?: string): string => id || uuid();

export const generateUniqueId = (str: string): string => uniqueId(str ? str : '');

export const average = (arr: number[]): number => arr.reduce((p, c) => p + c, 0) / arr.length;

export const isValidArray = (maybeArray: unknown): boolean =>
  Array.isArray(maybeArray) && maybeArray.length > 0;

export function getRowDisplayValue(row?: Row, entityName?: string): boolean | number | string | undefined {
  const value = row?.[`displayValue::${entityName}`];
  return value?.displayValue;
}

// TODO: these "any" should be changed for the correct type
export function mergeByOrAppend<T>(source: T[] = [], override: T[] = [], predicate: string): T[] {
  if (isNil(source)) return [];

  if (isNilOrEmpty(override)) return source;

  const appendedResults = override.reduce((acc: T[], overwriteObj) => {
    const isAppendResult = !source.some((sourceObj) => sourceObj[predicate] === overwriteObj[predicate]);

    if (isAppendResult) {
      acc.push(overwriteObj);
    }

    return acc;
  }, []);

  const mergedResults = mergeBy(source, override, predicate);

  return [...mergedResults, ...appendedResults];
}

export function overwriteFormat(backendFormat: unknown, attributeFormat: unknown): FormatProps | unknown {
  if (!isNilOrEmpty(backendFormat)) {
    return backendFormat;
  }

  if (!isNilOrEmpty(attributeFormat)) {
    return attributeFormat;
  }

  return {};
}

// FIXME: Add defensive validation if `JSON.parse` fails; if not, the app will crash.
/**
 * @deprecated Use jsonParse instead.
 */
export const parseStringifyToJson = ({
  value = null,
  defaultValue,
}: {
  value?: any;
  defaultValue: { name: string; id: number }[];
}): JSON => JSON.parse(value || JSON.stringify(defaultValue));

export function roleAccessKeyTag(stringToValidate: string): string {
  return stringToValidate
    .split('.')
    .map((key) => key.replace(/\s+/g, '').toUpperCase())
    .join('.');
}

export const upperCamelCase = (value = ''): string =>
  pipe<string, string, string>(camelCase, upperFirst)(value);

export const NEW_ROW_ID_PREFIX = 'temporary';
export const SHOW_DROPDOWN_THRESHOLD = 4;

export function formatViewOptions(viewOptions: ViewShapeType[]): ViewOptionFormattedType[] {
  return viewOptions.map((option, index) => {
    const { name = '', viewOrder, viewId = '' } = option;
    return {
      icon: viewId,
      key: viewId,
      label: name as string,
      option,
      value: name as string,
      viewOrder: isNilOrEmpty(viewOrder) ? index : viewOrder,
    };
  });
}

/**
 * upperFirst each word of a string.
 *
 * @param value The string to upperFirst
 * @example
 *
 * upperFirstWords(); //=> ''
 * upperFirstWords(''); //=> ''
 *
 * upperFirstWords('hello Kleeen'); //=> 'HelloKleeen'
 * upperFirstWords('hello + Kleeen'); //=> 'Hello+Kleeen'
 * upperFirstWords('hello - Kleeen'); //=> 'Hello-Kleeen'
 * upperFirstWords('HELLO Kleeen'); //=> 'HELLOKleeen'
 */
export const upperFirstWords = (value = ''): string => words(value, /[^ ]+/g).map(upperFirst).join('');

export const sortByViewOrder = ({ viewOrder: firstOrder = 0 }, { viewOrder: secondOrder = 0 }) =>
  Number(firstOrder) - Number(secondOrder);

export function sortByKeys<T>(
  viewOptions: T[],
  [firstKey, secondKey]: [fistKey: string, secondKey: string],
): T[] {
  const sortedViewsByOrder = viewOptions
    .filter((view) => !isNilOrEmpty(view[firstKey]))
    .sort((first, second) => {
      return first[firstKey] > second[firstKey] ? 1 : -1;
    });

  const sortedViewsById = viewOptions
    .filter((view) => isNilOrEmpty(view[firstKey]))
    .sort((first, second) => (first[secondKey] > second[secondKey] ? 1 : -1));

  return [...sortedViewsByOrder, ...sortedViewsById];
}

//#region Private Members

/** Lodash mergeByCustomizer, returns undefined to use the regular mergeBy function
 * @deprecated use the regular mergeBy function
 */
function mergeByCustomizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return [...srcValue];
  }
}

function mergeBy<T>(source: T[], override: T[], predicate: string): T[] {
  if (isNilOrEmpty(source)) {
    return [];
  }

  if (isNilOrEmpty(override)) {
    return source;
  }

  return source.map((sourceObj) => {
    const overrideObj = override.find(
      (possibleOverrideObj) => sourceObj[predicate] === possibleOverrideObj[predicate],
    );
    return overrideObj ? mergeWith({}, sourceObj, overrideObj, mergeByCustomizer) : sourceObj;
  });
}
//#endregion
