import { KsRankedListItem, KsSimpleList } from '@kleeen/react/components';
import { formatDataList, formatSeverity, parseAttributes } from '@kleeen/frontend/utils';

import { WidgetProps } from '@kleeen/types';
import { useStyles } from './ranked-list-widget.styles';
import { useWidgetContext } from '@kleeen/react/hooks';

export function RankedListWidget({ attributes, chartType, params, taskName, widgetId }: WidgetProps) {
  const classes = useStyles();
  const widgetData = useWidgetContext({ taskName, widgetId, params }) || { data: {} };

  const { format, crossLinking, results } = widgetData.data || {};
  const listColumns = parseAttributes(attributes, format);
  const hideHeader = false;
  const { data, metadata } = formatDataList({ crossLinking, results, format, params, includeMinMax: true });
  const newWidgetData = {
    isLoading: false,
    ...widgetData,
    data,
    format: formatSeverity(format, params),
  };

  return (
    <div className={classes.widgetContent}>
      <KsSimpleList
        columns={listColumns}
        data={newWidgetData.data}
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
  );
}
