import {
  useAttributeContextMenu,
  useIsPreview,
  useWidgetContext,
  useWorkflowContext,
} from '@kleeen/react/hooks';

import { KsSingleBarHighlightMax } from '../../single-bar-highlight-max';
import { Loader } from '@kleeen/react/components';
import { WidgetProps } from '@kleeen/types';
import { getDataPointsFromHighchartsEventClick } from '@kleeen/frontend/utils';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './single-bar-highlight-max-widget.styles';

export function SingleBarHighlightMaxWidget({
  attributes,
  chartType,
  params,
  taskName,
  widgetId,
}: WidgetProps) {
  const classes = useStyles();
  const widgetData = useWidgetContext({
    params,
    taskName,
    widgetId,
  });
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
      <KsSingleBarHighlightMax
        attributes={attributes}
        base={params.baseModel}
        context={widgetData}
        onDataPointClickEvent={handleDataPointClickEvent}
        params={params}
        widgetId={widgetId}
      />
    </div>
  );
}
