import { CrossLinking, FilterQuery, PrimitiveType } from '@kleeen/types';
import { DataAggregationArgs, DataAggregationArgsDataPoint, ListItem } from '../types';

import { Sorting } from '@kleeen/types';
import { Transformation } from '../utils/enumerators';

export interface DataListingArgs {
  attributes: {
    aggregation?: Transformation;
    isDisplayValue?: boolean;
    name: string;
    rawEntityName: string;
    transformation?: Transformation;
  }[];
  entity: string;
  filters?: FilterQuery;
  latestRequestTimestamp?: number;
  pagination?: { startIndex: number; stopIndex: number };
  sorting?: Sorting;
}

export interface Entity {
  name: string;
  properties: { [property: string]: { statisticalType: string } };
}

export interface GenericEntityItem {
  displayValue: ListItem;
  id: string;
}

export interface GenericEntityItemNestedDisplayValue {
  displayValue: { displayValue: ListItem };
  id: string;
}

export type GetWidgetData = (input: DataAggregationArgs, chartType?: string) => unknown[];

export enum PrimitiveTypes {
  Boolean = 'boolean',
  Date = 'datetime',
  Number = 'number',
  String = 'string',
}

export interface FakeDataDataPoint extends DataAggregationArgsDataPoint {
  list: PrimitiveType[];
  idList: CrossLinking[];
  type: PrimitiveTypes;
  isCategorical: boolean;
  isSelf: boolean;
}
