import { GroupByProps, WidgetState } from '@kleeen/types';

import { PayloadAction } from '@reduxjs/toolkit';
import { UpdateDataStrategy } from '@kleeen/types';
import { WidgetActions } from '../../types/actions';

interface WidgetModel {
  initialState: WidgetState;
  reducers: Record<string, (state: WidgetState, action?: PayloadAction | any) => void>;
}

export const initialState: WidgetState = {
  data: {},
  error: null,
  isLoading: false,
  isLoadingAdditionalRows: false, //TODO: @marimba change this state for enums instead of separate booleans
  params: {},
};

export const model: WidgetModel = {
  initialState,
  reducers: {
    clearData(): WidgetState {
      return initialState;
    },

    getData(state: WidgetState): void {
      state.isLoading = true;
    },
    getDataSuccess(state: WidgetState, { payload }: WidgetActions.GetDataSuccess): void {
      const { response } = payload;

      if (response?.strategy === UpdateDataStrategy.PrependData) {
        state.strategy = response.strategy;
        state.tempData = response;
      } else {
        state.data = response;
        state.latestRequestTimestamp = response?.latestRequestTimestamp;
      }

      state.error = null;
      state.isLoading = false;
    },
    getDataFailure(state: WidgetState, { payload }: WidgetActions.GetDataFailure): void {
      const { response } = payload;

      state.error = response;
      state.isLoading = false;
    },

    getMoreData(state: WidgetState): void {
      state.isLoadingAdditionalRows = true;
    },
    getMoreDataSuccess(state: WidgetState, { payload }: WidgetActions.GetDataSuccess): void {
      const { response } = payload;
      const newData = {
        ...response,
        data: [...state.data.data, ...response.data],
      };

      state.data = newData;
      state.error = null;
      state.isLoadingAdditionalRows = false;
    },
    getMoreDataFailure(state: WidgetState, { payload }: WidgetActions.GetDataFailure): void {
      const { response } = payload;

      state.error = response;
      state.isLoading = false;
    },

    getGroupBy(state: WidgetState) {
      return state.params.groupBy;
    },
    setGroupBy(state: WidgetState, { payload }: PayloadAction<GroupByProps>): void {
      state.params.groupBy = payload;
    },

    prependData(state: WidgetState): void {
      state.data = {
        ...state.data,
        ...state.tempData,
        data: [...state.tempData.data, ...state.data.data],
      };
      state.latestRequestTimestamp = state.tempData.latestRequestTimestamp;

      state.strategy = null;
      state.tempData = null;
    },
  },
};
