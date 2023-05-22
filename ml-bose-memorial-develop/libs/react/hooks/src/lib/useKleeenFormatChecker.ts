import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { useEffect, useState } from 'react';

import { BaseApiService } from '@kleeen/frontend/utils';
import { DEBOUNCE_WAIT } from '@kleeen/types';
import { Subject } from 'rxjs';
import { pathOr } from 'ramda';

interface Validation {
  isValid: boolean;
  errors?: { message: string }[];
}

const FORMAT_VALIDATION_RESPONSE = { isValid: null, errors: null };

export const useKleeenFormatChecker = ({
  taskName,
  widgetId,
  formField,
}): [{ validateFormField: (term: string) => void; resetValidationResponse: () => void }, Validation] => {
  const [subject, setSubject] = useState(null);
  const [validationResponse, setValidationResponse] = useState<Validation>(FORMAT_VALIDATION_RESPONSE);

  const resetValidationResponse = () => {
    setValidationResponse(FORMAT_VALIDATION_RESPONSE);
  };

  const validateFormField = (formValue: string) => {
    if (subject) subject.next(formValue);
  };

  useEffect(() => {
    if (subject === null) {
      const sub = new Subject();
      setSubject(sub);
    } else {
      const observable = subject
        .pipe(
          map((formValue: string | number) => formValue.toString()),
          map((formValue: string) => formValue.trim()),
          distinctUntilChanged(),
          debounceTime(DEBOUNCE_WAIT),
          switchMap((formValue: string) =>
            BaseApiService.graphqlFormatCheck({ taskName, widgetId, formField, formValue }).pipe(
              map((request) => request.response),
              catchError(BaseApiService.getErrorHandler(`useKleeenFormatChecker`, 'formatCheck')),
            ),
          ),
        )
        .subscribe(
          (res) => {
            setValidationResponse(pathOr(FORMAT_VALIDATION_RESPONSE, ['data', 'formatCheck'], res));
          },
          (err) => {
            console.error('err >> ', err);
            setValidationResponse(FORMAT_VALIDATION_RESPONSE);
          },
        );

      return () => {
        observable.unsubscribe();
        subject.unsubscribe();
      };
    }
  }, [subject]);

  return [{ validateFormField, resetValidationResponse }, validationResponse];
};
