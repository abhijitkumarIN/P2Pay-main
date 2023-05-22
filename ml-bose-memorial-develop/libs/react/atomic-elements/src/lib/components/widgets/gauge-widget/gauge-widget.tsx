import { KsGauge } from '../../gauge';
import { Loader } from '@kleeen/react/components';
import { WidgetProps } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './gauge-widge.styles';
import { useWidgetContext } from '@kleeen/react/hooks';

export function GaugeWidget({ attributes, params, taskName, widgetId }: WidgetProps) {
  const classes = useStyles();
  const widgetData = useWidgetContext({ params, taskName, widgetId });

  if (isNilOrEmpty(widgetData)) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <KsGauge attributes={attributes} context={widgetData} params={params} widgetId={widgetId} />
    </div>
  );
}
