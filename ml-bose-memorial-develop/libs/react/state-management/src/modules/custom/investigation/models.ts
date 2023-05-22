import { AddWidget, CustomAction, InitializeWidgets } from '../../../types/actions/investigation';

import { InvestigationState } from '../../../types/state';

const initialState: InvestigationState = {
  investigationWidgets: [],
};

const Investigation = {
  initialState,
  reducers: {
    addWidget: (state: InvestigationState, { payload: newInvestigationWidget }: AddWidget) => {
      state.investigationWidgets = [
        { ...newInvestigationWidget, isNewWidget: true },
        ...state.investigationWidgets,
      ];
    },

    clearInvestigation(state: InvestigationState): void {
      state.investigationWidgets = [];
    },

    initializeWidgets: (state: InvestigationState, { payload }: InitializeWidgets) => {
      state.investigationWidgets = [...payload];
    },

    dispatchCustomAction: (state: InvestigationState, { payload }: CustomAction) => {
      const widgetExists = state.investigationWidgets.some((w) => w.id === payload?.widgetId);
      if (!widgetExists) {
        console.error('Invalid state', payload);
        return state;
      }
    },

    dispatchCustomActionSuccess: (state: InvestigationState) => {
      return state;
    },

    dispatchCustomActionFailure: (state: InvestigationState) => {
      return state;
    },
  },
};

export default Investigation;
