import { State } from '@kleeen/react/state-management';

export interface OnBoardingSettings {
  isCustomWidget: boolean;
  isEnable: boolean;
  title: string;
  titleDescription?: string;
  widgetContent?: string;
  showOnboardingPagePath?: string;
}

export type DismissOnboardingProps = () => void;

export type InvokeHandleDismissProps = (dismissOnboarding: DismissOnboardingProps) => void;

export type EndUserActions = { setCurrentUser: (currentUser: State.CurrentUser) => void };
export type PreferencesActionsType = {
  setOnBoardingPreference: (onBoardingSetting?: State.OnBoardingPreferences) => void;
};
