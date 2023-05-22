/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0, max-lines: 0 */
import { RESTDataSource } from 'apollo-datasource-rest';
import {
  CustomActionArgs,
  DataListingArgs,
  DataAggregationArgs,
  MultiTransFormationArgs,
  AuthContext,
} from '../../../types';
import { custom_action_8c2f4a58_4c24_4144_bf2b_36a3f21546f8 } from '../../custom/widgetResolvers/custom_action_8c2f4a58_4c24_4144_bf2b_36a3f21546f8';
import { custom_action_99709b90_9301_4b69_a48e_85d585c6b087 } from '../../custom/widgetResolvers/custom_action_99709b90_9301_4b69_a48e_85d585c6b087';
import { entity_detail_10ab0e2e_86cc_4194_836f_b7c8afc7d246 } from '../../custom/widgetResolvers/entity_detail_10ab0e2e_86cc_4194_836f_b7c8afc7d246';
import { entity_detail_c8f8ce4c_4dd8_467e_bdfd_f9cc95e9fa16 } from '../../custom/widgetResolvers/entity_detail_c8f8ce4c_4dd8_467e_bdfd_f9cc95e9fa16';
import { object_listing_3c304aaf_0d6a_463b_96ad_b710f8d7e667 } from '../../custom/widgetResolvers/object_listing_3c304aaf_0d6a_463b_96ad_b710f8d7e667';
import { object_listing_7ff9861e_5fd0_46ba_80ca_6e0fdd9b8c22 } from '../../custom/widgetResolvers/object_listing_7ff9861e_5fd0_46ba_80ca_6e0fdd9b8c22';
import { widget_2e0f566d_8cbc_4d18_b8af_45751bd1a1e2 } from '../../custom/widgetResolvers/widget_2e0f566d_8cbc_4d18_b8af_45751bd1a1e2';
import { widget_d69d1193_a237_43a8_92c1_9dc2d7d919c4 } from '../../custom/widgetResolvers/widget_d69d1193_a237_43a8_92c1_9dc2d7d919c4';
import { widget_statistics15778bdf_5ed3_49b8_b1c2_7b79a99fa00c } from '../../custom/widgetResolvers/widget_statistics15778bdf_5ed3_49b8_b1c2_7b79a99fa00c';
import { widget_statistics19a4362f_759a_4a7d_ba27_c421b5de97b4 } from '../../custom/widgetResolvers/widget_statistics19a4362f_759a_4a7d_ba27_c421b5de97b4';
import { widget_statistics766bfbac_d2e1_4544_b72f_939ccaa9edf3 } from '../../custom/widgetResolvers/widget_statistics766bfbac_d2e1_4544_b72f_939ccaa9edf3';
import { widget_statisticsa8343ab6_da03_4bb2_be6e_27fea7c48f5a } from '../../custom/widgetResolvers/widget_statisticsa8343ab6_da03_4bb2_be6e_27fea7c48f5a';
import { workflow_filters_2f623334_42ad_4472_b4e5_ff46154020b6 } from '../../custom/widgetResolvers/workflow_filters_2f623334_42ad_4472_b4e5_ff46154020b6';

// If you need to access the current user, the token and data sources,
// you can get them from 'this.context'
export class WidgetApi extends RESTDataSource {
  async custom_action_8c2f4a58_4c24_4144_bf2b_36a3f21546f8(args: CustomActionArgs) {
    return custom_action_8c2f4a58_4c24_4144_bf2b_36a3f21546f8(args, this.context);
  }

  async custom_action_99709b90_9301_4b69_a48e_85d585c6b087(args: CustomActionArgs) {
    return custom_action_99709b90_9301_4b69_a48e_85d585c6b087(args, this.context);
  }

  async entity_detail_10ab0e2e_86cc_4194_836f_b7c8afc7d246(args: DataListingArgs) {
    return entity_detail_10ab0e2e_86cc_4194_836f_b7c8afc7d246(args, this.context);
  }

  async entity_detail_c8f8ce4c_4dd8_467e_bdfd_f9cc95e9fa16(args: DataListingArgs) {
    return entity_detail_c8f8ce4c_4dd8_467e_bdfd_f9cc95e9fa16(args, this.context);
  }

  async object_listing_3c304aaf_0d6a_463b_96ad_b710f8d7e667(args: DataListingArgs) {
    return object_listing_3c304aaf_0d6a_463b_96ad_b710f8d7e667(args, this.context);
  }

  async object_listing_7ff9861e_5fd0_46ba_80ca_6e0fdd9b8c22(args: DataListingArgs) {
    return object_listing_7ff9861e_5fd0_46ba_80ca_6e0fdd9b8c22(args, this.context);
  }

  async widget_2e0f566d_8cbc_4d18_b8af_45751bd1a1e2(args: DataAggregationArgs) {
    return widget_2e0f566d_8cbc_4d18_b8af_45751bd1a1e2(args, this.context);
  }

  async widget_d69d1193_a237_43a8_92c1_9dc2d7d919c4(args: DataAggregationArgs) {
    return widget_d69d1193_a237_43a8_92c1_9dc2d7d919c4(args, this.context);
  }

  async widget_statistics15778bdf_5ed3_49b8_b1c2_7b79a99fa00c(args: MultiTransFormationArgs) {
    return widget_statistics15778bdf_5ed3_49b8_b1c2_7b79a99fa00c(args, this.context);
  }

  async widget_statistics19a4362f_759a_4a7d_ba27_c421b5de97b4(args: MultiTransFormationArgs) {
    return widget_statistics19a4362f_759a_4a7d_ba27_c421b5de97b4(args, this.context);
  }

  async widget_statistics766bfbac_d2e1_4544_b72f_939ccaa9edf3(args: MultiTransFormationArgs) {
    return widget_statistics766bfbac_d2e1_4544_b72f_939ccaa9edf3(args, this.context);
  }

  async widget_statisticsa8343ab6_da03_4bb2_be6e_27fea7c48f5a(args: MultiTransFormationArgs) {
    return widget_statisticsa8343ab6_da03_4bb2_be6e_27fea7c48f5a(args, this.context);
  }

  async workflow_filters_2f623334_42ad_4472_b4e5_ff46154020b6(args: never) {
    return workflow_filters_2f623334_42ad_4472_b4e5_ff46154020b6(args, this.context);
  }
}
