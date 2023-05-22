import {
  Action,
  AmendCellUpdate,
  Attribute,
  AutocompleteState,
  FormatProps,
  GenericFunction,
  Row,
  ScrollOrientationStrategy,
  Sorting,
  Translate,
  Widget,
} from '@kleeen/types';

import { Order } from '@kleeen/common/utils';

export interface EditingCell {
  attributeName?: string;
  rowId?: string;
  temporaryValue?: any;
}

interface Localization {
  actionsTableHeaderRow: string;
  addButtonAriaLabel: string;
  clearSearchAriaLabel: string;
  confirmArialLabel: string;
  confirmDeleteLabel: string;
  deleteButtonAriaLabel: string;
  editButtonAriaLabel: string;
  rejectAriaLabel: string;
  searchPlaceholder: string;
  searchTooltip: string;
}

interface GridSectionProps {
  actions?: Action[];
  attributes: Attribute[];
  autocomplete: AutocompleteState;
  BadgeClickable: JSX.Element;
  className?: string;
  columnWidth?: number;
  enableEditMode?: boolean;
  entity: { isLoading: boolean; isLoadingAdditionalRows: boolean; data: any[]; format?: FormatProps };
  entityActions?: { [key: string]: GenericFunction };
  entityId?: number;
  entityName: string;
  getMoreRows?: any;
  isScroll?: boolean;
  hasToolBar?: boolean;
  onAutocompleteRequest: (attribute: string) => void;
  onCellUpdate?: AmendCellUpdate;
  onDeleteRow?: (id: string) => void;
  onSortRow?: (newI: number, oldI: number) => void;
  orderColumnName?: string;
  order?: Order;
  orderBy?: string;
  onSort?: (value: string) => void;
  scrollOrientation?: ScrollOrientationStrategy;
  selectedRows: Row[];
  setSelectedRows: any;
  sortable?: boolean;
  sortableColumns?: boolean;
  sorting?: Sorting;
  setSorting?: (value: string) => void;
  taskName?: string;
  translate: Translate;
  widget?: Widget;
  widgetId: string;
}

interface GridSectionHeaderProps {
  attributes: Attribute[];
  handleChange: GenericFunction;
  hasActions: boolean;
  localization?: Localization;
  onSort: GenericFunction;
  order: Order;
  orderBy: string;
  widgetId?: string;
}

export { GridSectionHeaderProps, GridSectionProps, Localization };
