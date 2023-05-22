import { ReactElement, useEffect } from 'react';
import { useMasonry, useWidgetContext } from '@kleeen/react/hooks';

import { Loader } from '@kleeen/react/components';
import { SummaryStatistics } from '../../summary-statistics';
import { WidgetProps } from '@kleeen/types';

export function SummaryStatisticsWidget({
  attributes,
  chartType,
  params,
  taskName,
  widgetId,
}: WidgetProps): ReactElement {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const { updateLayout } = useMasonry();

  const { data, isLoading } = widgetData;

  useEffect(() => {
    const minCardHeight = 60;
    updateLayout(minCardHeight);
  }, [widgetData]);

  if (isLoading) return <Loader />;

  return (
    <SummaryStatistics
      attributes={attributes}
      chartType={chartType}
      data={data}
      params={params}
      widgetId={widgetId}
    />
  );
}
