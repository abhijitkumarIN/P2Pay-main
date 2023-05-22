import { KsWaterfall } from '../../waterfall';
import { Loader } from '@kleeen/react/components';
import { WidgetProps } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './waterfall-widget.styles';
import { useWidgetContext } from '@kleeen/react/hooks';

export function WaterfallWidget({ attributes, params, taskName, widgetId }: WidgetProps): JSX.Element {
  const widgetData = useWidgetContext({
    taskName,
    widgetId,
    params: { ...params, aggregatedByType: 'over' },
  });
  const classes = useStyles();

  if (isNilOrEmpty(widgetData)) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <KsWaterfall attributes={attributes} context={widgetData} params={params} widgetId={widgetId} />
    </div>
  );
}
