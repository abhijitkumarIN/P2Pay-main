import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { actions as ActionsNotifications } from '../../custom/notifications';
import { actions as ActionsStructure } from './slice';
import { BaseApiService } from '@kleeen/frontend/utils';
import { v4 as uuidv4 } from 'uuid';

const notificationActions = ActionsNotifications.actions;
const actions = ActionsStructure.actions;

/**
 * Dispatch Custom Action
 * @desc Redux-Observable Epic which allows to dispatch a custom action in "heroesBrowser" workflow.
 */
export function dispatchCustomAction(action$) {
  return action$.pipe(
    ofType(actions.dispatchCustomAction.type),
    mergeMap(({ payload }) => {
      const { params, taskName, widgetId } = payload;

      return BaseApiService.genericDispatchCustomAction(params).pipe(
        map((request) => request.response),
        map((response) => response.data[params.operationName]),
        mergeMap((response) => [
          actions.dispatchCustomActionSuccess(),
          notificationActions.addNotification({
            key: uuidv4(),
            notification: {
              message: {
                actions: response?.data?.actions,
                functionName: response?.data?.functionName,
                message: response?.data?.customMessage,
                taskName,
                title: response?.data?.customTitle,
                variant: response?.data?.success ? 'success' : 'error',
              },
              options: {
                key: uuidv4(),
                persist: true,
              },
            },
          }),
        ]),
        catchError(BaseApiService.getErrorHandler(`${widgetId}`, 'dispatchCustomAction')),
        catchError(() => ActionsObservable.of(actions.dispatchCustomActionFailure())),
      );
    }),
  );
}
