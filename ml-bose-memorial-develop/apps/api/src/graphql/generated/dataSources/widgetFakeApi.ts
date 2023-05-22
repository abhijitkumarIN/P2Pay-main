/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0 */
import {
  CustomActionArgs,
  DataListingArgs,
  DataAggregationArgs,
  MultiTransFormationArgs,
} from '../../../types';
import { DataSource } from 'apollo-datasource';
import {
  dispatchCustomAction,
  getSummaryData,
  getListingData,
  getWidgetData,
  getMultiTransFormationData,
} from '../../../realisticFakeData';

export class WidgetFakeApi extends DataSource {
  async custom_action_8c2f4a58_4c24_4144_bf2b_36a3f21546f8(args: CustomActionArgs) {
    return dispatchCustomAction(args);
  }

  async custom_action_99709b90_9301_4b69_a48e_85d585c6b087(args: CustomActionArgs) {
    return dispatchCustomAction(args);
  }

  async entity_detail_10ab0e2e_86cc_4194_836f_b7c8afc7d246(args: DataListingArgs) {
    return getSummaryData(args);
  }

  async entity_detail_c8f8ce4c_4dd8_467e_bdfd_f9cc95e9fa16(args: DataListingArgs) {
    return getSummaryData(args);
  }

  async object_listing_3c304aaf_0d6a_463b_96ad_b710f8d7e667(args: DataListingArgs) {
    return getListingData(args);
  }

  async object_listing_7ff9861e_5fd0_46ba_80ca_6e0fdd9b8c22(args: DataListingArgs) {
    return getListingData(args);
  }

  async widget_2e0f566d_8cbc_4d18_b8af_45751bd1a1e2(args: DataAggregationArgs) {
    return getWidgetData(args);
  }

  async widget_d69d1193_a237_43a8_92c1_9dc2d7d919c4(args: DataAggregationArgs) {
    return getWidgetData(args);
  }

  async widget_statistics15778bdf_5ed3_49b8_b1c2_7b79a99fa00c(args: MultiTransFormationArgs) {
    return getMultiTransFormationData(args);
  }

  async widget_statistics19a4362f_759a_4a7d_ba27_c421b5de97b4(args: MultiTransFormationArgs) {
    return getMultiTransFormationData(args);
  }

  async widget_statistics766bfbac_d2e1_4544_b72f_939ccaa9edf3(args: MultiTransFormationArgs) {
    return getMultiTransFormationData(args);
  }

  async widget_statisticsa8343ab6_da03_4bb2_be6e_27fea7c48f5a(args: MultiTransFormationArgs) {
    return getMultiTransFormationData(args);
  }
}
