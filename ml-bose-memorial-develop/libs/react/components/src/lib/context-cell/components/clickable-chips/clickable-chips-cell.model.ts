import { Attribute, Cell, Translate } from '@kleeen/types';

import { ContextMenuProps } from '../../context-cell.model';

export interface ClickableChipsCellProps
  extends Pick<
    ContextMenuProps,
    | 'chartType'
    | 'displayColumnAttribute'
    | 'format'
    | 'openShowMoreModal'
    | 'params'
    | 'row'
    | 'rowDisplayValue'
    | 'widgetId'
  > {
  attribute: Attribute;
  cellEntityType?: string;
  cellItems: Cell[];
  columnLabel: string;
  isIdTemporary?: boolean;
  translate: Translate;
}

export interface PreviewChipsProps
  extends Pick<
    ClickableChipsCellProps,
    'attribute' | 'chartType' | 'format' | 'params' | 'row' | 'rowDisplayValue' | 'widgetId'
  > {
  displayColumnAttribute?: Attribute;
  isClickable: boolean;
  items: Cell[];
  translate: Translate;
}
