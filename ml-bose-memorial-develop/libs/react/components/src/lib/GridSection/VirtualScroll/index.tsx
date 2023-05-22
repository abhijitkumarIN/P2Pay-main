import { Action, ActionType, AmendCellUpdate, Attribute, ContextMenuDataPoint } from '@kleeen/types';
import React, { useCallback, useState } from 'react';
import {
  useAnchorElement,
  useCrosslinking,
  useIsInvestigation,
  useIsPreview,
  validateCrosslinkingInteraction,
} from '@kleeen/react/hooks';

import { GridSectionProps } from '../GridSection.model';
import { KUIConnect } from '@kleeen/core-react';
import { KsContextMenu } from '@kleeen/react/components';
import { Loader } from '../../Loader/Loader';
import Paper from '@material-ui/core/Paper';
import { VirtualizedTable } from './virtual-table/VirtualizedTable';
import { allComponentEnum } from './CellRenderer/CellRenderer.model';
import classnames from 'classnames';
import { isNilOrEmpty } from '@kleeen/common/utils';
import useFilter from '../useFilter';
import { useStyles } from './VirtualizedTable.style';

type HeaderColumns = Array<{
  attr: Attribute;
  dataKey: string;
  label: string;
  props;
}>;

const bem = 'ks-virtual-scroll';

const useContextMenuInteractions = () => {
  const { anchorEl, handleClick, handleClose } = useAnchorElement();
  const [openModal, setOpenModal] = useState(false);
  const [dataPoints, setDataPoints] = useState<ContextMenuDataPoint[]>();

  //TODO: this has to be removed when we will implement the enhancement to disable the crosslinking interaction by the widget
  const [dataPoint] = dataPoints ? dataPoints : [];
  const isDisableCrossLinking = dataPoint?.attribute?.isDisableCrossLinking;

  const isInvestigationPage = useIsInvestigation();

  function handleCloseHelper() {
    setOpenModal(false);
    handleClose();
  }

  const { crosslink } = useCrosslinking();
  const isPreview = useIsPreview();

  function onCellClick(dataPointsParam: ContextMenuDataPoint[], hasCrossLinking: boolean) {
    const [dataPoint] = dataPointsParam;
    const { attribute, value } = dataPoint;

    if (hasCrossLinking) {
      const [firstValidCrossLink] = attribute?.crossLinking;
      crosslink(firstValidCrossLink.slug, value, attribute);
    }

    setDataPoints(dataPointsParam);
  }

  const handleAnchorClick = useCallback(
    (eventProps: React.MouseEvent<HTMLButtonElement>, cellDataPoints: ContextMenuDataPoint[]) => {
      setDataPoints(cellDataPoints);
      handleClick(eventProps);
    },
    [setDataPoints, handleClick],
  );

  const { onClickFunction, onContextMenuFunction, validation } = validateCrosslinkingInteraction({
    onCellClick,
    openModal,
    setOpenModal,
    anchorEl,
    handleAnchorClick,
    hasInvestigations: isInvestigationPage,
  });

  const showContextMenu = validation && !isPreview && !isDisableCrossLinking;

  return {
    onClickFunction,
    onContextMenuFunction,
    validation: showContextMenu,
    handleCloseHelper,
    dataPoints,
    anchorEl,
    handleAnchorClick,
  };
};

function ReactVirtualizedTableComponent({
  BadgeClickable,
  isScroll,
  onSortRow,
  orderColumnName,
  scrollOrientation,
  sortable,
  sortableColumns,
  translate,
  widgetId,
  sorting,
  order,
  orderBy,
  onSort,
  ...props
}: GridSectionProps): JSX.Element | null {
  const [{ rows }, handleChange] = useFilter(props.entity.data);
  const [deleteContainer, setStatusDeleteContainer] = useState([]);
  const [editingCell, setEditingCell] = useState({});
  const [remainingRows] = useState([]);
  const tableStyles = useStyles();

  const actions = props?.actions || [];
  const isDeletable = actions.some(({ type }) => type.toLowerCase() === ActionType.Delete);
  const hasActions = isDeletable || actions.length > 0;
  const localization = {
    actionsTableHeaderRow: translate('app.gridSection.actionsTableHeaderRow'),
    addButtonAriaLabel: translate('app.gridSection.addButtonAriaLabel'),
    clearSearchAriaLabel: translate('app.gridSection.clearSearchAriaLabel'),
    confirmArialLabel: translate('app.gridSection.confirmArialLabel'),
    confirmDeleteLabel: translate('app.gridSection.confirmDeleteLabel'),
    deleteButtonAriaLabel: translate('app.gridSection.deleteButtonAriaLabel'),
    editButtonAriaLabel: translate('app.gridSection.editButtonAriaLabel'),
    rejectAriaLabel: translate('app.gridSection.rejectAriaLabel'),
    searchPlaceholder: translate('app.gridSection.searchPlaceholder'),
    searchTooltip: translate('app.gridSection.searchTooltip'),
  };

  const {
    onClickFunction,
    onContextMenuFunction,
    validation,
    handleCloseHelper,
    dataPoints,
    anchorEl,
    handleAnchorClick,
  } = useContextMenuInteractions();

  if (props.entity.isLoading && isNilOrEmpty(props.entity.data)) return <Loader />;

  const amendCellUpdate: AmendCellUpdate = (params): void => {
    if (props.onCellUpdate) {
      props.onCellUpdate(params);
    }
    setEditingCell({});
  };

  function deleteProcess(id: string): void {
    props.entityActions['deleteRequest']({ id, entityKey: props.entityName });
    toggleDelete(id);
  }

  function toggleDelete(id: string): void {
    if (deleteContainer.includes(id)) {
      setStatusDeleteContainer(deleteContainer.filter((q) => q != id));
      return;
    }
    setStatusDeleteContainer([...deleteContainer, id]);
  }

  function triggerCustomAction(action: Action, id: string): void {
    const { widget } = props;
    const dispatchCustomAction = props?.entityActions?.dispatchCustomAction || (() => ({}));
    const entityId = widget?.entityId || props.entityId;

    const dataCustomAction = {
      params: {
        baseModel: props.entityName,
        displayName: action.displayName,
        filters: { [props.entityName]: id },
        operationName: `${action.name}${entityId}`,
      },
      taskName: props.taskName,
      widgetId: '',
    };

    dispatchCustomAction(dataCustomAction);
  }

  function typeOf(row): allComponentEnum {
    if (rows) {
      if (props.enableEditMode) {
        return allComponentEnum.EditDataView;
      }
      return allComponentEnum.DataViewRow;
    }
    return allComponentEnum.RemainingRow;
  }

  if (!Array.isArray(rows) && !Array.isArray(remainingRows)) return null;

  const rowsStableSort = rows ? rows : remainingRows;

  return (
    <Paper className={classnames(`${props.className} ${tableStyles.virtualTable} ${bem}--container`)}>
      {BadgeClickable}
      <VirtualizedTable
        actions={actions}
        amendCellUpdate={amendCellUpdate}
        attributes={props.attributes}
        autocomplete={props.autocomplete}
        columns={mapColumns(props.attributes, props)}
        columnWidth={props.columnWidth}
        deleteContainer={deleteContainer}
        deleteProcess={props.onDeleteRow || deleteProcess}
        editingCell={editingCell}
        getMoreRows={props.getMoreRows}
        handleAnchorClick={handleAnchorClick}
        handleChange={handleChange}
        hasActions={hasActions}
        isDeletable={isDeletable}
        isLoading={props.entity.isLoading}
        isLoadingAdditionalRows={props.entity.isLoadingAdditionalRows}
        isScroll={isScroll}
        localization={localization}
        onAutocompleteRequest={props.onAutocompleteRequest}
        onCellClickFunction={onClickFunction}
        onCellContextMenuFunction={onContextMenuFunction}
        onSort={onSort}
        onSortRow={onSortRow}
        order={order}
        orderBy={orderBy}
        orderColumnName={orderColumnName}
        rowCount={rowsStableSort.length}
        rowGetter={getRowGetter(rowsStableSort)}
        scrollOrientation={scrollOrientation}
        setEditingCell={setEditingCell}
        sortable={sortable}
        sortableColumns={sortableColumns}
        taskName={props.taskName}
        toggleDelete={toggleDelete}
        triggerCustomAction={triggerCustomAction}
        typeOf={typeOf}
        widgetId={widgetId}
      />
      {validation && (
        <KsContextMenu
          anchorEl={anchorEl}
          autoClose
          dataPoints={dataPoints}
          onClose={handleCloseHelper}
          widgetId={widgetId}
          widgetContextParams={props.widget.params}
        />
      )}
    </Paper>
  );
}

//#region Private Members

function getRowGetter(rowsStableSort) {
  return ({ index }) => (rowsStableSort.length > 0 ? rowsStableSort[index] : {});
}

function mapColumns(attributes: Attribute[], props: Partial<GridSectionProps>): HeaderColumns {
  return attributes.map((attribute) => {
    return {
      attr: attribute,
      dataKey: attribute.name,
      label: attribute.label || attribute.name,
      props,
    };
  });
}

//#endregion

const ReactVirtualizedTable = React.memo(
  KUIConnect(({ translate }) => ({ translate }))(ReactVirtualizedTableComponent),
);

export default ReactVirtualizedTable;
