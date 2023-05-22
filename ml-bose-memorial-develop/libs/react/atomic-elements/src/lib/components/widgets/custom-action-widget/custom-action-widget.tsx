import { Action, WidgetProps } from '@kleeen/types';
import { ActionDialogs, Loader } from '@kleeen/react/components';
import { Button, CircularProgress, useStyles } from './custom-action-widget.styles';
import { ReactElement, useEffect, useState } from 'react';
import { useKleeenActions, useKleeenContext, useUrlQueryParams } from '@kleeen/react/hooks';

import capitalize from 'lodash.capitalize';

export const CustomActionWidget = ({ actions, params, taskName, widgetId }: WidgetProps): ReactElement => {
  const { dispatchCustomAction, addWidget } = useKleeenActions(taskName);
  const { widgets } = useKleeenContext(taskName);
  const { paramsBasedOnRoute } = useUrlQueryParams({ useNestedObjects: true });
  const [currentAction, setCurrentAction] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const classes = useStyles();
  const widgetContext = widgets[widgetId];

  useEffect(() => {
    addWidget({ widgetId });
  }, []);

  if (!widgetContext) {
    return <Loader />;
  }

  function dispatchAction(action: Action): void {
    const isCustomDialogOpen = isCustomOpen;
    const needsConfirmation = action?.areYouSure;

    if (isCustomDialogOpen && needsConfirmation) {
      setIsConfirmationOpen(true);
    } else {
      dispatchCustomAction({
        params: { ...params, filters: paramsBasedOnRoute },
        taskName,
        widgetId,
      });
    }
  }

  function handleClick(action: Action): void {
    setCurrentAction(action.displayName);

    if (action?.component) {
      setIsCustomOpen(true);
    } else if (action?.areYouSure) {
      setIsConfirmationOpen(true);
    } else {
      dispatchAction(action);
    }
  }

  function handleIsConfirmationOpenChange(): void {
    setIsConfirmationOpen(!isConfirmationOpen);
  }

  function handleIsCustomOpenChange(): void {
    setIsCustomOpen(!isCustomOpen);
  }

  return (
    <>
      <div className={classes.divContainer}>
        {actions.map((action) => {
          return (
            <Button
              color="primary"
              disabled={widgetContext?.isLoading}
              key={`${action.name}-button`}
              onClick={() => handleClick(action)}
              variant="contained"
            >
              {action.displayName}
            </Button>
          );
        })}

        {widgetContext?.isLoading && (
          <>
            <CircularProgress size={24} />
            <span className={classes.message}>{capitalize(currentAction)} in progress...</span>
          </>
        )}
      </div>
      {actions.map((action) => (
        <ActionDialogs
          action={action}
          dispatchAction={dispatchAction}
          isConfirmationOpen={isConfirmationOpen}
          isCustomOpen={isCustomOpen}
          key={`${action.name}-action-dialogs`}
          onIsConfirmationOpenChange={handleIsConfirmationOpenChange}
          onIsCustomOpenChange={handleIsCustomOpenChange}
        />
      ))}
    </>
  );
};
