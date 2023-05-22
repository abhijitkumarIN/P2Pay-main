import {
  Attribute,
  Cell,
  CellInteraction,
  ChangeDirectionsProps,
  DisplayValue,
  FormatProps,
  ReactElement,
  Results,
  Row,
  WidgetProps,
} from '@kleeen/types';

import { ListingModalSettings } from '..';

export interface ContextMenuProps extends Pick<WidgetProps, 'chartType' | 'params' | 'widgetId'> {
  attr: Attribute;
  cell: Cell | Cell[];
  cellInteraction?: CellInteraction; // optional for ranked-list-item/list-item/config-table
  displayColumnAttribute?: Attribute;
  format?: FormatProps;
  hasDisplayMedia?: boolean;
  openShowMoreModal?: (ListingModalSettings) => void;
  row?: Row;
  rowDisplayValue?: DisplayValue;
}

export interface LabelResultsProps extends ChangeDirectionsProps {
  cell?: Cell | Cell[];
  format?: FormatProps;
  formatType?: string;
  hasDisplayMedia?: boolean;
  results: string | number;
  transformation: string;
}

export interface MemoizeToolTipProps {
  cell: Cell;
  children: ReactElement;
  title: Results;
}
