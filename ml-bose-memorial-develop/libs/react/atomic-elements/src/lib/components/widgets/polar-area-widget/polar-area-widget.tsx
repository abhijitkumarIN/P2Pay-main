import {
  useAttributeContextMenu,
  useIsPreview,
  useWidgetContext,
  useWorkflowContext,
} from '@kleeen/react/hooks';

import { KsPolarArea } from '../../polar-area';
import { Loader } from '@kleeen/react/components';
import { WidgetProps } from '@kleeen/types';
import { getDataPointsFromHighchartsEventClick } from '@kleeen/frontend/utils';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './polar-area-widget.styles';

export function PolarAreaWidget({ attributes, chartType, params, taskName, widgetId }: WidgetProps) {
  const classes = useStyles();
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const { openMenu } = useAttributeContextMenu();
  const workflowData = useWorkflowContext();
  const isPreview = useIsPreview();

  //TODO: this has to be removed when we will implement the enhancement to disable the crosslinking interaction by the widget
  const [firstAttribute] = attributes;
  const isDisableCrossLinking = firstAttribute?.isDisableCrossLinking;

  if (isNilOrEmpty(widgetData)) {
    return <Loader />;
  }
  function handleDataPointClickEvent(event: Highcharts.SeriesClickEventObject) {
    if (isPreview || isDisableCrossLinking) {
      return;
    }
    const dataPoints = getDataPointsFromHighchartsEventClick({
      attributes,
      event,
    });
    return openMenu({
      chartType,
      dataPoints,
      e: event,
      params,
      widgetId,
      workflowData,
    });
  }
  return (
    <div className={classes.widgetContent}>
      <KsPolarArea
        attributes={attributes}
        context={widgetData}
        onDataPointClickEvent={handleDataPointClickEvent}
        params={params}
      />
    </div>
  );
}
