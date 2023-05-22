import {
  Action,
  Attribute,
  GenericFunctions,
  OnInputChangeEvent,
  RegisterEvents,
  WidgetProps,
} from '@kleeen/types';

import { AddDialogPayload } from '../dialog';

export type AddPayload = AddDialogPayload;

export type CellDisplayValue = {
  id?: number | string;
  displayValue: boolean | number | string | JSX.Element;
};

export type CellData = string | CellDisplayValue | JSX.Element | boolean;

export interface DeletePayload {
  entityKey: string;
  id: unknown;
}

export interface UpdatePayload {
  entity: string;
  params: { [key: string]: string };
  hasErrors?: boolean;
}

export interface KsConfigTableOnSaveData {
  changes: {
    added: AddPayload[];
    deleted: DeletePayload[];
    updated: UpdatePayload[];
  };
  current: any[];
  id?: string;
}

export interface KsConfigTableProps extends Pick<WidgetProps, 'attributes' | 'params' | 'widgetId'> {
  actions: Action[];
  customModalProps?: Record<string, any>;
  data: {
    data: {
      data: RowData[];
      format: TableFormat;
    };
    isLoading: boolean;
  };
  enableEditMode?: boolean;
  entityActions?: GenericFunctions;
  onInputChange?: OnInputChangeEvent;
  // TODO: @cafe Rename this field to registerEvents
  onRegisterEvents?: RegisterEvents;
  // These are only required for autocomplete
  taskName?: string;
  orderColumnName?: string;
  isSortable?: boolean;
}

export interface RowData {
  id: string;
  [key: string]: CellData;
}

export interface TableFormat {
  [key: string]: any;
}
