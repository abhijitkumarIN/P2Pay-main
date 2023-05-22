import {
  ContextMenuDataPoint,
  ContextMenuItem,
  DataPointWithFormattedValue,
  Filters,
  ReactElement,
  VizParams,
  WidgetTypes,
} from '@kleeen/types';

export type FormattedContextDataPoint = DataPointWithFormattedValue & ContextMenuDataPoint;

export interface DataPointWithFilters extends DataPointWithFormattedValue {
  filters?: Filters;
}

//#region Context Menu
export type HandleContextMenuClose = () => void;

export interface ContextMenuProps {
  anchorEl: null | HTMLElement;
  autoClose?: boolean;
  dataPoints: ContextMenuDataPoint[];
  onClose: HandleContextMenuClose;
  widgetChartType?: WidgetTypes;
  widgetContextParams?: VizParams;
  widgetId?: string;
}
//#endregion

//#region Context Menu Section
export interface ContextMenuSectionItem {
  key: string;
  label: ReactElement;
  menuItems: ContextMenuItem[];
}

export interface ContextMenuSectionProps
  extends Pick<ContextMenuProps, 'widgetChartType' | 'widgetContextParams' | 'widgetId'> {
  dataPoints: DataPointWithFormattedValue[];
  dataPointsToShow: DataPointWithFormattedValue[];
  handleClose: HandleContextMenuClose;
}
//#endregion

//#region Context Menu Section Item
export interface ContextMenuClickHandler<T> {
  handleClose: HandleContextMenuClose;
  item: T;
}
//#endregion
