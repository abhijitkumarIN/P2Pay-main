import { OnBoardingTask, onBoardingSettings } from './modules/generated/components';
import React, { useState } from 'react';
import { globalVariable, isReactNativeInfusion } from '@kleeen/frontend/utils';
import { navigationInit, useKleeenActions, useKleeenContext } from '@kleeen/react/hooks';

import { Authenticator } from './modules/custom/components';
import { HookableContextMenu } from '@kleeen/react/atomic-elements';
import { KUIConnect } from '@kleeen/core-react';
import { Layout } from './layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { getModules } from './modules';
import { initializeThirdParties } from './modules/custom/third-parties';
import { isNotNilOrEmpty } from '@kleeen/common/utils';

const applyInfusion = isReactNativeInfusion();
const isAuthEnabled = true;
const modulesToLoad = [
  {
    folder: require.context('./modules/generated', true, /\.jsx$/),
    modulePath: './modules/generated',
  },
  {
    folder: require.context('./modules/custom', true, /\.jsx$/),
    modulePath: './modules/custom',
    priority: 2,
  },
  {
    folder: require.context('./modules/kleeen-managed', true, /\.tsx$/),
    modulePath: './modules/kleeen-managed',
    priority: 1,
  },
];

function PagesManager() {
  const { setCurrentUser } = useKleeenActions('endUser');
  const { currentUser } = useKleeenContext('endUser');
  const [modules, setModules] = useState(null);

  // TODO: @cafe investigate why this is being executed multiple times
  async function afterLoginSuccess({ currentAuthenticatedUser }) {
    const loadedModules = await getModules(modulesToLoad);
    const routerLinks = loadedModules.map((e) => e.path);

    syncUser(setCurrentUser, currentUser, currentAuthenticatedUser);
    setModules(loadedModules);
    globalVariable('routerLinks', routerLinks);
  }

  function routerHistory(elem) {
    if (applyInfusion) {
      navigationInit(elem?.history);
    }
  }

  initializeThirdParties(currentUser);

  return (
    <Router ref={routerHistory}>
      <Authenticator afterLoginSuccess={afterLoginSuccess} hideDefault={true} isEnabled={isAuthEnabled}>
        <RenderLayout modules={modules} />
      </Authenticator>
    </Router>
  );
}

function RenderLayout({ modules }) {
  const { onBoardingPreferences } = useKleeenContext('endUserPreferences');
  const showOnBoarding = isNotNilOrEmpty(onBoardingPreferences)
    ? onBoardingPreferences?.showOnBoarding
    : true;

  if (onBoardingSettings.isOnboardingEnable && showOnBoarding) {
    return <OnBoardingTask />;
  }

  return (
    <>
      <HookableContextMenu />
      <Layout modules={modules} />
    </>
  );
}

async function syncUser(setCurrentUser, currentUser, currentAuthenticatedUser) {
  try {
    const shouldUpdateCurrentUser =
      currentAuthenticatedUser?.username !== currentUser?.username ||
      currentAuthenticatedUser?.role !== currentUser?.role;

    if (shouldUpdateCurrentUser) {
      setCurrentUser(currentAuthenticatedUser);
    }
  } catch (err) {
    console.error(err);
  }
}

export default React.memo(
  KUIConnect(({ locale, setLocale }) => ({
    locale,
    setLocale,
  }))(PagesManager),
);
