import './DataViewControlSection.scss';

import { Action, WidgetTypes } from '@kleeen/types';
import {
  ActionDialogs,
  ActionsSection,
  AddDialogPayload,
  KsAutoRefreshControl,
  KsRefreshControl,
} from '@kleeen/react/components';
import { Container, Title, Typography } from './DataViewControlSection.styles';
import { DataViewControlSectionProps, UseActionsProps } from './DataViewControlSection.model';
import { HeaderTitle, HeaderTitleEllipsis } from '../HeaderTitle';
import { ReactElement, useState } from 'react';
import {
  getWidgetContextName,
  useGetDisplayValue,
  useKleeenActions,
  useKleeenContext,
} from '@kleeen/react/hooks';

import Grid from '@material-ui/core/Grid';
import MuiTooltip from '@material-ui/core/Tooltip';
import { ViewSwitcher } from './view-switcher';
import classnames from 'classnames';
import { isAddAction } from '@kleeen/render-utils';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { pathOr } from 'ramda';

const bem = 'ks-data-view-control-section';

export function DataViewControlSection(props: DataViewControlSectionProps): ReactElement | null {
  const {
    actions,
    currentView,
    entityActions,
    objectValue,
    results,
    setCurrentView,
    taskName,
    title,
    viewOptions = [],
  } = props;
  if (isNilOrEmpty(taskName)) {
    console.error('Value cannot be null. Parameter name: taskName. In the DataViewControlSection.');
    return null;
  }
  const { refreshPage } = useKleeenActions(taskName);

  const {
    dispatchAction,
    getAddActions,
    handleIsConfirmationOpenChange,
    handleIsCustomOpenChange,
    setIsCustomOpen,
    setIsConfirmationOpen,
    isConfirmationOpen,
    isCustomOpen,
  } = useActionsState({ entityActions, currentView, actions }); // TODO review how can we use useKsActionsManager here
  const { displayValue, format, isLoading } = useGetDisplayValue({ objectValue, taskName });
  const addActions = getAddActions();
  const entityName = isNilOrEmpty(currentView?.entityName) ? props.entity : currentView.entityName;

  const contextName = getWidgetContextName({ taskName, widgetId: currentView?.id as string });
  const fullTableData = useKleeenContext(contextName);

  const currentViewIsFullTable = currentView?.chartType === WidgetTypes.FULL_TABLE;
  const fullTableIsLoading = pathOr(false, ['isLoading'], fullTableData);
  const fullTableIsLoadingAdditionalRows = pathOr(false, ['isLoadingAdditionalRows'], fullTableData);
  const isFullViewAndLoading =
    currentViewIsFullTable && (fullTableIsLoading || fullTableIsLoadingAdditionalRows);

  function handleClick(action: Action): void {
    if (action?.component) {
      setIsCustomOpen(true);
    } else if (action?.areYouSure) {
      setIsConfirmationOpen(true);
    }
  }

  return (
    <>
      <Container className={classnames(bem, 'dataview-control-section')} maxWidth="xl">
        <Grid alignItems="center" className={classnames(`${bem}__container`, 'main-container')} container>
          {/**TODO KSE3-4140 implement ks title here**/}
          <Grid
            className={classnames(`${bem}__typography`, 'typography-ellipsis')}
            container
            direction="column"
          >
            <MuiTooltip
              title={
                <HeaderTitle displayValue={displayValue} format={format} title={title} subTitle={results} />
              }
              placement="top-start"
            >
              <Title>
                <Typography variant="h2" component="h1">
                  <HeaderTitleEllipsis
                    displayValue={displayValue}
                    isLoading={isLoading}
                    format={format}
                    subTitle={results}
                    title={title}
                  />
                </Typography>
              </Title>
            </MuiTooltip>
            {results != null && (
              <Typography className={classnames(`${bem}__results`, 'results')}>
                <>{results} Results</>
              </Typography>
            )}
          </Grid>
        </Grid>
        {viewOptions.length > 1 && (
          <Grid
            alignItems="center"
            className={classnames(`${bem}__options`, 'options')}
            container
            data-testid="view-switcher"
          >
            <ViewSwitcher
              currentView={currentView}
              setCurrentView={setCurrentView}
              showDropDown={props.showDropDown}
              taskName={taskName}
              viewOptions={viewOptions}
            />
          </Grid>
        )}
        <Grid alignItems="center" className="actions" container data-testid="page-actions">
          {!props.hideRefreshControl && (
            <>
              <KsRefreshControl onRefresh={refreshPage} taskName={taskName} pause={isFullViewAndLoading} />
              <KsAutoRefreshControl taskName={taskName} onRefresh={refreshPage} />
            </>
          )}
          <ActionsSection actions={addActions} entity={entityName} handleAddClick={handleClick} />
        </Grid>
      </Container>
      {addActions.map((action) => (
        <ActionDialogs
          action={action}
          attributes={props.attributes}
          dispatchAction={dispatchAction}
          entity={entityName}
          isConfirmationOpen={isConfirmationOpen}
          isCustomOpen={isCustomOpen}
          key={`${action.name}-dialogs`}
          onIsConfirmationOpenChange={handleIsConfirmationOpenChange}
          onIsCustomOpenChange={handleIsCustomOpenChange}
          parent={props.parent}
          taskName={taskName}
        />
      ))}
    </>
  );
}

function useActionsState({ entityActions, currentView, actions }: UseActionsProps) {
  const [actionPayload, setActionPayload] = useState({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  function dispatchAction({ action, payload }: { action: Action; payload: AddDialogPayload }): void {
    const isCustomDialogOpen = isCustomOpen;
    const needsConfirmation = action?.areYouSure;

    if (isCustomDialogOpen && needsConfirmation) {
      setActionPayload(payload);
      setIsConfirmationOpen(true);
    } else {
      entityActions.addRequest(payload || actionPayload);
    }
  }

  function getAddActions(): Action[] {
    const localActions = isNilOrEmpty(currentView?.actions) ? actions : currentView.actions;
    return (localActions || []).filter(isAddAction);
  }

  function handleIsConfirmationOpenChange(): void {
    setIsConfirmationOpen(!isConfirmationOpen);
  }

  function handleIsCustomOpenChange(): void {
    setIsCustomOpen(!isCustomOpen);
  }

  return {
    dispatchAction,
    getAddActions,
    handleIsConfirmationOpenChange,
    handleIsCustomOpenChange,
    isConfirmationOpen,
    isCustomOpen,
    setIsConfirmationOpen,
    setIsCustomOpen,
  };
}

export default DataViewControlSection;
