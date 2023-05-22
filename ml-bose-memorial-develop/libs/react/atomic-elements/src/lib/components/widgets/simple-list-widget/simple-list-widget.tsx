import { formatDataList, formatSeverity, parseAttributes } from '@kleeen/frontend/utils';

import { KsSimpleList } from '@kleeen/react/components';
import { WidgetProps } from '@kleeen/types';
import classnames from 'classnames';
import { useStyles } from './simple-list-widget.styles';
import { useWidgetContext } from '@kleeen/react/hooks';

const bem = 'ks-table';

export function SimpleListWidget({ attributes, chartType, params, taskName, widgetId }: WidgetProps) {
  const classes = useStyles();
  const widgetData = useWidgetContext({ taskName, widgetId, params }) || { data: {} };

  const { format, crossLinking, results } = widgetData.data || {};
  const listColumns = parseAttributes(attributes, format);
  const hideHeader = false;
  const { data } = formatDataList({ crossLinking, results, format, params });
  const newWidgetData = {
    isLoading: false,
    ...widgetData,
    data,
    format: formatSeverity(format, params),
  };

  return (
    <div className={classnames(bem, classes.widgetContent)}>
      <KsSimpleList
        columns={listColumns}
        data={newWidgetData.data}
        hideHeader={hideHeader}
        listItemOptions={{
          chartType,
          widgetId,
        }}
      />
    </div>
  );
}
