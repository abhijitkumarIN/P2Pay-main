import { Bucket, FilterQuery, Sorting } from '@kleeen/types';
import { Cardinality, Transformation } from '../utils';

export interface DataAggregationArgsDataPoint {
  bucket?: Bucket;
  name: string;
  transformation?: Transformation;
  transformations?: Transformation[];
}

export interface DataAggregationArgs {
  cardinality?: Cardinality;
  filters?: FilterQuery;
  groupBy?: DataAggregationArgsDataPoint;
  value: DataAggregationArgsDataPoint;
}

export interface GetFiltersArgs {
  attributes: string[];
}

export interface FormatCheckArgs {
  formField: string;
  formValue: string;
  taskName: string;
  widgetId: string;
}

export interface AccessControlCheckArgs {
  section?: string;
  taskName?: string;
  widgetId: string;
}

export interface AutoCompleteParams {
  entity: string;
  limit?: number;
  offset?: number;
  totalCount?: number;
}

export interface DataListingArgs {
  // TODO: @cafe review if we can use a better type here
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

export interface CustomActionArgs {
  entity: string;
  filters?: FilterQuery;
  functionName: string;
}
