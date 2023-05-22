import { PayloadAction, PayloadActionCreator } from '@reduxjs/toolkit';
import { UrlQueryParams, VizParams } from '@kleeen/types';

export interface GetDataInput {
  params: VizParams;
  paramsBasedOnRoute: UrlQueryParams;
  taskName: string;
  widgetId: string;
}

/**
 * Get widget data
 */

export type GetData = PayloadAction<GetDataInput>;
export type GetDataFailure = PayloadAction<any>;
export type GetDataSuccess = PayloadAction<any>;

export interface Actions {
  getData: PayloadActionCreator<GetData>;
  getDataFailure: PayloadActionCreator<any>;
  getDataSuccess: PayloadActionCreator<any>;
  getMoreData: PayloadActionCreator<GetData>;
  getMoreDataFailure: PayloadActionCreator<any>;
  getMoreDataSuccess: PayloadActionCreator<any>;
}
