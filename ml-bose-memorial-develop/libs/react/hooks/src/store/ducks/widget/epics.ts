import * as Helpers from '../../helpers';

import { ActionsObservable, Epic, StateObservable } from 'redux-observable';

import { Action } from 'redux';
import { BaseApiService } from '@kleeen/frontend/utils';
import { WidgetActions } from '../../types';
import { getWidgetContextName } from '@kleeen/react/hooks';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { map } from 'rxjs/operators';

export function getData(input: WidgetActions.GetDataInput, latestRequestTimestamp?: number): any {
  if (isNilOrEmpty(input)) {
    throw SyntaxError('Input has an invalid value');
  }

  const { params } = input;
  const { operationName = 'getData' } = params;

  return BaseApiService.graphqlChartWidgetQuery(params, latestRequestTimestamp).pipe(
    map((request) => request.response),
    map((response) => response.data[operationName]),
  );
}

export function generateEpics(actions: WidgetActions.Actions): {
  [key: string]: (action$: ActionsObservable<Action>, state$?: StateObservable<any>) => Epic;
} {
  return {
    getWidgetData(action$: ActionsObservable<Action>, state$: StateObservable<any>): Epic {
      const prepareRequest = (action: WidgetActions.GetData) => {
        const { payload } = action;
        const widgetContextName = getWidgetContextName({
          taskName: payload.taskName,
          widgetId: payload.widgetId,
        });

        const latestRequestTimestamp = state$.value[widgetContextName]?.latestRequestTimestamp;

        return getData(payload, latestRequestTimestamp);
      };

      const onRequestSuccess = (response: any): Action[] => {
        return [actions.getDataSuccess({ response })];
      };

      const onRequestFailure = (error: Error): Action => {
        return actions.getDataFailure({ response: error });
      };

      return Helpers.doRequest(
        action$,
        actions.getData.type,
        prepareRequest,
        onRequestSuccess,
        onRequestFailure,
      );
    },
    getMoreRowsData(action$: ActionsObservable<Action>): Epic {
      const prepareRequest = (action: WidgetActions.GetData) => {
        const { payload } = action;
        return getData(payload);
      };

      const onRequestSuccess = (response: any): Action[] => {
        return [actions.getMoreDataSuccess({ response })];
      };

      const onRequestFailure = (error: Error): Action => {
        return actions.getMoreDataFailure({ response: error });
      };

      return Helpers.doRequest(
        action$,
        actions.getMoreData.type,
        prepareRequest,
        onRequestSuccess,
        onRequestFailure,
      );
    },
  };
}
