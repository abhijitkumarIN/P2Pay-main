import { DataPointValue, Widget, WidgetProps, WidgetTypes } from '@kleeen/types';

import { Filters } from './filters';
import { WidgetScope } from '../enums/widgets';

export interface InvestigationDataPoint {
  entityId: number;
  scope: WidgetScope;
  value?: DataPointValue;
}

export interface InvestigationMetadata {
  createdAt: string;
  user?: string;
}

export interface InvestigationCard {
  dataPoint?: InvestigationDataPoint;
  filters?: Filters;
  followUpCards?: InvestigationCard[];
  metadata: InvestigationMetadata;
  mainContextDataPoint?: InvestigationDataPoint;
  widgetChartType?: WidgetTypes;
  widgetId?: string;
}

export interface InvestigationWidget extends Widget {
  focusDataPointValue?: DataPointValue;
}

export type InvestigationCustomAction = Pick<WidgetProps, 'params' | 'taskName' | 'widgetId'>;
