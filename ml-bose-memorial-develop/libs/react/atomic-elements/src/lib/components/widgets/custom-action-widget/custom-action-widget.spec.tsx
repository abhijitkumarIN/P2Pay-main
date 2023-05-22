import '@testing-library/jest-dom';

import { Action, ActionType } from '@kleeen/types';
import {
  TranslateProvider,
  mockDefaultTaskName,
  mockUseLocationDetailsValue,
  ksDefaultRender as render,
  actions as sliceActions,
} from '@kleeen/testing/front-end';

import { CustomActionWidget } from '@kleeen/react/atomic-elements';
import { KsCombineRightProviders } from '@kleeen/react/components';
import { screen } from '@testing-library/react';

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Record<string, unknown>),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationDetailsValue;
  }),
}));

jest.mock('@kleeen/react/state-management', () => ({
  ...(jest.requireActual('@kleeen/react/state-management') as Record<string, unknown>),
  get actions() {
    return {
      [mockDefaultTaskName]: sliceActions.actions,
    };
  },
}));

const Wrapper = ({ children }) => (
  <KsCombineRightProviders providers={[TranslateProvider({ locale: 'en' })]}>
    {children}
  </KsCombineRightProviders>
);

test('show action button widget', () => {
  const buttonText = 'Hire Employee';
  const widgetId = 'testingWidget1';

  const actionWidget: Action[] = [
    {
      areYouSure: false,
      displayName: buttonText,
      name: 'hireEmployee',
      type: ActionType.Custom,
    },
  ];

  const params = {
    baseModel: 'TBD',
    displayName: 'Hire Employee',
    operationName: 'custom_action_ID_TBD',
  };

  render({
    component: (
      <Wrapper>
        <CustomActionWidget
          actions={actionWidget}
          attributes={undefined}
          params={params}
          taskName={mockDefaultTaskName}
          widgetId={widgetId}
        />
      </Wrapper>
    ),
  });

  expect(screen.getByText(buttonText)).toBeInTheDocument();
});
