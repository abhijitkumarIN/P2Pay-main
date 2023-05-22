import {
  AmendCellUpdate,
  Attribute,
  AutocompleteState,
  ColumnData,
  ContextMenuDataPoint,
  ScrollOrientationStrategy,
} from '@kleeen/types';

import { WithStyles } from '@material-ui/core/styles';
import { styles } from './VirtualScroll.style';

export interface Row {
  index: number;
}

export interface MuiVirtualizedTableProps extends WithStyles<typeof styles> {
  actions: Array<any>;
  amendCellUpdate: AmendCellUpdate;
  attributes: Array<Attribute>;
  autocomplete: AutocompleteState;
  columns: Array<ColumnData>;
  columnWidth: number;
  deleteContainer: Array<any>;
  deleteProcess: (id: string) => void;
  editingCell: { rowId?: string; attributeName?: string };
  enableEditMode?: boolean;
  getMoreRows?: any;
  handleAnchorClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    dataPoints: ContextMenuDataPoint[],
  ) => void;
  handleChange: (column: string, value: string) => any;
  hasActions: boolean;
  headerHeight?: number;
  isDeletable: boolean;
  isLoading?: boolean;
  isLoadingAdditionalRows?: boolean;
  localization: { [key: string]: string };
  onAutocompleteRequest: (attribute: string) => void;
  onCellClickFunction?: (dataPoints: ContextMenuDataPoint[], hasCrossLinking: boolean) => void;
  onCellContextMenuFunction?: () => void;
  onRowClick?: () => void;
  onSort: (any) => any;
  onSortRow?: (newI: number, oldI: number) => void;
  order: number;
  orderBy: string;
  orderColumnName?: string;
  isScroll?: boolean;
  rowCount: number;
  rowGetter: (row: Row) => Data;
  rowHeight?: number;
  scrollOrientation: ScrollOrientationStrategy;
  setEditingCell: React.Dispatch<React.SetStateAction<{}>>;
  sortable?: boolean;
  sortableColumns?: boolean;
  taskName?: string;
  toggleDelete: (id: string) => void;
  translate?: (key: string) => string;
  triggerCustomAction: (action: any, id: string) => void;
  typeOf: (row: any) => any;
  widgetId?: string;
}

export interface Data {
  calories: number;
  carbs: number;
  dessert: string;
  fat: number;
  id: number;
  protein: number;
}

export type Sample = [string, number, number, number, number];
