import { IUser } from '@kleeen/auth';

export interface CurrentUser extends IUser {
  userPreference: {
    showOnboardingPage: boolean;
  };
}

export interface EndUser {
  currentUser: CurrentUser;
}
