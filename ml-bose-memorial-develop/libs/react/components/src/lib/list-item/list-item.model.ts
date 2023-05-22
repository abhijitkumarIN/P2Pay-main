import { Attribute, DataListMetaData, Row, WidgetProps } from '@kleeen/types';

export interface ListItemProps extends Pick<WidgetProps, 'chartType' | 'widgetId'> {
  columns: Attribute[];
  item?: Row;
  metadata?: DataListMetaData;
}
