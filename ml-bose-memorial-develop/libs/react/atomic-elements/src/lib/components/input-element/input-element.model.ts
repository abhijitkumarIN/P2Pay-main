import {
  Attribute,
  DataPointValue,
  ElementComponents,
  ErrorsType,
  FormatProps,
  RegisterEvents,
  WidgetProps,
} from '@kleeen/types';

export interface InputElementProps extends Pick<WidgetProps, 'params' | 'taskName' | 'widgetId'> {
  addErrors?: (error: ErrorsType) => void;
  attribute: Attribute;
  elements: ElementComponents;
  registerEvents: RegisterEvents;
  data?: { data: DataPointValue | DataPointValue[]; format: { [key: string]: FormatProps } };
  isLoading?: boolean;
}
