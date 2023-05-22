import { ElementInputType, FilterOperation, StatisticalDataType } from '@kleeen/types';

import { GetFilterElementProps } from './elements.model';
import { getThingByName } from '@kleeen/things';
import { resolveBestSdtMatch } from '@kleeen/frontend/utils';

const filterInputBySdt = {
  [StatisticalDataType.Binary]: ElementInputType.CheckBox,
  [StatisticalDataType.Color]: ElementInputType.ColorPicker,
  [StatisticalDataType.Data]: ElementInputType.FieldTextAutoComplete,
  [StatisticalDataType.NumericTemporal]: ElementInputType.DateTimeField,
};
const filterOperatorsBySdt = {
  [StatisticalDataType.Data]: [FilterOperation.Is],
  [StatisticalDataType.Numeric]: [
    FilterOperation.Is,
    FilterOperation.GreaterOrEqualThan,
    FilterOperation.LessOrEqualThan,
  ],
  [StatisticalDataType.NumericTemporal]: [
    FilterOperation.Is,
    FilterOperation.GreaterOrEqualThan,
    FilterOperation.LessOrEqualThan,
    FilterOperation.RelativeDate,
  ],
};

/**
 * Get the filter input for a given thing and operator
 * @param {filterOperator} - The Filter Operator being used
 * @param {thing} - The thing to get the possible operators from
 * @return - A Filter Input
 */
export function getFilterElement({ filterOperator, thingName }: GetFilterElementProps): ElementInputType {
  const thing = getThingByName(thingName);
  const input = resolveBestSdtMatch({
    defaultMatch: ElementInputType.FieldTextAutoComplete,
    object: getInputByOperator(filterOperator),
    sdt: thing?.statisticalType || StatisticalDataType.Data,
  });

  return input;
}

/**
 * Get the possible filter operators given a thing
 * @param {thing} - The thing to get the possible operators from
 * @return - An array of Filter Operators
 */
export function getFilterOperators(thingName: string): FilterOperation[] {
  const thing = getThingByName(thingName);
  const operators = resolveBestSdtMatch({
    defaultMatch: [FilterOperation.Is],
    object: filterOperatorsBySdt,
    sdt: thing?.statisticalType || StatisticalDataType.Data,
  });

  return operators;
}

///#region Private members
function getInputByOperator(operator: FilterOperation) {
  switch (operator) {
    case FilterOperation.RelativeDate:
      return {
        ...filterInputBySdt,
        [StatisticalDataType.NumericTemporal]: ElementInputType.RelativeDateDropdown,
      };
    default:
      return filterInputBySdt;
  }
}
///#endregion
