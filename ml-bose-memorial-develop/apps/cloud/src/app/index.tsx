import { ErrorFallback, ReduxProvider, StylesProvider } from './components';
import { LocalizationContextProvider, PreviewPanelLayoutProvider } from '@kleeen/react/hooks';
import { MessageShape, ToastNotification } from '@kleeen/react/atomic-elements';

import AppContainer from './app';
import { ErrorBoundary } from 'react-error-boundary';
import { KsCombineRightProviders } from '@kleeen/react/components';
import { Maybe } from '@kleeen/types';
import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';
import { useState } from 'react';

export function App() {
  const [errorInfo, setErrorInfo] = useState<Maybe<{ componentStack: string }>>();

  function FallbackComponent({ error }) {
    return <ErrorFallback error={error} info={errorInfo} />;
  }

  function handleError(error: Error, info: { componentStack: string }) {
    console.error(error);
    setErrorInfo(info);
  }

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent} onError={handleError}>
      <KsCombineRightProviders
        providers={[
          // *Primary Global Providers.
          StylesProvider,
          ReduxProvider,
          LocalizationContextProvider,
          SnackbarProvider,
          PreviewPanelLayoutProvider,
        ]}
      >
        <AppContainer />
      </KsCombineRightProviders>
    </ErrorBoundary>
  );
}

//#region Private members
interface SimpleProviderProps {
  children: JSX.Element;
}

function SnackbarProvider({ children }: SimpleProviderProps) {
  return (
    <NotistackSnackbarProvider
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      classes={{
        containerRoot: 'custom-noti-stack-container',
      }}
      content={(key, message) => <ToastNotification id={key} message={message as MessageShape} />}
      maxSnack={10}
    >
      {children}
    </NotistackSnackbarProvider>
  );
}
//#endregion
