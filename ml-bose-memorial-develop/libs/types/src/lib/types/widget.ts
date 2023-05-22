import { Action, AddModalAttribute } from './actions';
import { Attribute, ChangeDirectionsProps } from './attributes';
import { Maybe, OnInputChangeEvent, RegisterEvents } from './base';
import { StatisticalDataType, TemporalInterval, Transformation, ViewType } from '../enums';
import { WidgetCategory, WidgetScope, WidgetSection, WidgetTypes } from '../enums/widgets';

import { Filters } from './filters';
import { FormatProps } from './format';
import Highcharts from 'highcharts';
import { Pagination } from './pagination';
import { Sorting } from './sort';
import { UpdateDataStrategy } from '../enums/update-data';

export interface VizCommonParams {
  params?: VizParams;
}

interface WidgetBaseType extends VizCommonParams {
  actions: Action[];
  attributes: Attribute[];
  chartType?: string;
  entityId?: number;
  entityName?: string;
  id: string;
  isNewWidget?: boolean;
  name?: string;
  section?: WidgetSection;
  title?: string;
  type?: ViewType;
  viewId?: string;
  viewOrder?: number;
}

export interface Widget extends WidgetBaseType {
  addModalAttributes?: AddModalAttribute[];
  chartType: WidgetTypes;
  component?: Maybe<string>;
  description?: string;
  relatedEntityId?: number;
  scope?: WidgetScope;
  selectedViableSolution?: WidgetTypes;
  sortOrder?: number;
  statisticalType?: StatisticalDataType;
  viableSolutions?: WidgetTypes[];
}

export interface WidgetProps extends Pick<Widget, 'actions' | 'attributes' | 'params'> {
  chartType?: WidgetTypes;
  taskName: string;
  widgetId?: string;
}

export type OnDataPointClick = (event: Highcharts.SeriesClickEventObject) => void;

export interface VisualizationWidgetProps
  extends Pick<WidgetProps, 'attributes' | 'chartType' | 'params' | 'widgetId'> {
  context: WidgetState;
  onDataPointClickEvent?: OnDataPointClick;
}

export interface ViewShapeType extends WidgetBaseType {
  widgets: Widget[];
}

export type SetCurrentViewType = (currentView: ViewShapeType) => void;

export interface TemporalBucket {
  interval: TemporalInterval;
  magnitude: number;
}

// Include new bucket types with an | (or) here
export type Bucket = TemporalBucket;

export interface GroupByProps {
  bucket?: Bucket;
  formatType: string;
  name: string;
  transformation: string;
}

export interface MenuListProps {
  func?: () => void;
  icon?: string;
  path: string;
  title: string;
}

export interface TransformationProps {
  isPrimary?: boolean;
  metadata?: ChangeDirectionsProps;
  transformation: Transformation;
  transformationMetadata?: ChangeDirectionsProps;
}
export interface ValueProp {
  format?: FormatProps;
  formatType?: string;
  name: string;
  transformation?: string;
}

export interface ValuesPropsAttributes {
  name: string;
}

export interface ValuesProps {
  attributes?: ValuesPropsAttributes[];
  format?: FormatProps;
  formatType: string;
  label: string;
  name: string;
  transformations: TransformationProps[];
}

export interface VizParams {
  /**
   * Use PascalCase for this value. Check entities.json as reference
   */
  baseModel?: string;
  cardinality?: string;
  displayName?: string;
  extraParams?: Record<string, any>;
  filters?: Filters;
  groupBy?: GroupByProps;
  operationName?: string;
  taskName?: string;
  value?: ValueProp | ValuesProps;
}

export interface WidgetContextParams extends VizParams {
  aggregatedByType?: string;
  attributes?: Attribute[] | string;
  pagination?: Pagination;
  sorting?: Sorting;
}

export interface CustomWidgetContainerProps {
  disableHeightCalculation: boolean;
  onInputChange?: OnInputChangeEvent;
  registerEvents?: RegisterEvents;
  taskName: string;
  widget: Widget;
  Header?: JSX.Element;
}

export interface CustomWidgetProps extends CustomWidgetContainerProps {
  className: string;
  key: string;
  title: string;
}

export interface WidgetState {
  data: any;
  error: any;
  isLoading: boolean;
  isLoadingAdditionalRows: boolean;
  latestRequestTimestamp?: number;
  params: VizParams;
  strategy?: UpdateDataStrategy;
  tempData?: any;
}

export type WidgetsByCategory = {
  [key in WidgetCategory]?: Widget[];
};

export type WidgetsByScopeByCategory = {
  [key in WidgetScope]?: WidgetsByCategory;
};

export type WidgetIdsByScope = {
  [key in WidgetScope]?: string[];
};

export type WidgetsByScope = {
  [key in WidgetScope]?: Widget[];
};

export interface WidgetsByEntityByScopeByCategory {
  [thingId: string]: WidgetsByScopeByCategory;
}

export interface WidgetIdsByEntityByScope {
  [thingId: string]: WidgetIdsByScope;
}

export interface WidgetsByEntityByScope {
  [thingId: string]: WidgetsByScope;
}
