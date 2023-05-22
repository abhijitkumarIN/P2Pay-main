import { Order, isNilOrEmpty } from '@kleeen/common/utils';
import { WidgetContextParams, WidgetState } from '@kleeen/types';

import { WidgetInitialState } from '../store/ducks/widget';
import { getWidgetContextName } from '../helpers';
import merge from 'lodash.merge';
import { useEffect } from 'react';
import { useInjectReducerToStore } from './use-inject-reducer-to-store';
import { useKleeenActions } from './useKleeenActions';
import { useKleeenContext } from './useKleeenContext';
import { useUrlQueryParams } from './use-url-query-params';

export interface WidgetContextProps {
  params: WidgetContextParams;
  taskName: string;
  widgetId: string;
}

export function useWidgetContext({ params, taskName, widgetId }: WidgetContextProps): WidgetState {
  const { filters, operationName } = params;
  const order = params.sorting?.length ? params.sorting[0].sort : Order.none;
  const orderBy = params.sorting?.length ? params.sorting[0].columnName : '';
  const isCustomWidget = isNilOrEmpty(operationName);

  if (isCustomWidget) return WidgetInitialState;

  const widgetContext = getWidgetContextName({ taskName, widgetId });
  const isContextReady = useInjectReducerToStore(widgetContext);
  const widgetActions = useKleeenActions(widgetContext);
  const widgetData: WidgetState = useKleeenContext(widgetContext);
  const { status = { version: 0 } } = useKleeenContext(taskName) ?? {};
  const { paramsBasedOnRoute: paramsBasedOnRouteWithFilters, version: urlQueryParamsVersion } =
    useUrlQueryParams({
      extraParamsToInclude: filters,
      useNestedObjects: true,
    });

  const canContinue = isContextReady && !isNilOrEmpty(widgetActions);

  useEffect(() => {
    if (!canContinue) return;

    const mixedParams = merge({}, params, widgetData?.params);

    widgetActions.getData({
      params: {
        ...mixedParams,
        filters: {
          ...paramsBasedOnRouteWithFilters,
          ...mixedParams.filters,
        },
      },
      taskName,
      widgetId,
    });
  }, [
    urlQueryParamsVersion,
    status.version,
    params.sorting?.length,
    order,
    orderBy,
    JSON.stringify(widgetData?.params),
  ]);

  useEffect(() => {
    if (!canContinue) return;

    return () => {
      widgetActions.clearData();
    };
  }, [canContinue]);

  return widgetData || WidgetInitialState;
}
