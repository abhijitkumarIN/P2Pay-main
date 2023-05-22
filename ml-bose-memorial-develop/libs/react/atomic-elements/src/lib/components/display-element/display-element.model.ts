import { Attribute, DataPointValue, ElementComponents, FormatProps, WidgetProps } from '@kleeen/types';

export interface DisplayElementProps extends Pick<WidgetProps, 'chartType' | 'params' | 'widgetId'> {
  attribute: Attribute;
  elements: ElementComponents;
  data: { data: DataPointValue | DataPointValue[]; format: { [key: string]: FormatProps } };
  isLoading?: boolean;
}
