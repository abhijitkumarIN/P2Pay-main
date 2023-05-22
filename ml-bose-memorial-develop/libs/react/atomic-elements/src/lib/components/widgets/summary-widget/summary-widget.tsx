import { ReactElement } from 'react';
import { SummaryPanel } from '../../summary-panel';
import { ListingAttribute, WidgetProps } from '@kleeen/types';

export function SummaryWidget({
  attributes,
  chartType,
  params,
  taskName,
  widgetId,
}: WidgetProps): ReactElement {
  const summaryItems: ListingAttribute = {
    attributes,
    chartType,
    id: widgetId,
    params,
  };

  return (
    <SummaryPanel
      entityDetails={[summaryItems]}
      isEditing={false}
      isFromButtonSummary
      layoutProps={{
        columnGap: 55,
        containerPadding: 32,
        keyValuePadding: 21,
        keyWidth: 144,
        valueWidth: 178,
      }}
      registerEvents={null}
      taskName={taskName}
    />
  );
}
