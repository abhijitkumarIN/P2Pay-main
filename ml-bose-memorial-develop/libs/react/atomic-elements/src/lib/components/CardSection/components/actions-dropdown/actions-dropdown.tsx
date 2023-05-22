import { Action, InvestigationCustomAction } from '@kleeen/types';
import {
  ActionDialogProps,
  ActionsDropdownProps,
  GenerateCustomActionPayloadArgs,
} from './actions-dropdown.model';
import {
  ActionDialogs,
  InputElementProps,
  ItemType,
  KsButtonText,
  KsDropDown,
} from '@kleeen/react/components';
import { Ref, forwardRef, useState } from 'react';
import { isNilOrEmpty, upperCamelCase } from '@kleeen/common/utils';

import { KUIConnect } from '@kleeen/core-react';
import classnames from 'classnames';
import { pathOr } from 'ramda';
import { useKleeenActions } from '@kleeen/react/hooks';

const bem = 'ks-investigate-actions-dropdown';

const AnchorElement = forwardRef(({ translate, setOpen }: InputElementProps, ref: Ref<HTMLButtonElement>) => {
  const onClick = () => setOpen(true);
  return (
    <KsButtonText className={classnames(bem, 'anchor-button')} onClick={onClick} ref={ref}>
      {translate('app.gridSection.actionsTableHeaderRow')}
    </KsButtonText>
  );
});

function ActionsDropdownComponent({
  actionsName,
  formatMessage,
  taskName,
  translate,
  widget,
}: ActionsDropdownProps) {
  const accessKey = 'investigate-actions';
  const [actionDialog, setActionDialog] = useState<ActionDialogProps>();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const { dispatchCustomAction } = useKleeenActions(actionsName);

  const { actions, entityName, entityId, id: widgetId, focusDataPointValue } = widget;
  const dataPointId = pathOr('', ['params', 'filters', widget.entityName], widget);

  const widgetFocusDataPoint = focusDataPointValue?.displayValue?.toString() || entityName;

  const [actionsAsOptions] = useState(
    actions?.map(({ name, displayName, ...rest }) => ({
      label: displayName,
      key: name,
      ...rest,
    })),
  );

  function handleClick(_, { label, key, ...rest }: ItemType) {
    const displayName = label as string;
    const name = key;
    const action = { displayName, name, ...rest } as Action;
    handleCustomAction(action);
  }

  function handleCustomAction(action: Action) {
    const dataCustomAction = generateCustomActionPayload({
      action,
      baseModel: upperCamelCase(entityName),
      dataPointId,
      entityId,
      taskName,
      widgetId,
    });

    if (action.component) {
      setActionDialog({ action, dataCustomAction });
      setIsCustomOpen(true);
      return;
    } else if (action.areYouSure) {
      setActionDialog({ action, dataCustomAction });
      setIsConfirmationOpen(true);
      return;
    }

    dispatchCustomAction(dataCustomAction);
  }

  function handleIsConfirmationOpenChange(): void {
    setIsConfirmationOpen(!isConfirmationOpen);
  }

  function handleIsCustomOpenChange(): void {
    setIsCustomOpen(!isCustomOpen);
  }

  function handleDispatchAction(action: Action, e: MouseEvent): void {
    const isCustomDialogOpen = isCustomOpen;
    const needsConfirmation = action?.areYouSure;

    if (isCustomDialogOpen && needsConfirmation) {
      setIsConfirmationOpen(true);
    } else {
      e.preventDefault();
      dispatchCustomAction(actionDialog.dataCustomAction);
    }
  }
  const key = `${actionDialog?.action?.name}-dialogs`;

  return (
    <>
      <KsDropDown
        headerSectionLabel={formatMessage(
          { id: 'app.investigation.actionsContextMenuHeader' },
          { dataPoint: widgetFocusDataPoint },
        )}
        accessKey={accessKey}
        handleOnClick={handleClick}
        options={actionsAsOptions}
        translate={translate}
        InputElement={AnchorElement}
      />
      {!isNilOrEmpty(actionDialog) && (
        <ActionDialogs
          action={actionDialog?.action}
          dispatchAction={handleDispatchAction}
          isConfirmationOpen={isConfirmationOpen}
          isCustomOpen={isCustomOpen}
          key={key}
          onIsConfirmationOpenChange={handleIsConfirmationOpenChange}
          onIsCustomOpenChange={handleIsCustomOpenChange}
          taskName={taskName}
        />
      )}
    </>
  );
}

function generateCustomActionPayload({
  action,
  baseModel,
  dataPointId,
  entityId,
  taskName,
  widgetId,
}: GenerateCustomActionPayloadArgs): InvestigationCustomAction {
  const dataCustomAction = {
    params: {
      baseModel,
      displayName: action.displayName,
      operationName: `${action.name}${entityId}`,
      filters: { [baseModel]: dataPointId },
    },
    taskName,
    widgetId,
  };

  return dataCustomAction;
}

export const ActionsDropdown = KUIConnect(({ formatMessage, translate }) => ({ formatMessage, translate }))(
  ActionsDropdownComponent,
);
