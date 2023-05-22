const endUserPreferences = {
  initialState: {
    onBoardingPreferences: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    getOnBoardingPreferences: (state, action) => {
      state.isLoading = true;
    },
    getOnBoardingPreferencesSuccess: (state, action) => {
      state.isLoading = false;
      const { payload } = action;
      state.onBoardingPreferences = payload;
    },
    getOnBoardingPreferencesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setOnBoardingPreference: (state, action) => {
      state.onBoardingPreferences = action.payload || { showOnBoarding: false };
      state.isLoading = true;
    },
    setOnBoardingPreferencesSuccess: (state, action) => {
      state.isLoading = false;
      const { payload = {} } = action;
      state.onBoardingPreferences = { ...state.onBoardingPreferences, ...payload };
    },
    setOnBoardingPreferencesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
};

export default endUserPreferences;
