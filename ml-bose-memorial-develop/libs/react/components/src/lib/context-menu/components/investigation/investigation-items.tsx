import { DataPointValue, DataPointWithFormattedValue, Filters, Maybe, WidgetScope } from '@kleeen/types';
import { getContextDataPoints, getFiltersForDataPoints } from '@kleeen/investigations';

import { ContextMenuSectionProps } from '../../context-menu.model';
import { InvestigationItemWithDataPointData } from './investigation-item.model';
import { checkIfDataPointHasWidgets } from '@kleeen/react/hooks';
import { isSingleCardinalityDataPoint } from '@kleeen/frontend/utils';

export interface GetInvestigationItemsProps
  extends Pick<ContextMenuSectionProps, 'dataPoints' | 'widgetContextParams'> {
  dataPoint: DataPointWithFormattedValue;
  paramsBasedOnRoute: Filters;
}

export function getInvestigationItemValues({
  dataPoint,
  dataPoints,
  paramsBasedOnRoute,
  widgetContextParams,
}: GetInvestigationItemsProps): Maybe<InvestigationItemWithDataPointData> {
  const { attribute, formattedValue } = dataPoint;
  const isSingleCardinality = isSingleCardinalityDataPoint(dataPoint);
  const scope = isSingleCardinality ? WidgetScope.Single : WidgetScope.Collection;
  const entityId = attribute.id;

  const showInvestigations = checkIfDataPointHasWidgets(dataPoint);
  if (!showInvestigations) return;

  const contextDataPoints = getContextDataPoints({
    dataPointToShow: dataPoint,
    dataPoints,
  });
  const filters = getFiltersForDataPoints({
    contextDataPoints,
    dataPoint,
    scope,
    widgetContextParams,
  });

  // TODO: @cafe Handle more than 1 context data point in the future (i.e.: 3 data points)
  const [firstContextDataPoint] = contextDataPoints;
  const filteredBy = firstContextDataPoint?.value.displayValue;
  const filteredByEntity = firstContextDataPoint?.attribute.name;

  const dataPointValues = {
    entity: attribute.name,
    filteredBy: filteredBy || filteredByEntity,
    filteredByEntity,
    value: formattedValue,
  };

  const focusDataPointValue = getFocusDataPointValue(dataPoint.value, scope);

  return {
    contextDataPoints,
    dataPointValues,
    filters,
    investigationDataPoint: {
      entityId,
      scope,
      value: focusDataPointValue,
    },
    pageFilters: paramsBasedOnRoute,
  };
}

//#region private members
function getFocusDataPointValue(
  dataPointValue: DataPointValue,
  scope: WidgetScope,
): Pick<DataPointValue, 'displayValue' | 'id'> {
  if (scope !== WidgetScope.Single) return;
  const { displayValue, id } = dataPointValue;
  return { displayValue, id };
}
//#endregion
