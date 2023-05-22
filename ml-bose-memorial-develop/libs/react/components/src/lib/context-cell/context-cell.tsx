import './context-cell.scss';

import {
  Attribute,
  Cell,
  ContextMenuDataPoint,
  DisplayMediaType,
  DisplayValue,
  LabelResultsReturnProps,
  Results,
  Row,
  Transformation,
} from '@kleeen/types';
import { BootstrapTooltip, KsClickableChipsCell } from './components';
import { ContextMenuProps, LabelResultsProps, MemoizeToolTipProps } from './context-cell.model';
import { NEW_ROW_ID_PREFIX, isNilOrEmpty } from '@kleeen/common/utils';
import React, { ReactElement } from 'react';
import { isEmpty, isNil, pathOr } from 'ramda';

import { ArrowPoint } from '../arrowPoint/ArrowPoint';
import { CellFormatResultsType } from '../GridSection/VirtualScroll/CellRenderer/CellRenderer.model';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { KsCrosslink } from '../crosslink';
import KsDisplayMedia from '../KsDisplayMedia/KsDisplayMedia';
import { TextFormatter } from '../textFormatter/TextFormatter';
import classNames from 'classnames';
import { isAttributeNumericType } from '@kleeen/frontend/utils';
import { useStyles } from './context-cell.style';

const MAX_TEXT_LENGTH = 15;

/**
 * @deprecated in favor to KsSimpleContextCell used on config table, simple and ranked list
 */
export function KsContextCell(props: ContextMenuProps): ReactElement | null {
  const classes = useStyles();
  const cell = props.cell as Cell;

  if (isNil(cell)) return null;

  const shouldDisplayClickableChipsCell = getIfShouldDisplayClickableChipsCell(
    props.attr?.aggregation as Transformation,
    props.cell,
  );
  const format = getFormat(props);
  const { $metadata: metadata } = cell;

  if (shouldDisplayClickableChipsCell) {
    const isIdTemporary = props?.row?.id?.toString().includes(NEW_ROW_ID_PREFIX);

    return (
      <KsClickableChipsCell
        attribute={props.attr}
        cellEntityType={metadata?.entityType}
        cellItems={props.cell as Cell[]}
        chartType={props?.chartType}
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

  const { dataPoints, tooltipTitle, isNumericType, showAppliedTruncated, resultsElement } = getCellInfo({
    attr: props.attr,
    cell,
    hasDisplayMedia: props.hasDisplayMedia,
    format,
    displayColumnAttribute: props.displayColumnAttribute,
    rowDisplayValue: props.rowDisplayValue,
    row: props.row,
  });

  return (
    <KsCrosslink chartType={props?.chartType} dataPoints={dataPoints} widgetId={props.widgetId}>
      <CellBody
        cell={cell}
        classes={classes}
        hasDisplayMedia={props.hasDisplayMedia}
        isNumericType={isNumericType}
        resultsElement={resultsElement}
        showAppliedTruncated={showAppliedTruncated}
        tooltipTitle={tooltipTitle}
      />
    </KsCrosslink>
  );
}

//#region Private members
function applyFormat(value: any, attr: Attribute): any {
  const type = attr?.deepDataType;
  if (type === 'boolean') return value ? 'True' : 'False';
  if (React.isValidElement(value)) return value; // FIXME: Please consider this comment: https://github.com/KLEEEN-SOFTWARE/kapitan/pull/1800/files?file-filters%5B%5D=.tsx#r600664986
  if (typeof value === 'object') return value?.displayValue;

  return value;
}

export function labelResults({
  cell,
  changeDirections,
  format,
  formatType,
  hasDisplayMedia,
  results,
  transformation,
}: LabelResultsProps): LabelResultsReturnProps {
  const labelReturn: LabelResultsReturnProps = {
    results,
    resultsElement: (
      <TextFormatter
        cell={cell}
        format={format}
        formatType={formatType}
        hasDisplayMedia={hasDisplayMedia}
        textAlignment="flex-end"
        transformation={transformation || Transformation.SelfSingle}
      >
        {results}
      </TextFormatter>
    ),
  };

  if (transformation === Transformation.ChangePercent || transformation === Transformation.ChangeCount) {
    labelReturn.results = Math.abs(results as number);
    labelReturn.resultsElement = (
      <ArrowPoint
        changeDirections={changeDirections}
        className="context-cell-arrow"
        result={results as number}
        showPercentage={transformation === Transformation.ChangePercent}
      />
    );
  }

  return labelReturn;
}

function shouldTruncateText(text: string): boolean {
  return text ? text.toString().trim().length >= MAX_TEXT_LENGTH : false;
}

export function getIfShouldDisplayClickableChipsCell(aggregation: Transformation, cell: Cell | Cell[]) {
  const isMultipleValuesColumn = aggregation === Transformation.SelfMulti;
  const shouldDisplayClickableChipsCell = isMultipleValuesColumn && Array.isArray(cell);

  return shouldDisplayClickableChipsCell;
}

type CellInfoProps = {
  attr: Attribute;
  cell: Cell;
  hasDisplayMedia: boolean;
  format: unknown;
  displayColumnAttribute: Attribute;
  rowDisplayValue: DisplayValue;
  row: Row;
  cellFormatResults?: CellFormatResultsType;
};

export const getFormatText = ({
  attr,
  cell,
  format,
  hasDisplayMedia,
}: Partial<CellInfoProps>): CellFormatResultsType => {
  const showAppliedFormat = applyFormat(cell?.displayValue, attr) ?? '';
  const showAppliedTruncated = shouldTruncateText(showAppliedFormat);
  const { results, resultsElement } = labelResults({
    cell,
    changeDirections: attr?.aggregationMetadata?.changeDirections,
    format,
    formatType: attr?.formatType,
    hasDisplayMedia,
    results: showAppliedFormat,
    transformation: attr?.aggregation,
  });
  const tooltipTitle = showAppliedTruncated ? results : '';

  return { tooltipTitle, resultsElement, showAppliedTruncated, results };
};

export function getCellInfo({
  attr,
  cell,
  cellFormatResults,
  displayColumnAttribute,
  format,
  hasDisplayMedia,
  row,
  rowDisplayValue,
}: CellInfoProps) {
  const { tooltipTitle, resultsElement, showAppliedTruncated } =
    cellFormatResults || getFormatText({ cell, attr, format, hasDisplayMedia });
  const isNumericType = isAttributeNumericType(attr);

  const dataPoints: ContextMenuDataPoint[] = [
    {
      attribute: attr,
      value: cell,
    },
  ];

  if (!isNilOrEmpty(displayColumnAttribute)) {
    dataPoints.push({
      attribute: displayColumnAttribute,
      ignoreInContextMenu: true,
      value: {
        displayValue: rowDisplayValue,
        id: row.id,
      },
    });
  }

  return { dataPoints, tooltipTitle, isNumericType, showAppliedTruncated, resultsElement };
}

export function getFormat(props: ContextMenuProps) {
  const beFormat = props.format;
  const ksFormat = pathOr({}, ['attr', 'format'], props);
  const finalFormal = isNil(beFormat) || isEmpty(beFormat) ? ksFormat : beFormat;

  return finalFormal;
}

const MemoizeToolTip = React.memo(
  ({ children, title }: MemoizeToolTipProps) => {
    return (
      <BootstrapTooltip placement="top" title={title}>
        {children}
      </BootstrapTooltip>
    );
  },
  (prevProps, nextProps) => prevProps.cell === nextProps.cell,
);

export function CellBody({
  hasDisplayMedia,
  classes,
  cell,
  tooltipTitle,
  isNumericType,
  resultsElement,
  showAppliedTruncated,
}: {
  hasDisplayMedia: boolean;
  classes: ClassNameMap;
  cell: Cell;
  tooltipTitle: Results;
  isNumericType: boolean;
  resultsElement: string | ReactElement;
  showAppliedTruncated: boolean;
}) {
  return (
    <>
      <span className={classes.mediaValueContainer}>
        {hasDisplayMedia && cell.displayMedia?.type !== DisplayMediaType.Svg && (
          <KsDisplayMedia
            className={classes.displayMedia}
            size={21}
            type={cell.displayMedia?.type || ''}
            value={cell.displayMedia?.value || ''}
          />
        )}
        <MemoizeToolTip title={tooltipTitle} cell={cell}>
          <span
            className={classNames({
              'text-align-left': !isNumericType,
              'text-align-right': isNumericType,
              'truncate-text': showAppliedTruncated,
            })}
          >
            {resultsElement}
          </span>
        </MemoizeToolTip>
      </span>
    </>
  );
}

//#endregion
