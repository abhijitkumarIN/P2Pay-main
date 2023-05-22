import { KsReadOnlyText } from '../../read-only-text';
import { Loader } from '@kleeen/react/components';
import { ReactElement } from 'react';
import { WidgetProps } from '@kleeen/types';
import { useStyles } from './read-only-text-widget.styles';
import { useWidgetContext } from '@kleeen/react/hooks';

export function ReadOnlyTextWidget({ attributes, params, taskName, widgetId }: WidgetProps): ReactElement {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <KsReadOnlyText attributes={attributes} context={widgetData} params={params} widgetId={widgetId} />
    </div>
  );
}
