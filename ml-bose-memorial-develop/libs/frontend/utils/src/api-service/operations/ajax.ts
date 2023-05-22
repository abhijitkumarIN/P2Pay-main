import { KSAuth } from '@kleeen/auth';
import { _throw } from 'rxjs/observable/throw';
import { from } from 'rxjs';
import { removeTrailingSlash } from '@kleeen/common/utils';
import { ajax as rxAjax } from 'rxjs/ajax';
import { switchMap } from 'rxjs/operators';

export function ajax(
  method: string,
  url: string,
  responseType: string,
  body: string,
  headers: Record<string, string>,
  endpointUrl: string,
  customUrl?: string,
) {
  return from(KSAuth.currentSession()).pipe(
    switchMap((currentSession) => {
      if (!currentSession?.isValid()) {
        return _throw({
          error: new Error('Invalid session'),
        });
      }
      const token = currentSession.getIdToken().getJwtToken();
      const operationContext = {
        url: customUrl ? url : `${endpointUrl}/${removeTrailingSlash(url)}`,
        method,
        responseType,
        headers: { token, ...headers },
        body,
      };
      const operationContextUpdated = KSAuth.setContext(operationContext);
      return rxAjax(operationContextUpdated);
    }),
  );
}
