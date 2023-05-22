import { Attribute, ColumnData, ColumnDataExtended } from '@kleeen/types';

import { IndexRange } from 'react-virtualized';

export interface ColumnsMapFunctionArgs {
  columnsForCell: ColumnDataExtended[];
  newAttributes?: Attribute[];
  width: number;
  withIndex?: boolean;
  withInputValues?: boolean;
}

export interface ColumnWidthsArgs {
  [key: string]: { columnWidth: number; deltaX: number };
}
export interface ColumnToShowArgs {
  hideColumn: boolean;
  id: number;
  label: string;
  name: string;
  order: number;
}

export const defaultProps = {
  headerHeight: 42,
  rowHeight: 34,
};

export const configContainer = {
  withRef: true,
};
export interface GetHeaderRenderArgs {
  columnsLength?: number;
  index: number;
  isLoading?: boolean;
  newAttributes: Attribute[];
  other?: Record<string, unknown>;
  width: number;
  withInputValues: boolean;
}

export interface GetSimpleTablePropsArgs {
  height: number;
  onRowsRendered: (params: IndexRange) => void;
  registerChild: (registeredChild: any) => void;
  tableClassName: string;
  width: number;
}
export interface GetSortablePropsArgs {
  extraProps: any;
  height: number;
  tableClassName: string;
  width: number;
}

export const initialModelSettings = {
  attribute: null,
  columnLabel: '',
  data: [],
  format: null,
  isOpen: false,
  rowDisplayValue: '',
};

export type setVirtualizedTableInputValue = (index: string, value: number | string) => void;

export interface SortableTableProps {
  getContainer: (wrappedInstance: any) => Element | Text;
  gridStyle: {
    direction: string;
  };
  headerHeight: number;
  overscanRowCount: number;
  rowClassName: ({ index }: { index: any }) => string;
  rowHeight: number;
  useDragHandle: boolean;
}

export interface InfiniteLoaderProps {
  isRowLoaded: ({ index }: { index: number }) => boolean;
  loadMoreRows: ({ startIndex, stopIndex }: IndexRange) => any;
  minimumBatchSize: number;
  threshold: number;
  rowCount: number | undefined;
}

export interface UseInfiniteScroll {
  infiniteLoaderProps: InfiniteLoaderProps;
  isLoadingMoreRows: boolean;
}

export interface UseInfiniteScrollArgs {
  columns: ColumnData[];
  getMoreRows: ({ startIndex, stopIndex }: IndexRange) => void;
  isLoadingAdditionalRows?: boolean;
  pause?: boolean;
}
