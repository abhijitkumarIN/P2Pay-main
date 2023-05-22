import { GenericFunctions } from '@kleeen/types';
import { KsButton } from '@kleeen/react/components';
import { State } from '@kleeen/react/state-management';

interface OnboardingProps {
  onBoardingPreferences: State.OnBoardingPreferences;
  preferencesActions: GenericFunctions;
}

export function Onboarding({ onBoardingPreferences, preferencesActions }: OnboardingProps): JSX.Element {
  function myOwnCustomHandleDismiss(): void {
    preferencesActions.setOnBoardingPreference({ showOnBoarding: false });
  }

  return (
    <>
      <div>
        <p>
          Open the code for <strong>Custom Onboarding</strong>'s view at
        </p>
        <cite style={{ color: 'var(--secondary-color)', overflowWrap: 'break-word' }}>
          apps/cloud/src/app/modules/custom/components/onboarding/index.tsx
        </cite>
        <p>Update the content and save the file to see your changes.</p>
      </div>
      <div>
        <KsButton onClick={myOwnCustomHandleDismiss}>Go to product</KsButton>
      </div>
    </>
  );
}
