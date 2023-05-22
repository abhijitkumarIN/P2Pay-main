import { Attribute, CellInteraction, ColumnData, ColumnDataExtended } from '@kleeen/types';
import { Column, TableCellProps, TableHeaderProps, TableProps } from 'react-virtualized';
import {
  ColumnToShowArgs,
  ColumnWidthsArgs,
  ColumnsMapFunctionArgs,
  GetHeaderRenderArgs,
  GetSimpleTablePropsArgs,
  GetSortablePropsArgs,
  SortableTableProps,
  defaultProps,
  initialModelSettings,
} from './virtualized-table-props.model';
import { getCellFormatResults, useInfiniteScrollFunctions } from './utils';
import {
  useAvailableFiltersByWorkflow,
  useCrosslinkingInteraction,
  useIsInvestigation,
  useLocalStorage,
  useTheme,
  useUserInfo,
} from '@kleeen/react/hooks';
import { useEffect, useState } from 'react';

import CellRenderer from '../CellRenderer';
import { ListingModalSettings } from '@kleeen/react/components';
import { MuiVirtualizedTableProps } from '../VirtualScroll.model';
import ReactDOM from 'react-dom';
import { arrayMove } from 'react-sortable-hoc';
import { bem } from './VirtualizedTable';
import classnames from 'classnames';
import { get } from 'lodash';
import { getCellInteraction } from '@kleeen/frontend/utils';
import { getRowClassName } from '../GetRowClassName';
import { headerRenderer } from '../HeaderRenderer';
import { insert } from 'ramda';
import { overwriteFormat } from '@kleeen/common/utils';
import { useStyles } from '../VirtualizedTable.style';
import { useSyncColumnOrder } from '../helpers';

export const useVirtualizedTable = ({
  actions,
  amendCellUpdate,
  attributes,
  classes,
  columns: columnsBase,
  columnWidth = 178,
  deleteContainer,
  deleteProcess,
  editingCell,
  enableEditMode,
  getMoreRows,
  handleAnchorClick,
  handleChange,
  hasActions,
  headerHeight,
  isDeletable,
  isLoading,
  isLoadingAdditionalRows,
  localization,
  onCellClickFunction,
  onCellContextMenuFunction,
  onRowClick,
  onSort,
  onSortRow,
  order,
  orderBy,
  orderColumnName,
  rowHeight,
  sortable,
  sortableColumns,
  taskName,
  toggleDelete,
  translate,
  triggerCustomAction,
  typeOf,
  widgetId,
  ...tableProps
}: MuiVirtualizedTableProps) => {
  const [columns, setColumns] = useState(columnsBase);

  const { availableFilters, hasFilters } = useAvailableFiltersByWorkflow<Attribute>(attributes);
  const { crosslinkingInteraction: linkInteraction } = useCrosslinkingInteraction();
  const isInvestigationPage = useIsInvestigation();
  const minColumnWidth = columnWidth;
  const minWidth = minColumnWidth * columns.length;

  const [listingModalSettings, setIsListingModalOpen] = useState<ListingModalSettings>(initialModelSettings);
  const [columnsOrderChanged, setColumnsOrderChanged] = useState(false);
  const displayColumnAttribute = attributes.find((attribute) => attribute.isDisplayValue);
  const { themeClass } = useTheme();
  const [inputValues, setInputValues] = useState({});

  const columnSizes = columns.reduce((acc, column): ColumnWidthsArgs => {
    //this could be an issues when we support multi-aggregations of the same entity
    acc[column.attr.id] = { columnWidth: parseFloat((1 / columns.length).toFixed(2)), deltaX: 0.0 };
    return acc;
  }, {});

  const columnToShow = columns.map(
    (column, index): ColumnToShowArgs => ({
      hideColumn: false,
      id: column.attr.id,
      label: column.label,
      name: column.attr.name,
      order: index,
    }),
  );

  // TODO: @marimba take the storage logic out of the component.
  const _user = useUserInfo();
  const userName = _user?.userInfo?.username;

  const keyOfLocalStorageForColumnToShow = userName ? `columns-to-show-${userName}-${widgetId}` : '';
  const { localStorageValue: columnsToShowState, setLocalStorageValue: setColumnsToShowState } =
    useLocalStorage(keyOfLocalStorageForColumnToShow, columnToShow || {});

  const keyOfLocalStorage = userName ? `order-of-columns-${userName}-${widgetId}` : '';
  const { localStorageValue: columnsState, setLocalStorageValue: setColumnsState } = useLocalStorage<
    ColumnData[]
  >(keyOfLocalStorage, columns || []);

  const keyOfLocalStorageForColumnWidth = userName ? `width-of-columns-${userName}-${widgetId}` : '';
  const { localStorageValue: columnsWidthState, setLocalStorageValue: setColumnsWidthState } =
    useLocalStorage(keyOfLocalStorageForColumnWidth, columnSizes || {});

  const [columnWidths, setColumnWidth] = useState<ColumnWidthsArgs>(columnSizes);

  useEffect(() => {
    if (userName) {
      if (Object.keys(columnSizes).length !== Object.keys(columnsWidthState).length) {
        setColumnWidth(columnSizes);
        setColumnsWidthState(columnSizes);
        return;
      }
      setColumnWidth({ ...columnSizes, ...columnsWidthState });
      setColumnsWidthState({ ...columnSizes, ...columnsWidthState });
    }
  }, [userName]);

  const sumColumnWidth = (columnWidths: ColumnWidthsArgs, width: number): number => {
    const sumValues = Object.values(columnWidths).reduce(
      (result: number, column: { columnWidth: number; deltaX: number }) => {
        return result + column.columnWidth;
      },
      0,
    ) as number;

    const sum = sumValues * width;
    return sum < width ? width : sum;
  };

  const getWidthColumn = (entityId: string, width: number): number => {
    const totalSize = columnWidths[entityId].columnWidth * width;
    const result = width / columns.length > totalSize ? width / columns.length : totalSize;

    return result;
  };

  const { infiniteLoaderProps, isLoadingMoreRows } = useInfiniteScrollFunctions({
    columns: columnsBase,
    getMoreRows,
    pause: isLoading,
    isLoadingAdditionalRows,
  });

  const resizeColumn = ({
    entityId,
    deltaX,
    columnsLength,
  }: {
    entityId: string;
    deltaX: number;
    columnsLength: number;
  }) => {
    setColumnWidth((prevState) => {
      const percentDelta = deltaX / minWidth;
      const newWidth = parseFloat((prevState[entityId].columnWidth + percentDelta).toFixed(2));
      const minPercentWidth = 1 / columnsLength;
      if (newWidth < minPercentWidth) {
        return prevState;
      }

      return {
        ...prevState,
        [entityId]: {
          columnWidth: parseFloat((prevState[entityId].columnWidth + percentDelta).toFixed(2)),
          deltaX: parseFloat((prevState[entityId].deltaX + percentDelta).toFixed(2)),
        },
      };
    });

    setColumnsWidthState(columnWidths);
  };

  function handleOnColumnSort(oldIndex: number, newIndex: number): void {
    setColumnsState(arrayMove(columnsState, oldIndex, newIndex));
    setColumnsToShowState(arrayMove(columnsToShowState, oldIndex, newIndex));
    setColumnsOrderChanged(!columnsOrderChanged);
  }

  function setInputValue(index: string, value: string | number): void {
    setInputValues({
      ...inputValues,
      [index]: value,
    });
  }

  function closeShowMoreModal(): void {
    setIsListingModalOpen(initialModelSettings);
  }

  function _sortRow({ newIndex, oldIndex }: { newIndex: number; oldIndex: number }): void {
    if (newIndex === oldIndex) return;

    onSortRow?.(newIndex, oldIndex);
  }

  function openShowMoreModal(settings: ListingModalSettings): void {
    setIsListingModalOpen(settings);
  }

  const { isSyncingColumns } = useSyncColumnOrder({
    columnsState,
    columns: columnsBase,
    columnsToShowState,
    setColumnsState,
    setColumns,
    setColumnsToShowState,
    userName,
  });

  const rowClassName = ({ index }: { index: number }) =>
    getRowClassName({
      classes,
      deleteContainer,
      index,
      onRowClick,
      rowGetter: tableProps.rowGetter,
    });

  const gridStyle = { direction: 'inherit' };
  const headerStyles = useStyles();

  const sortableTableProps = {
    getContainer: (wrappedInstance: any) => ReactDOM.findDOMNode(wrappedInstance.Grid) as any, //TODO: @marimba deprecated findDOMNode
    gridStyle,
    headerHeight: defaultProps.headerHeight,
    overscanRowCount: 3,
    rowClassName,
    useDragHandle: true,
    rowHeight: defaultProps.rowHeight,
  };

  const commonCellProps = {
    actions,
    amendCellUpdate,
    classes,
    deleteContainer,
    deleteProcess,
    displayColumnAttribute,
    editingCell,
    hasActions,
    isDeletable,
    localization,
    openShowMoreModal,
    taskName,
    toggleDelete,
    triggerCustomAction,
    typeOf,
    widgetId,
  };

  const CellRender =
    (columnsForCell: ColumnDataExtended[], index: number, cellInteraction: CellInteraction) =>
    ({ cellData, columnIndex, rowData }: TableCellProps) => {
      const cellFormatResults = getCellFormatResults(columnsForCell[columnIndex], cellData);
      const isFirstColumn = (index || columnIndex) === 0;
      return (
        <CellRenderer
          {...commonCellProps}
          cellData={cellData}
          cellFormatResults={cellFormatResults}
          cellInteraction={cellInteraction}
          columnIndex={index || columnIndex}
          columns={columnsForCell}
          draggable={sortable && isFirstColumn}
          rowData={rowData}
          {...tableProps}
        />
      );
    };

  const headerRendererCommonProps = { attributes, handleChange, hasActions, onSort, order, orderBy };
  const getHeaderRender =
    ({
      index,
      withInputValues,
      newAttributes,
      other,
      width,
      columnsLength,
    }: GetHeaderRenderArgs): ((headerProps: TableHeaderProps) => JSX.Element) =>
    (headerProps: TableHeaderProps) =>
      headerRenderer({
        ...headerProps,
        ...headerRendererCommonProps,
        ...(newAttributes ? { newAttributes } : {}),
        ...(withInputValues ? { inputValues, setInputValue } : {}),
        columnIndex: index,
        isLoading: isLoading || isLoadingMoreRows,
        resizeColumn: (props) =>
          resizeColumn({ entityId: other.attr['id'], width, minWidth, columnsLength, ...props }),
      });

  const getSortableTableProps = ({
    extraProps,
    height,
    tableClassName,
    width,
  }: GetSortablePropsArgs): GetSortablePropsArgs & SortableTableProps & MuiVirtualizedTableProps => ({
    className: tableClassName,
    height,
    helperClass: `${themeClass} dragging-row-helper-styles`,
    width: sumColumnWidth(columnWidths, width),
    ...extraProps,
    ...sortableTableProps,
    ...tableProps,
  });

  const getSimpleTableProps = ({
    height,
    onRowsRendered,
    registerChild,
    tableClassName,
    width,
  }: GetSimpleTablePropsArgs): TableProps => ({
    className: tableClassName,
    gridStyle,
    headerHeight: defaultProps.headerHeight,
    height,
    onRowsRendered,
    overscanRowCount: 3,
    ref: registerChild,
    rowClassName,
    rowHeight: defaultProps.rowHeight,
    width: sumColumnWidth(columnWidths, width),
    ...tableProps,
  });

  const getColumnsProps = (dataKey: string, width: number, other?: Record<string, unknown>) => ({
    className: classnames(classes.flexContainer, `${bem}--column`),
    dataKey,
    headerClassName: classes.tableHeader,
    key: dataKey,
    minWidth: minColumnWidth,
    width: getWidthColumn(other.attr['id'], width),
    ...other,
  });

  const columnsMapFunction =
    ({ columnsForCell, newAttributes, width, withIndex, withInputValues }: ColumnsMapFunctionArgs) =>
    (
      {
        cellInteraction,
        dataKey,
        ...other
      }: { dataKey: string; cellInteraction: CellInteraction; other?: Record<string, unknown> },
      index: number,
    ) =>
      (
        <Column
          {...getColumnsProps(dataKey, width, other as Record<string, unknown>)}
          headerRenderer={getHeaderRender({
            index,
            newAttributes,
            other: other as Record<string, unknown>,
            width,
            withInputValues,
            columnsLength: columnsForCell.length,
          })}
          cellRenderer={CellRender(columnsForCell, withIndex ? index : null, {
            ...cellInteraction,
            onCellClickFunction,
            onCellContextMenuFunction,
            handleAnchorClick,
          })}
          minWidth={width / columnsForCell.length}
        />
      );

  const getColumns = (columnsData: ColumnData[]): ColumnDataExtended[] => {
    return columnsData.map((column) => ({
      ...column,
      cellInteraction: getCellInteraction({
        column,
        availableFilters,
        hasFilters,
        isInvestigationPage,
        linkInteraction,
      }),
      format: overwriteFormat(
        get(column.props, `entity.format[${column.attr.name}]`, null),
        column.attr.format,
      ),
    }));
  };

  const hideColumns = (column: ColumnToShowArgs, hideColumn: boolean, index: number) => {
    if (!hideColumn) {
      const newColumn = columnsBase.find((columnBase) => columnBase.attr.id === column.id);
      const newColumnsState = insert(index, newColumn, columnsState);
      setColumns(newColumnsState);
      setColumnsState(newColumnsState);
    } else {
      const newColumnsState = columnsState.filter((columnState) => columnState.attr.id !== column.id);
      setColumns(newColumnsState);
      setColumnsState(newColumnsState);
    }
  };

  return {
    _sortRow,
    classes,
    closeShowMoreModal,
    columns: getColumns(columns),
    columnsMapFunction,
    columnsState: getColumns(columnsState),
    columnsToShowState,
    getSimpleTableProps,
    getSortableTableProps,
    handleOnColumnSort,
    headerStyles,
    hideColumns,
    infiniteLoaderProps,
    isLoading,
    isLoadingMoreRows,
    isSyncingColumns,
    listingModalSettings,
    setColumnsToShowState,
    sortable,
    sortableColumns,
    themeClass,
  };
};
