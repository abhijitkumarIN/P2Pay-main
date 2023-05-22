import { KsRankedListItem, KsSimpleList, Loader } from '@kleeen/react/components';
import { ReactElement, useEffect } from 'react';
import {
  formatDataList,
  getDataPointsFromHighchartsEventClick,
  parseAttributes,
} from '@kleeen/frontend/utils';
import {
  useAttributeContextMenu,
  useGetNavigationStyle,
  useIsPreview,
  useMasonry,
  useWidgetContext,
  useWindowsDimension,
  useWorkflowContext,
} from '@kleeen/react/hooks';

import { BubbleChartWidgetProps } from './bubble-chart-widget.model';
import { KsBubbleChart } from '../../bubble-chart';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './bubble-chart-widget.styles';

export function BubbleChartWidget({
  attributes,
  chartType,
  disableHeightCalculation,
  params,
  taskName,
  widgetId,
}: BubbleChartWidgetProps): ReactElement {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const { format, crossLinking, results } = widgetData.data || {};
  const listColumns = parseAttributes(attributes, format);
  const { data, metadata } = formatDataList({ crossLinking, results, format, params, includeMinMax: true });
  const hideHeader = false;
  const { updateLayout } = useMasonry();
  const size = useWindowsDimension();
  const { isNavTop } = useGetNavigationStyle();
  const { openMenu } = useAttributeContextMenu();
  const workflowData = useWorkflowContext();

  const breakPoint = isNavTop ? 1069 : 1260;
  const bigWidget = size.width > breakPoint && disableHeightCalculation;
  const classes = useStyles({ bigWidget });
  const isPreview = useIsPreview();

  //TODO: this has to be removed when we will implement the enhancement to disable the crosslinking interaction by the widget
  const [firstAttribute] = attributes;
  const isDisableCrossLinking = firstAttribute?.isDisableCrossLinking;

  useEffect(() => {
    const cardHeight = 548;
    updateLayout(cardHeight);
  }, [widgetData]);

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
      <KsBubbleChart
        attributes={attributes}
        base={params.baseModel}
        bigWidget={bigWidget}
        context={widgetData}
        onDataPointClickEvent={handleDataPointClickEvent}
        params={params}
        widgetId={widgetId}
      />
      {bigWidget && (
        <div style={{ height: 'calc(var(--wh-8XL) - var(--wh-2XL))', width: '50%' }}>
          <KsSimpleList
            columns={listColumns}
            data={data}
            hideHeader={hideHeader}
            listItemOptions={{
              chartType,
              widgetId,
            }}
            listOptions={{
              ListItemComponent: KsRankedListItem,
              sortBy: metadata?.valueColumnName,
            }}
            metadata={metadata}
          />
        </div>
      )}
    </div>
  );
}
