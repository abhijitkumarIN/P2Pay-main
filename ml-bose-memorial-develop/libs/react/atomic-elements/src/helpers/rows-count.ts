import { Widget, WidgetTypes } from '@kleeen/types';
import { useLocalStorage, useWidgetContext } from '@kleeen/react/hooks';

import { isNilOrEmpty } from '@kleeen/common/utils';

export function getRowsCountByWidget(taskName: string, widget?: Widget): number {
  if (isNilOrEmpty(widget) || isNilOrEmpty(widget.params)) {
    return 0;
  }
  const { id: widgetId, params, attributes } = widget;
  const keySortingLocalStorage = `sorting-widget-${widgetId}`;

  const { localStorageValue: sorting } = useLocalStorage(keySortingLocalStorage, []);

  const currentWidgetData = useWidgetContext({
    taskName,
    widgetId,
    params: { ...params, attributes, sorting },
  });
  const rowsRetrieved =
    currentWidgetData.data?.pagination?.totalCount ?? currentWidgetData.data?.data?.length ?? 0;
  return rowsRetrieved;
}

export function getRowsCountFromFirstTable(widgets: Widget[], taskName: string): number {
  const currentWidget = widgets.find((w) => w.chartType === WidgetTypes.FULL_TABLE);
  return getRowsCountByWidget(taskName, currentWidget);
}
