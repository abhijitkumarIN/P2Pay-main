import { KsPositiveNegativeArea } from '../../positive-negative-area';
import { Loader } from '@kleeen/react/components';
import { WidgetProps } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './positive-negative-area-widget.styles';
import { useWidgetContext } from '@kleeen/react/hooks';

export function PositiveNegativeAreaWidget({
  attributes,
  taskName,
  widgetId,
  params,
}: WidgetProps): JSX.Element {
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
      <KsPositiveNegativeArea
        attributes={attributes}
        context={widgetData}
        params={params}
        widgetId={widgetId}
      />
    </div>
  );
}
