import { FilterRule, SingleFilterRuleValue } from '@kleeen/types';
import { isNilOrEmpty, isNotNilOrEmpty } from '@kleeen/common/utils';

export function isFilterIdOnly(filterRule: FilterRule): boolean {
  const singleValueRule = filterRule.value as SingleFilterRuleValue;

  return isNotNilOrEmpty(singleValueRule.id) && isNilOrEmpty(singleValueRule.displayValue);
}
