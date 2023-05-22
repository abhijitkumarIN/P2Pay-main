import { KsStepLine } from '../../step-line';
import { Loader } from '@kleeen/react/components';
import { WidgetProps } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './step-line-widget.styles';
import { useWidgetContext } from '@kleeen/react/hooks';

export function StepLineWidget({ attributes, params, taskName, widgetId }: WidgetProps): JSX.Element {
  const widgetData = useWidgetContext({
    taskName,
    widgetId,
    params,
  });
  const classes = useStyles();

  if (isNilOrEmpty(widgetData)) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <KsStepLine attributes={attributes} context={widgetData} params={params} widgetId={widgetId} />
    </div>
  );
}
