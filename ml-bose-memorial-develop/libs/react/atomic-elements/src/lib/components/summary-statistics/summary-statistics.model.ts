import { TransformationResponse, WidgetProps } from '@kleeen/types';

export interface SummaryStatisticsProps
  extends Pick<WidgetProps, 'attributes' | 'chartType' | 'params' | 'widgetId'> {
  data: TransformationResponse[];
}
