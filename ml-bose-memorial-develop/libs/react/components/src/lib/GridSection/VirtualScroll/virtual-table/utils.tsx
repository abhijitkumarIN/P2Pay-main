import { ColumnData, ColumnDataExtended } from '@kleeen/types';
import React, { ReactNode } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { UseInfiniteScroll, UseInfiniteScrollArgs } from './virtualized-table-props.model';

import { CellFormatResultsType } from '../CellRenderer/CellRenderer.model';
import { IndexRange } from 'react-virtualized';
import { Loader } from '../../../Loader/Loader';
import { bem } from './VirtualizedTable';
import classnames from 'classnames';
import { getFormatText } from '@kleeen/react/components';
import { styles } from '../VirtualScroll.style';

export const compareStateColumns = (columnA: ColumnData, columnB: ColumnData) =>
  columnA.attr?.id === columnB.attr?.id;

type ColumnShapeForSortTable = JSX.Element & ReactNode & { key: string };

const SortableHeader = SortableElement(({ children }) => <>{children}</>);

const SortableHeaderRowRenderer = SortableContainer(
  ({
    className,
    columns,
    style,
  }: {
    className: string;
    style: React.CSSProperties;
    columns: ColumnShapeForSortTable[];
  }) => {
    return (
      <div
        className={classnames(className, `${bem}--sortable-header`)}
        data-testid="table-header"
        role="row"
        style={style}
      >
        {React.Children.map(columns, (column) => (
          <SortableHeader index={Number(column.key.match(/\d+/)[0])}>{column}</SortableHeader>
        ))}
      </div>
    );
  },
);

export const getHeaderRowRenderer =
  ({
    handleOnColumnSort,
    helperClass,
    isLoading,
    loaderRefreshClass,
  }: {
    helperClass: string;
    handleOnColumnSort: (oldIndex: number, newIndex: number) => void;
    isLoading: boolean;
    loaderRefreshClass: string;
  }) =>
  (props: { className: string; columns: ColumnShapeForSortTable[]; style: React.CSSProperties }) =>
    (
      <div style={{ width: 'fit-content' }}>
        <SortableHeaderRowRenderer
          {...props}
          axis="x"
          distance={20}
          helperClass={helperClass}
          lockAxis="x"
          onSortEnd={({ oldIndex, newIndex }) => {
            handleOnColumnSort(oldIndex, newIndex);
          }}
        />
        {isLoading && (
          <div className={loaderRefreshClass}>
            <Loader />
          </div>
        )}
      </div>
    );

export const useInfiniteScrollFunctions = ({
  columns,
  getMoreRows,
  pause = false,
  isLoadingAdditionalRows,
}: UseInfiniteScrollArgs): UseInfiniteScroll => {
  const list = columns[0]?.props?.entity?.data || [];
  const pagination = columns[0]?.props?.entity?.pagination;
  const remoteRowCount = pagination?.totalCount ?? list?.length;
  const shouldGetMoreRows = !pause && !isLoadingAdditionalRows && typeof getMoreRows == 'function';

  function isRowLoaded({ index }: { index: number }): boolean {
    return Boolean(list[index]);
  }

  const infiniteLoaderProps = {
    isRowLoaded,
    loadMoreRows: (args: IndexRange) => {
      if (shouldGetMoreRows) {
        getMoreRows(args);
      }
    },
    minimumBatchSize: 501,
    threshold: 10,
    rowCount: remoteRowCount,
  };

  return { infiniteLoaderProps, isLoadingMoreRows: isLoadingAdditionalRows };
};

export const getCellFormatResults = (column: ColumnDataExtended, cellData: any): CellFormatResultsType => {
  const { attr, format } = column;
  const hasDisplayMedia = cellData?.displayMedia ? true : false;
  const { tooltipTitle, showAppliedTruncated, ...cellFormatResults } = getFormatText({
    cell: cellData,
    attr,
    format,
    hasDisplayMedia,
  });

  return {
    ...cellFormatResults,
    tooltipTitle,
    showAppliedTruncated,
  };
};
