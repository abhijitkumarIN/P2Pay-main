import React, { ReactElement, useEffect } from 'react';
import { useKleeenActions, useKleeenContext } from '@kleeen/react/hooks';

import { KUIConnect } from '@kleeen/core-react';
import { Loader } from '@kleeen/react/components';
import { Onboarding } from '../../../custom/components';
import ReactMarkdown from 'react-markdown';
import { Settings } from './on-boarding.settings';
import { State } from '@kleeen/react/state-management';
import { useStyles } from './on-boarding.styles';

const endUserPreferencesKey = 'endUserPreferences';

const OnBoardingView = (): ReactElement => {
  const { onBoardingPreferences, isLoading } =
    useKleeenContext<State.EndUserPreferences>(endUserPreferencesKey);
  const preferencesActions = useKleeenActions(endUserPreferencesKey);
  const { isCustomWidget, widgetContent } = Settings;
  const classes = useStyles();

  useEffect(() => {
    preferencesActions.getOnBoardingPreferences();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.onBoardingTask}>
      <div className={classes.onBoardingGridSection}>
        {isCustomWidget ? (
          <Onboarding preferencesActions={preferencesActions} onBoardingPreferences={onBoardingPreferences} />
        ) : (
          <ReactMarkdown className={classes.preview}>{widgetContent}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export const OnBoardingTask = KUIConnect(({ translate }) => ({ translate }))(OnBoardingView);

export const onBoardingSettings = {
  isOnboardingEnable: (Settings || false) && Settings.isEnable,
  ...(Settings || {}),
};
