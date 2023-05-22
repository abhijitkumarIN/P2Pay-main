import { differenceWith, equals } from 'ramda';

import { parseStringifyToJson } from '@kleeen/common/utils';
import { useEffect } from 'react';
import { ColumnToShowArgs } from '../virtual-table/virtualized-table-props.model';
import { ColumnData } from '@kleeen/types';
import { get } from 'lodash';

interface ColumnDataCompare {
  id: string;
  name: string;
}

/**
 * Syncs the local storage column order with the one in the props.
 */
export function useSyncColumnOrder({
  columns,
  columnsState,
  columnsToShowState,
  setColumns,
  setColumnsState,
  setColumnsToShowState,
  userName,
}) {
  let hasDifferences = false;

  const columnToShow = mapCommonKeys(columnsToShowState, 'name', 'id');
  const columnBase = mapCommonKeys(columns, 'attr.name', 'attr.id');

  try {
    hasDifferences = !equals(columnToShow, parseStringifyToJson({ defaultValue: columnBase }));
  } catch (error) {
    console.error('Error syncing columns.', error);
  }

  useEffect(() => {
    if (userName && hasDifferences) {
      const compareStateColumns = (columnA: ColumnDataCompare, columnB: ColumnDataCompare) =>
        columnA?.id === columnB?.id;

      const deletedColumns = differenceWith(compareStateColumns, columnToShow, columnBase);
      const addedColumns = differenceWith(compareStateColumns, columnBase, columnToShow);

      const newColumns = columns.reduce((acc, column): ColumnData[] => {
        if (addedColumns.some((added) => added.id === column.attr.id)) {
          return [...acc, column];
        }
        return acc;
      }, []);

      const columnsWithoutDeleted = columnsState.filter((columnA) =>
        deletedColumns.every((columnB) => !compareStateColumns(columnA.attr, columnB)),
      );

      const newColumnToShow = [...columnsWithoutDeleted, ...newColumns].map((column, index) => {
        return {
          id: column.attr.id,
          hideColumn: Boolean(column?.hideColumn),
          name: column.attr.name,
          order: index,
          label: column.label,
        };
      });

      const newColumnState = [...columnsWithoutDeleted, ...newColumns];

      setColumnsState(newColumnState);
      setColumns(newColumnState);
      setColumnsToShowState(newColumnToShow);
    }
  }, [userName, hasDifferences]);

  return {
    isSyncingColumns: !userName || columnsToShowState.length !== columns.length,
  };
}

//#region Private members
function mapCommonKeys(
  columns: ColumnToShowArgs[] | ColumnData[],
  nameKey: string,
  idKey: string,
): Pick<ColumnToShowArgs, 'name' | 'id'>[] {
  return columns
    .map((column) => ({
      name: get(column, nameKey),
      id: get(column, idKey),
    }))
    .sort((a, b) => a.id - b.id);
}

//#endregion
