import {
  Action,
  AmendCellUpdate,
  Attribute,
  AutocompleteState,
  CellInteraction,
  ColumnDataExtended,
  LabelResultsReturnProps,
  Results,
  Row,
} from '@kleeen/types';

import { EditingCell } from '../../GridSection.model';
import { Key } from 'react';
import { ListingModalSettings } from '../../../listing-modal';

export enum allComponentEnum {
  DataViewRow = 'DataViewRow',
  EditDataView = 'EditDataView',
  RemainingRow = 'RemainingRow',
}

export interface TypeOfProps {
  typeOf: allComponentEnum;
}

export interface CellData {
  id?: string;
  displayValue: number | string | Date;
}

export type CellFormatResultsType = LabelResultsReturnProps & {
  showAppliedTruncated: boolean;
  tooltipTitle: Results;
};
export interface CellRendererProps {
  actions: Action[];
  amendCellUpdate: AmendCellUpdate;
  cellData: CellData;
  cellFormatResults?: CellFormatResultsType;
  cellInteraction: CellInteraction;
  classes: any;
  columnIndex: number;
  columns: ColumnDataExtended[];
  deleteContainer: Array<any>;
  deleteProcess: (id: string) => void;
  displayColumnAttribute: Attribute;
  draggable?: boolean;
  editingCell: EditingCell;
  hasActions: boolean;
  isDeletable: boolean;
  localization: any;
  openShowMoreModal: (listingModalSettings: ListingModalSettings) => void;
  orderColumnName?: string;
  rowData: any;
  taskName?: string;
  toggleDelete: (id: Key) => void;
  triggerCustomAction: (action: Action, id: Key) => void;
  typeOf: (row: any) => any;
  widgetId: string;
}

export interface DataViewRowProps {
  actions: Action[];
  attr: Attribute;
  cellFormatResults?: CellFormatResultsType;
  cellInteraction: CellInteraction;
  deleteContainer: Array<any>;
  deleteProcess: (id: Key) => void;
  displayColumnAttribute: Attribute;
  draggable?: boolean;
  hasActions: boolean;
  idx: number;
  isDeletable: boolean;
  localization: any;
  openShowMoreModal: (listingModalSettings: ListingModalSettings) => void;
  orderColumnName?: string;
  props: any;
  row: any;
  rowData: Row;
  toggleDelete: (id: Key) => void;
  triggerCustomAction: (action: Action, id: Key) => void;
}

export interface EditDataViewProps {
  amendCellUpdate: AmendCellUpdate;
  attr: Attribute;
  autocomplete: AutocompleteState;
  deleteProcess: (id: Key) => void;
  displayColumnAttribute: Attribute;
  editingCell: EditingCell;
  idx: number;
  isDeletable: boolean;
  onAutocompleteRequest: (attribute: string) => void;
  openShowMoreModal: (listingModalSettings: ListingModalSettings) => void;
  orderColumnName?: string;
  props: any;
  row: any;
  rowData: Row;
  setEditingCell: React.Dispatch<React.SetStateAction<Record<string, Key>>>;
  draggable?: boolean;
  taskName?: string;
  widgetId?: string | number;
}
