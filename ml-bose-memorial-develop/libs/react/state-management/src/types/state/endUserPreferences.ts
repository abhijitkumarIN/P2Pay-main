export interface EndUserPreferences {
  onBoardingPreferences: OnBoardingPreferences;
  isLoading: boolean;
}

export interface OnBoardingPreferences {
  config: any;
  showOnBoarding: boolean;
  success: boolean;
}
