import { ContextMenuDataPoint, Transformation, VizParams, WidgetProps } from '@kleeen/types';

import { ReactNode } from 'react';

export interface CrosslinkProps extends Pick<WidgetProps, 'chartType' | 'widgetId'> {
  dataPoints: ContextMenuDataPoint[];
  children: ReactNode;
  params?: VizParams;
  transformation?: Transformation;
  transformationKeyToUse?: string;
}
