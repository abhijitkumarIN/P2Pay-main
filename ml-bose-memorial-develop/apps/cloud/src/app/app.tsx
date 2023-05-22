import './app.scss';
import './assets/styles/custom.css';
import './assets/styles/custom.scss';

import {
  AttributeContextMenuProvider,
  CrosslinkingInteractionProvider,
  MenuContextProvider,
  ThemeContextProvider,
  WebSocketProvider,
  useKleeenContext,
  useLocalization,
  useServiceWorker,
} from '@kleeen/react/hooks';
import { DEFAULT_ROLE, app, roleAccessKey, roleAccessKeyCustom } from '@kleeen/settings';
import {
  IconRegistryProvider,
  AccessControlProvider as KsAccessControlProvider,
  TranslationProvider,
} from '@kleeen/core-react';
import { KsCombineRightProviders, KsNotifications } from '@kleeen/react/components';

import { CustomProviders } from './modules/custom/providers';
import React from 'react';
import Router from './routesLoader';
import ThemeWrapper from './themeWrapper';
import classnames from 'classnames';
import { environment } from '@kleeen/environment';
import iconRegistry from '../assets/icon-registry';
import { isReactNativeInfusion } from '@kleeen/frontend/utils';
import { merge } from 'lodash';
import { stringsTranslate } from '@kleeen/settings';

const applyInfusion = isReactNativeInfusion();
const bem = 'app';

merge(roleAccessKey, roleAccessKeyCustom);

function App() {
  const { language } = useLocalization();
  useServiceWorker();

  return (
    <React.StrictMode>
      <div className={classnames(bem, { infusion: applyInfusion })}>
        <KsCombineRightProviders
          providers={[
            // *Secondary Global Providers which depend on Primary Global Providers.
            TranslateProvider({ locale: language }),
            WebSocketProvider,
            ThemeContextProvider,
            MenuContextProvider,
            IconRegistryProvider({ iconRegistry }),
            AttributeContextMenuProvider,
            AccessControlProvider,
            CrosslinkingProvider,
            ...CustomProviders,
          ]}
        >
          <>
            <KsNotifications />
            <ThemeWrapper>
              <Router />
              <footer data-testid="app-version">{environment.deployment.version}</footer>
            </ThemeWrapper>
          </>
        </KsCombineRightProviders>
      </div>
    </React.StrictMode>
  );
}

export default App;

//#region Private members
interface SimpleProviderProps {
  children: JSX.Element;
}

function AccessControlProvider({ children }: SimpleProviderProps) {
  return (
    <KsAccessControlProvider
      accessControlSettings={{
        defaultRole: DEFAULT_ROLE,
        pathToRoleOnState: 'endUser.currentUser.role',
        permissions: roleAccessKey,
      }}
    >
      {children}
    </KsAccessControlProvider>
  );
}

function CrosslinkingProvider({ children }: SimpleProviderProps) {
  const { crossLinkingInteraction } = app;

  return (
    <CrosslinkingInteractionProvider crosslinkingInteraction={crossLinkingInteraction}>
      {children}
    </CrosslinkingInteractionProvider>
  );
}

interface TranslateProviderProps {
  locale: string;
}

function TranslateProvider({ locale }: TranslateProviderProps) {
  return TranslationProvider({
    defaultLocale: 'en',
    locale,
    localeData: stringsTranslate,
    onError: (err: string): void => {
      console.error('TranslateProvider', err);
    },
  });
}
//#endregion
