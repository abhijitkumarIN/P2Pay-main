import { Filters, Maybe, Transformation, Widget, WidgetScope } from '@kleeen/types';
import {
  GetContextDataPointFiltersArgs,
  GetContextFilters,
  GetDataPointFilters,
  GetFiltersForDataPointsArgs,
  GetWidgetWithFilters,
  GetWidgetsWithFiltersProps,
  MapFilterToWidgetProps,
  WidgetsWithFilters,
} from './filters.types';

import { isSingleCardinalityTransformation } from '@kleeen/frontend/utils';

export interface FilterVariants {
  contextDataPointFilters: Maybe<Filters>;
  contextFilters: Maybe<Filters>;
  dataPointFilters: Maybe<Filters>;
}

export function getFiltersForDataPoints({
  contextDataPoints,
  dataPoint,
  scope,
  widgetContextParams,
}: GetFiltersForDataPointsArgs): FilterVariants {
  return {
    contextDataPointFilters: getContextDataPointFilters({ contextDataPoints }),
    contextFilters: getContextFilters({ widgetContextParams }),
    dataPointFilters: getDataPointFilters({ dataPoint, scope }),
  };
}

export function getWidgetsDecoratedWithFilters({
  widgets,
  ...rest
}: GetWidgetsWithFiltersProps): WidgetsWithFilters {
  const { contextDataPointFilters, contextFilters, dataPointFilters } = getFiltersForDataPoints(rest);
  return {
    widgetsWithContextDataPointFilters: widgets.map(
      mapFilterToWidget({
        filtersToApply: {
          ...contextDataPointFilters,
          ...contextFilters,
          ...dataPointFilters,
        },
      }),
    ),
    widgetsWithDefaultFilters: widgets.map(
      mapFilterToWidget({
        filtersToApply: {
          ...contextFilters,
          ...dataPointFilters,
        },
      }),
    ),
  };
}

export function getWidgetWithFilters({
  filters,
  overridePreviousFilters = false,
  widget,
}: GetWidgetWithFilters): Widget {
  return {
    ...widget,
    params: {
      ...widget?.params,
      filters: {
        ...(overridePreviousFilters ? {} : widget?.params?.filters),
        ...filters,
      },
    },
  };
}

//#region Private Members

function getContextDataPointFilters({ contextDataPoints }: GetContextDataPointFiltersArgs): Maybe<Filters> {
  const filters = contextDataPoints
    .filter((dataPoint) => {
      return isSingleCardinalityTransformation(dataPoint.attribute.aggregation as Transformation);
    })
    .reduce((acc: Filters, dataPoint) => {
      // TODO: @cafe This filter composition may change after the filters refactor
      acc[dataPoint.attribute.name] = dataPoint.value?.id || dataPoint.value?.displayValue;

      return acc;
    }, {});

  return filters;
}

function getContextFilters({ widgetContextParams }: GetContextFilters): Maybe<Filters> {
  return widgetContextParams?.filters;
}

function getDataPointFilters({ dataPoint, scope }: GetDataPointFilters): Maybe<Filters> {
  if (scope !== WidgetScope.Single) {
    return;
  }
  return {
    [dataPoint.attribute.name]: dataPoint.value.id,
  };
}

function mapFilterToWidget({ filtersToApply }: MapFilterToWidgetProps): (widget: Widget) => Widget {
  return (widget: Widget) => {
    return getWidgetWithFilters({
      widget,
      filters: filtersToApply,
    });
  };
}
//#endregion
