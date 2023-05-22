import { Attribute, DisplayValue, FormatProps, Result, WidgetProps } from '@kleeen/types';

export interface ListingModalSettings extends Pick<WidgetProps, 'chartType' | 'widgetId'> {
  attribute: Attribute;
  columnLabel: string;
  data: Result[];
  format: FormatProps;
  isOpen: boolean;
  rowDisplayValue?: DisplayValue;
}

export interface ListingModalProps extends ListingModalSettings {
  onClose: () => void;
}
