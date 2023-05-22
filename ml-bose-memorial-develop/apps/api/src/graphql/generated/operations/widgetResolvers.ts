/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0, max-lines: 0 */
import {
  CustomActionArgs,
  DataListingArgs,
  DataAggregationArgs,
  MultiTransFormationArgs,
} from '../../../types';
import { IResolvers } from 'apollo-server-express';

export const widgetResolvers: IResolvers = {
  Query: {
    custom_action_8c2f4a58_4c24_4144_bf2b_36a3f21546f8: async (
      _parent: any,
      args: { input: CustomActionArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.custom_action_8c2f4a58_4c24_4144_bf2b_36a3f21546f8(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.custom_action_8c2f4a58_4c24_4144_bf2b_36a3f21546f8(args.input, {
            ...rest,
          })
        : result;
    },

    custom_action_99709b90_9301_4b69_a48e_85d585c6b087: async (
      _parent: any,
      args: { input: CustomActionArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.custom_action_99709b90_9301_4b69_a48e_85d585c6b087(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.custom_action_99709b90_9301_4b69_a48e_85d585c6b087(args.input, {
            ...rest,
          })
        : result;
    },

    entity_detail_10ab0e2e_86cc_4194_836f_b7c8afc7d246: async (
      _parent: any,
      args: { input: DataListingArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.entity_detail_10ab0e2e_86cc_4194_836f_b7c8afc7d246(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.entity_detail_10ab0e2e_86cc_4194_836f_b7c8afc7d246(args.input, {
            ...rest,
          })
        : result;
    },

    entity_detail_c8f8ce4c_4dd8_467e_bdfd_f9cc95e9fa16: async (
      _parent: any,
      args: { input: DataListingArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.entity_detail_c8f8ce4c_4dd8_467e_bdfd_f9cc95e9fa16(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.entity_detail_c8f8ce4c_4dd8_467e_bdfd_f9cc95e9fa16(args.input, {
            ...rest,
          })
        : result;
    },

    object_listing_3c304aaf_0d6a_463b_96ad_b710f8d7e667: async (
      _parent: any,
      args: { input: DataListingArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.object_listing_3c304aaf_0d6a_463b_96ad_b710f8d7e667(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.object_listing_3c304aaf_0d6a_463b_96ad_b710f8d7e667(args.input, {
            ...rest,
          })
        : result;
    },

    object_listing_7ff9861e_5fd0_46ba_80ca_6e0fdd9b8c22: async (
      _parent: any,
      args: { input: DataListingArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.object_listing_7ff9861e_5fd0_46ba_80ca_6e0fdd9b8c22(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.object_listing_7ff9861e_5fd0_46ba_80ca_6e0fdd9b8c22(args.input, {
            ...rest,
          })
        : result;
    },

    widget_2e0f566d_8cbc_4d18_b8af_45751bd1a1e2: async (
      _parent: any,
      args: { input: DataAggregationArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.widget_2e0f566d_8cbc_4d18_b8af_45751bd1a1e2(args.input);

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.widget_2e0f566d_8cbc_4d18_b8af_45751bd1a1e2(args.input, { ...rest })
        : result;
    },

    widget_d69d1193_a237_43a8_92c1_9dc2d7d919c4: async (
      _parent: any,
      args: { input: DataAggregationArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.widget_d69d1193_a237_43a8_92c1_9dc2d7d919c4(args.input);

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.widget_d69d1193_a237_43a8_92c1_9dc2d7d919c4(args.input, { ...rest })
        : result;
    },

    widget_statistics15778bdf_5ed3_49b8_b1c2_7b79a99fa00c: async (
      _parent: any,
      args: { input: MultiTransFormationArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.widget_statistics15778bdf_5ed3_49b8_b1c2_7b79a99fa00c(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.widget_statistics15778bdf_5ed3_49b8_b1c2_7b79a99fa00c(args.input, {
            ...rest,
          })
        : result;
    },

    widget_statistics19a4362f_759a_4a7d_ba27_c421b5de97b4: async (
      _parent: any,
      args: { input: MultiTransFormationArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.widget_statistics19a4362f_759a_4a7d_ba27_c421b5de97b4(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.widget_statistics19a4362f_759a_4a7d_ba27_c421b5de97b4(args.input, {
            ...rest,
          })
        : result;
    },

    widget_statistics766bfbac_d2e1_4544_b72f_939ccaa9edf3: async (
      _parent: any,
      args: { input: MultiTransFormationArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.widget_statistics766bfbac_d2e1_4544_b72f_939ccaa9edf3(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.widget_statistics766bfbac_d2e1_4544_b72f_939ccaa9edf3(args.input, {
            ...rest,
          })
        : result;
    },

    widget_statisticsa8343ab6_da03_4bb2_be6e_27fea7c48f5a: async (
      _parent: any,
      args: { input: MultiTransFormationArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.widget_statisticsa8343ab6_da03_4bb2_be6e_27fea7c48f5a(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.widget_statisticsa8343ab6_da03_4bb2_be6e_27fea7c48f5a(args.input, {
            ...rest,
          })
        : result;
    },

    workflow_filters_2f623334_42ad_4472_b4e5_ff46154020b6: async (
      _parent: any,
      args: { input: never },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.workflow_filters_2f623334_42ad_4472_b4e5_ff46154020b6();

      return result;
    },
  },
};
