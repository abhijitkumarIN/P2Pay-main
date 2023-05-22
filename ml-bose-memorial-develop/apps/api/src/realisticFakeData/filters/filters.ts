import {
  FakeDataAttribute,
  FakeDataEntity,
  FakeDataValue,
  FilterCombinator,
  FilterOperation,
  FilterQuery,
  FilterRule,
  FilterRuleValue,
  IntervalDate,
  Maybe,
  PrimitiveType,
} from '@kleeen/types';
import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';

import camelCase from 'lodash.camelcase';
import { getThingByName } from '@kleeen/things';
import { isNilOrEmpty } from '@kleeen/common/utils';

export enum FakeDataSource {
  ListingData,
  VisualizationData,
}

interface FilterListProps {
  entityName: string;
  fakeDataSource: FakeDataSource;
  filters: Maybe<FilterQuery>;
  list: FakeDataEntity[];
}

export function filterList({ entityName, fakeDataSource, filters, list }: FilterListProps): FakeDataEntity[] {
  if (isNilOrEmpty(filters) || isNilOrEmpty(filters?.rules)) return list;

  const filteredList = list.filter((entity) => {
    const filtersThatMatched = filters.rules.map((rule) => {
      return validateFilter({ entityName, entity, fakeDataSource, rule });
    });

    if (filters.combinator === FilterCombinator.AND) {
      return filtersThatMatched.every((didItMatch) => didItMatch);
    }

    if (filters.combinator === FilterCombinator.OR) {
      return filtersThatMatched.some((didItMatch) => didItMatch);
    }
  });

  if (isNilOrEmpty(filteredList)) return list;

  return filteredList;
}

//#region Private members
function areValuesInvalidForNumberCoercion(
  firstNumber: Maybe<PrimitiveType>,
  secondNumber: Maybe<PrimitiveType>,
): boolean {
  const isFirstNumberInvalid = Array.isArray(firstNumber) || isNilOrEmpty(firstNumber);
  const isSecondNumberInvalid = Array.isArray(secondNumber) || isNilOrEmpty(secondNumber);

  return isFirstNumberInvalid || isSecondNumberInvalid;
}

interface ValidateFilter {
  entity: FakeDataEntity;
  entityName: string;
  fakeDataSource: FakeDataSource;
  rule: FilterRule;
}

function getAttributeToFilterBy({
  entity,
  entityName,
  fakeDataSource,
  rule,
}: ValidateFilter): FakeDataValue | null {
  if (rule.field !== entityName) {
    return entity[rule.field];
  } else {
    if (fakeDataSource === FakeDataSource.ListingData) {
      return entity[`displayValue::${rule.field}`];
    } else if (fakeDataSource === FakeDataSource.VisualizationData) {
      return entity;
    }
  }
  return null;
}

function validateFilter({ entity, entityName, fakeDataSource, rule }: ValidateFilter): boolean {
  if (isNilOrEmpty(entity) || isNilOrEmpty(rule.value) || isNilOrEmpty(rule.operation)) return true;

  const attributeToFilter = getAttributeToFilterBy({ entity, entityName, fakeDataSource, rule });

  if (isNilOrEmpty(attributeToFilter)) return true;

  const thing = getThingByName(camelCase(entityName));
  const attribute = thing?.attributes?.find((attr) => attr.name === rule.field);

  if (attribute?.hasMany) return true;

  switch (rule.operation) {
    case FilterOperation.Is:
      return validateSingleIsOperation({
        entity: attributeToFilter as FakeDataAttribute,
        ruleValue: rule.value,
      });
    case FilterOperation.GreaterOrEqualThan:
      return validateSingleGreaterOrEqualThanOperation({
        entity: attributeToFilter as FakeDataAttribute,
        ruleValue: rule.value,
      });
    case FilterOperation.LessOrEqualThan:
      return validateSingleLessOrEqualThanOperation({
        entity: attributeToFilter as FakeDataAttribute,
        ruleValue: rule.value,
      });
    case FilterOperation.RelativeDate:
      return validateSingleRelativeDate({
        entity: attributeToFilter as FakeDataAttribute,
        ruleValue: rule.value,
      });
    default:
      return true;
  }
}

interface SingleOperation {
  entity: FakeDataAttribute;
  ruleValue: FilterRuleValue;
}

function validateSingleIsOperation({ entity, ruleValue }: SingleOperation): boolean {
  if (Array.isArray(ruleValue)) {
    return ruleValue.some(({ displayValue, id }) => {
      const ruleHasDisplayValue = !isNilOrEmpty(displayValue);
      const ruleHasId = !isNilOrEmpty(id);
      const displayValueMatches = ruleHasDisplayValue && entity.displayValue === displayValue;
      const idMatches = ruleHasId && entity.id === id;
      return displayValueMatches || idMatches;
    });
  }

  const ruleHasDisplayValue = !isNilOrEmpty(ruleValue.displayValue);
  const ruleHasId = !isNilOrEmpty(ruleValue.id);
  const displayValueMatches = ruleHasDisplayValue && entity.displayValue === ruleValue.displayValue;
  const idMatches = ruleHasId && entity.id === ruleValue.id;
  return displayValueMatches || idMatches;
}

function validateSingleGreaterOrEqualThanOperation({ entity, ruleValue }: SingleOperation): boolean {
  if (Array.isArray(ruleValue) || isNilOrEmpty(ruleValue)) return false;

  if (areValuesInvalidForNumberCoercion(entity?.displayValue, ruleValue?.displayValue)) return false;

  return Number(entity.displayValue) >= Number(ruleValue.displayValue);
}

function validateSingleLessOrEqualThanOperation({ entity, ruleValue }: SingleOperation): boolean {
  if (Array.isArray(ruleValue) || isNilOrEmpty(ruleValue)) return false;
  if (areValuesInvalidForNumberCoercion(entity?.displayValue, ruleValue?.displayValue)) return false;

  return Number(entity.displayValue) <= Number(ruleValue.displayValue);
}

const validIntervalDates = [
  IntervalDate.allTime,
  IntervalDate.minute,
  IntervalDate.oneHours,
  IntervalDate.oneMonth,
  IntervalDate.oneWeek,
  IntervalDate.sixHours,
  IntervalDate.threeMonth,
  IntervalDate.twentyFourHours,
];

function validateSingleRelativeDate({ entity, ruleValue }: SingleOperation): boolean {
  if (Array.isArray(ruleValue) || isNilOrEmpty(ruleValue)) return false;

  const filterValue = ruleValue.displayValue;
  const isAllTime = filterValue === IntervalDate.allTime;

  if (isAllTime) return true;

  if (typeof filterValue !== 'string') return false;

  if (!validIntervalDates.includes(filterValue as IntervalDate)) return false;

  const now = moment(Date.now());
  const [amount, unit] = filterValue.split(',');
  const from = now.subtract(amount as DurationInputArg1, unit as DurationInputArg2);

  return moment.utc(from).isSameOrBefore(moment(Number(entity.displayValue)));
}
//#endregion
