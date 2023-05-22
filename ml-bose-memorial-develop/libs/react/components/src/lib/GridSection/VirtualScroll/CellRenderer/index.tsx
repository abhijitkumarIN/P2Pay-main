import { allComponentEnum, CellRendererProps } from './CellRenderer.model';
import DataViewRow from './DataViewRow';
import EditDataView from './EditDataView';
import React from 'react';
import RemainingRow from './RemainingRow';

const allComponent: { [index: string]: any } = {
  DataViewRow,
  EditDataView,
  RemainingRow,
};

export function CellRenderer({
  cellData,
  cellInteraction,
  classes,
  columnIndex,
  columns,
  draggable,
  orderColumnName,
  taskName,
  typeOf,
  widgetId,
  ...rest
}: CellRendererProps): React.ReactElement {
  const index = typeOf(cellData);
  const attr = columns[columnIndex].attr;

  const dataViewRowProps = {
    actions: rest.actions,
    attr,
    cellFormatResults: rest.cellFormatResults,
    cellInteraction,
    deleteContainer: rest.deleteContainer,
    deleteProcess: rest.deleteProcess,
    displayColumnAttribute: rest.displayColumnAttribute,
    draggable,
    hasActions: rest.hasActions,
    idx: columnIndex,
    isDeletable: rest.isDeletable,
    localization: rest.localization,
    openShowMoreModal: rest.openShowMoreModal,
    orderColumnName,
    props: columns[columnIndex].props,
    row: cellData,
    rowData: rest.rowData,
    toggleDelete: rest.toggleDelete,
    triggerCustomAction: rest.triggerCustomAction,
  };

  if (index === allComponentEnum.DataViewRow) {
    return <DataViewRow {...dataViewRowProps} />;
  }

  return allComponent[index]({
    attr,
    cellInteraction,
    draggable,
    idx: columnIndex,
    orderColumnName,
    props: columns[columnIndex].props,
    row: cellData,
    taskName,
    widgetId,
    ...rest,
  });
}

export default CellRenderer;
