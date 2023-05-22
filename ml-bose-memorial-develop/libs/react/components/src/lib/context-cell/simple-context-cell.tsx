import './context-cell.scss';

import { Cell, ContextMenuDataPoint, Transformation } from '@kleeen/types';
import { CellBody, getCellInfo, getFormat, getIfShouldDisplayClickableChipsCell } from './context-cell';
import React, { ReactElement, useState } from 'react';
import { getLinkStyle, isValidLinkByEntityType } from '@kleeen/frontend/utils';

import { CellFormatResultsType } from '../GridSection/VirtualScroll/CellRenderer/CellRenderer.model';
import { ContextMenuProps } from './context-cell.model';
import { KsClickableChipsCell } from './components';
import { KsLink } from '../link';
import { isNilOrEmpty, NEW_ROW_ID_PREFIX } from '@kleeen/common/utils';
import { isNil } from 'ramda';
import {
  checkIfDataPointHasWidgets,
  useHoverIntent,
  useIsInvestigation,
  useIsPreview,
} from '@kleeen/react/hooks';
import { useStyles } from './context-cell.style';

export function KsSimpleContextCell(
  props: ContextMenuProps & { cellFormatResults: CellFormatResultsType },
): ReactElement | null {
  const classes = useStyles();
  const isInvestigationPage = useIsInvestigation();
  const isPreview = useIsPreview();

  const cell = props.cell as Cell;

  if (isNil(cell)) return null;

  const shouldDisplayClickableChipsCell = getIfShouldDisplayClickableChipsCell(
    props.attr?.aggregation as Transformation,
    props.cell,
  );
  const format = getFormat(props);

  const { $metadata: metadata } = cell;
  const cellEntityType = metadata?.entityType;

  const { dataPoints, tooltipTitle, isNumericType, showAppliedTruncated, resultsElement } = getCellInfo({
    attr: props.attr,
    cell,
    cellFormatResults: props.cellFormatResults,
    displayColumnAttribute: props.displayColumnAttribute,
    format,
    hasDisplayMedia: props.hasDisplayMedia,
    row: props.row,
    rowDisplayValue: props.rowDisplayValue,
  });

  //TODO: this has to be removed when we will implement the enhancement to disable the crosslinking interaction by the widget
  const isDisableCrossLinking = props.attr?.isDisableCrossLinking;

  const isIdTemporary = props?.row?.id?.toString().includes(NEW_ROW_ID_PREFIX);
  const hasCrossLink = Boolean(
    !isDisableCrossLinking &&
      !isPreview &&
      !isIdTemporary &&
      props?.cellInteraction?.hasCrossLink &&
      isValidLinkByEntityType(props.attr, cellEntityType),
  );
  const hasFilter = Boolean(
    !isPreview && !isIdTemporary && props?.cellInteraction?.hasFilter && !isDisableCrossLinking,
  );

  const [hasInvestigations] = useState(() => {
    return isInvestigationPage && !isNilOrEmpty(dataPoints) && checkIfDataPointHasWidgets(dataPoints[0]);
  });

  const { ref } = useHoverIntent<HTMLDivElement, ContextMenuDataPoint[]>({
    delayOnEnter: 800,
    onMouseEnterFn: props?.cellInteraction?.handleAnchorClick,
    onMouseEnterFnParams: dataPoints,
    hasCrossLink: hasCrossLink || hasFilter,
    hasInvestigations,
  });

  if (shouldDisplayClickableChipsCell) {
    return (
      <KsClickableChipsCell
        attribute={props.attr}
        cellEntityType={cellEntityType}
        cellItems={props.cell as Cell[]}
        columnLabel={props.attr?.label}
        displayColumnAttribute={props.displayColumnAttribute}
        format={format}
        isIdTemporary={isIdTemporary}
        openShowMoreModal={props.openShowMoreModal}
        row={props.row}
        rowDisplayValue={props.rowDisplayValue}
        widgetId={props.widgetId}
      />
    );
  }

  const { highlight, underline } = getLinkStyle({
    ...props?.cellInteraction,
    hasCrossLink,
    hasInvestigations,
    isDisableCrossLinking,
    isInvestigationPage,
    isPreview,
  });

  return (
    <KsLink
      anchorEl={ref}
      highlight={highlight}
      onClick={() => {
        props?.cellInteraction?.onCellClickFunction(dataPoints, hasCrossLink, ref);
      }}
      onContextMenu={() => {
        props?.cellInteraction?.onCellContextMenuFunction(dataPoints, hasCrossLink, ref);
      }}
      underline={underline}
    >
      <CellBody
        cell={cell}
        classes={classes}
        hasDisplayMedia={props.hasDisplayMedia}
        isNumericType={isNumericType}
        resultsElement={resultsElement}
        showAppliedTruncated={showAppliedTruncated}
        tooltipTitle={tooltipTitle}
      />
    </KsLink>
  );
}
