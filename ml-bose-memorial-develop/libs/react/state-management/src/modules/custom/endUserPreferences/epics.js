import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { actions as ActionsStructure } from './slice';
import { BaseApiService } from '@kleeen/frontend/utils';

const actions = ActionsStructure.actions;

/**
 * Epics/endUserPreferences
 * @desc get
 */
export function getOnBoardingUserPreferences(action$) {
  return action$.pipe(
    ofType(actions.getOnBoardingPreferences.type),
    switchMap((action) => {
      return BaseApiService.graphqlPreferencesQueries.getOnboardingPreferences(action.payload).pipe(
        map((request) => request.response),
        mergeMap((request) => {
          const [onboardingPreferences] = Object.values(request.data);

          return [actions.getOnBoardingPreferencesSuccess(onboardingPreferences)];
        }),
        catchError((request) =>
          ActionsObservable.of(actions.getOnBoardingPreferencesFailure(request?.response)),
        ),
      );
    }),
  );
}

export function setOnBoardingUserPreferences(action$) {
  return action$.pipe(
    ofType(actions.setOnBoardingPreference.type),
    switchMap((action) => {
      return BaseApiService.graphqlPreferencesQueries.setOnBoardingPreferences(action.payload).pipe(
        map((request) => request.response),
        mergeMap((request) => {
          const [onboardingPreferences] = Object.values(request.data);

          return [actions.setOnBoardingPreferencesSuccess(onboardingPreferences)];
        }),
        catchError((request) =>
          ActionsObservable.of(actions.setOnBoardingPreferencesFailure(request?.response)),
        ),
      );
    }),
  );
}
