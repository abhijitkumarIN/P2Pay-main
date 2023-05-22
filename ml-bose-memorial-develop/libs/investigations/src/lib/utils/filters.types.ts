import { DataPoint, FilterQuery, Filters, Maybe, VizParams, Widget, WidgetScope } from '@kleeen/types';

export interface GetFiltersForDataPointsArgs {
  contextDataPoints: DataPoint[];
  dataPoint: DataPoint;
  scope: WidgetScope;
  widgetContextParams: VizParams;
}

interface GetFiltersForDataPointsProps {
  contextDataPoints: DataPoint[];
  dataPoint: DataPoint;
  scope: WidgetScope;
  widgetContextParams: VizParams;
}

export interface GetContextDataPointFiltersArgs {
  contextDataPoints: DataPoint[];
}

export interface GetWidgetsWithFiltersProps extends GetFiltersForDataPointsArgs {
  widgets: Widget[];
}

export interface WidgetsWithFilters {
  widgetsWithDefaultFilters: Widget[];
  widgetsWithContextDataPointFilters: Widget[];
}

export interface GetWidgetWithFilters {
  filterQuery?: FilterQuery;
  filters: Maybe<Filters>;
  overridePreviousFilters?: boolean;
  widget: Widget;
}

export interface GetContextFilters {
  widgetContextParams: VizParams;
}

export interface GetDataPointFilters {
  dataPoint: DataPoint;
  scope: WidgetScope;
}

export interface MapFilterToWidgetProps {
  filtersToApply: Filters;
}
