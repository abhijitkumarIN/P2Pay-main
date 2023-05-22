/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import {
  FilterOperation,
  FilterOperators,
  FilterQuery,
  FilterRule,
  Maybe,
  PrimitiveType,
  SingleFilterRuleValue,
} from '@kleeen/types';

import { upperCamelCase } from '../helpers';

interface Attribute {
  dataType?: string;
  name: string;
}

/** @deprecated Use this method to keep backward compatibility with filters generated before 10-2021, migrate to new filters version
 *
 * This method transform an object with filters generated after 10-2021 to filters with the shape of the previous version.
 *
 * @func transformFiltersToDeprecatedVersion
 * @param {DataListingArgs} input An object with a filters attribute to be transformed
 * @return {Filters} An object with filters using the previous shape
 *
 * * @see {@link http://LINK_TO_KLEEEN_DOCUMENTATION}
 */
export function transformFiltersToDeprecatedVersion(input: {
  attributes?: Attribute[];
  filters?: FilterQuery;
}): Maybe<Record<string, unknown>> {
  if (!input?.filters?.rules) return;

  const { attributes, filters } = input;
  const filtersInDeprecatedShape = {};

  const groupedRules = groupRulesByField(filters.rules);

  groupedRules.forEach((rule) => {
    const key = getDataType(rule, attributes);
    filtersInDeprecatedShape[key] = getFieldEntry(rule, filtersInDeprecatedShape[key]);
  });

  return filtersInDeprecatedShape;
}

//#region private methods

/**
 * Transform a rule to the previous version shape,
 * If the filter exists, tries to merge it with the corresponding transformation; for example,
 * now a timestamp rule date <= X and date >= Y has to become to:
 * date: { from: X, to: Y }
 *
 *
 * @param {FilterRule} rule to be transformed
 * @param {Record<string, unknown>} filter current filter if was previously transformed to compose accumulative changes
 * @returns {Record<string, unknown>} new filter transformed or composed from previous state
 */
function getFieldEntry(
  rule: FilterRule,
  filter: Record<string, unknown>,
): Record<string, unknown> | PrimitiveType | undefined {
  const values = Array.isArray(rule.value) ? rule.value : [rule.value];
  const [singleValue] = values;

  const getValue = (entity?: SingleFilterRuleValue) => {
    if (!entity) {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(entity, 'displayValue')) {
      return entity.displayValue;
    }
    if (Object.prototype.hasOwnProperty.call(entity, 'id')) {
      return entity.id;
    }
  };

  switch (rule.operation) {
    case FilterOperation.GreaterOrEqualThan:
      if (filter && Object.prototype.hasOwnProperty.call(filter, FilterOperators.min)) {
        return {
          [FilterOperators.from]: getValue(singleValue),
          [FilterOperators.to]: filter.min,
        };
      }

      return {
        [FilterOperators.min]: getValue(singleValue),
      };

    case FilterOperation.Is:
      if (manageAsSingleAttribute(rule)) {
        return singleValue.id;
      }

      return {
        [FilterOperators.in]: values.map(getValue),
      };

    case FilterOperation.LessOrEqualThan:
      if (filter && Object.prototype.hasOwnProperty.call(filter, FilterOperators.max)) {
        return {
          [FilterOperators.from]: filter.max,
          [FilterOperators.to]: getValue(singleValue),
        };
      }

      return {
        [FilterOperators.max]: getValue(singleValue),
      };

    case FilterOperation.RelativeDate:
      return {
        [FilterOperators.relativeDate]: getValue(singleValue),
      };

    default:
      throw new Error(`the rule operation ${rule.operation} is not supported.`);
  }
}

/**
 * Tries to get the data type from the array of attributes,
 * if not found returns the field name capitalized as a fallback
 *
 * @param {string} fieldName to be search in the attributes list
 * @param attributes possible list of attributes to find the data type
 * @returns {string} data type id used as a filter key
 */
function getDataType(rule: FilterRule, attributes?: Attribute[]): string {
  const fieldName = rule.field;
  const attribute = attributes?.find((a) => a.name === fieldName);

  if (!attribute?.dataType) {
    console.warn(`the field ${fieldName} was not found.`);

    if (manageAsSingleAttribute(rule)) {
      return fieldName;
    }

    return upperCamelCase(fieldName);
  }

  return attribute.dataType;
}

/**
 * Verifies how to transform a rule,
 * one option is as a single value or as a complex object
 *
 * Example for a single value
 * Input :
 * {
 *   "field": "door",
 *   "operation": "=",
 *   "value": {
 *      "id": "25002565-c51b-4c90-b5e5-77d0941f483a"
 *   }
 *  }
 *
 * Output:
 * {
 *  "door": "4abd7d1b-5187-4a1d-bf63-e7a5daaaf226"
 * }
 *
 *
 * Example for a complex value
 * Input :
 * {
 *     "field": "alarmType",
 *     "operation": "=",
 *     "value": [
 *       {
 *         "displayValue": "DFO"
 *       },
 *       {
 *         "displayValue": "DHO"
 *       }
 *     ]
 *   }
 *
 *
 * "AlarmType": {
 *   "_in": [
 *     "DFO",
 *     "DHO"
 *   ]
 * }
 *
 * @param {FilterRule} rule to be transformed
 * @returns true if the transformation has to be as a single value, otherwise as a complex object
 */
function manageAsSingleAttribute(rule: FilterRule): boolean {
  const isSingleValue = !Array.isArray(rule.value);

  if (isSingleValue && Object.prototype.hasOwnProperty.call(rule.value, 'id')) {
    return true;
  }

  return false;
}

/**
 * Simplifies a set of rules by grouping them by field and making the value an array
 * when there are multiple rules of the same field
 *
 * Example
 *
 * [
  {
    field: 'alarmType',
    value: {
      displayValue: 'DFO',
    },
  }
  {
    field: 'alarmType',
    value: {
      displayValue: 'DHO',
    },
  }
  {
    field: 'door',
    value: {
      id: '4abd7d1b-5187-4a1d-bf63-e7a5daaaf226',
    },
  }
]

=>

[
  {
    field: 'alarmType',
    value: [
      {
        displayValue: 'DFO',
      },
      {
        displayValue: 'DHO',
      },
    ]
  },
  {
    field: 'player',
    value: {
      id: '4abd7d1b-5187-4a1d-bf63-e7a5daaaf226',
    },
  }
]
 * @param rules Source rules that can contain repeated fields
 * @returns The same rules but grouped by field
 */
function groupRulesByField(rules: FilterRule[]): FilterRule[] {
  const groupedRulesMap = rules.reduce((acc, rule) => {
    const currentRule = acc[rule.field];
    if (currentRule) {
      if (!Array.isArray(currentRule.value)) {
        const value = [
          {
            ...currentRule.value,
          },
          {
            ...rule.value,
          },
        ];

        acc[rule.field] = {
          ...rule,
          value,
        };

        return acc;
      } else {
        acc[rule.field] = {
          ...rule,
          value: [...currentRule, rule.value],
        };

        return acc;
      }
    }

    acc[rule.field] = rule;
    return acc;
  }, {});

  return Object.values(groupedRulesMap);
}

//#endregion private methods
