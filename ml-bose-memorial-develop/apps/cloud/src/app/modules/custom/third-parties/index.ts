import { State } from '@kleeen/react/state-management';
import { thirdPartyInitialize } from './third-party-initialize';

export const initializeThirdParties = (currentUser: State.CurrentUser) => {
  thirdPartyInitialize.forEach((initializeFunc: (currentUser: State.CurrentUser) => void) => {
    initializeFunc(currentUser);
  });
};
