import { Action, InvestigationCustomAction, InvestigationWidget, TranslateProps } from '@kleeen/types';

export interface ActionsDropdownProps extends TranslateProps {
  actionsName: string;
  taskName: string;
  widget: InvestigationWidget;
}

export interface ActionDialogProps {
  action: Action;
  dataCustomAction: InvestigationCustomAction;
}

export interface GenerateCustomActionPayloadArgs {
  action: Action;
  baseModel: string;
  dataPointId: string;
  entityId: string | number;
  taskName: string;
  widgetId: string;
}

export interface ActionDialogsConditionProps {
  actionDialog: ActionDialogProps;
  dispatchCustomAction: (e: InvestigationCustomAction) => void;
  setActionDialog: (e: ActionDialogProps) => void;
  taskName: string;
}
