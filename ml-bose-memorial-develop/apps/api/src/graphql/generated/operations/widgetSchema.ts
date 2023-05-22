/* eslint-disable max-lines */
import { gql } from 'apollo-server-express';

export const widgetSchema = gql`
  type GraphResult {
    crossLinking: JSON
    format: JSON
    results: JSON
    series: JSON
  }

  type MultiTransFormationResults {
    crossLinking: JSON
    format: JSON
    results: JSON
    transformation: String!
  }

  type ListingResult {
    data: JSON
    format: JSON
    latestRequestTimestamp: Float
    pagination: JSON
    strategy: String
  }

  input DataListingArgs {
    attributes: JSON!
    entity: String!
    filters: JSON
    latestRequestTimestamp: Float
    pagination: JSON
    sorting: [JSON!]
  }

  input MultiTransFormationArgs {
    attributes: [String]
    entity: String!
    filters: JSON
    transformations: [String!]!
  }

  input CustomActionArgs {
    entity: String!
    functionName: String!
    filters: JSON
  }

  type Filters {
    accessLevel: AccessLevel!
    name: String!
    statisticalType: String!
  }

  type WorkflowFiltersResult {
    filters: [Filters!]!
  }

  extend type Query {
    # Widget Summary
    # Widget: Send Invoice Copy
    # Thing: memberName
    custom_action_8c2f4a58_4c24_4144_bf2b_36a3f21546f8(input: CustomActionArgs): CustomActionResults

    # Widget Summary
    # Widget: Call Member
    # Thing: memberName
    custom_action_99709b90_9301_4b69_a48e_85d585c6b087(input: CustomActionArgs): CustomActionResults

    # Widget Summary
    # View: doctorDetails
    # Widget: Doctor Summary
    # Widget type: behavior
    entity_detail_10ab0e2e_86cc_4194_836f_b7c8afc7d246(input: DataListingArgs): ListingResult

    # Widget Summary
    # View: memberDetails
    # Widget: Member Summary
    # Widget type: behavior
    entity_detail_c8f8ce4c_4dd8_467e_bdfd_f9cc95e9fa16(input: DataListingArgs): ListingResult

    # Widget Summary
    # View: Member Details
    # Widget: Transactions
    # Thing: MembersTransactions
    # Attributes: invoiceNumber, transactionDate, transactionPcp, transactionAmount, memberAmountPaid, totalDonorPayments
    # Widget type: goal
    object_listing_3c304aaf_0d6a_463b_96ad_b710f8d7e667(input: DataListingArgs): ListingResult

    # Widget Summary
    # View: Find A Doctor
    # Widget: Eligible PCP List
    # Thing: EligiblePcp
    # Attributes: title, primaryCareName, primaryCareLastName, telephone
    # Widget type: goal
    object_listing_7ff9861e_5fd0_46ba_80ca_6e0fdd9b8c22(input: DataListingArgs): ListingResult

    # Widget Summary
    # Widget: Balance Trend
    # Value: balanceDue - Sum
    # Group by: timestamp - No Aggregation
    widget_2e0f566d_8cbc_4d18_b8af_45751bd1a1e2(input: DataAggregationArgs): GraphResult

    # Widget Summary
    # Widget: Types of Eligible PCPs
    # Value: eligiblePcp - Total Count
    # Group by: title - No Aggregation
    widget_d69d1193_a237_43a8_92c1_9dc2d7d919c4(input: DataAggregationArgs): GraphResult

    # Widget Summary
    # Widget: Specialist Fee
    # Value: specialistFee
    widget_statistics15778bdf_5ed3_49b8_b1c2_7b79a99fa00c(
      input: MultiTransFormationArgs
    ): [MultiTransFormationResults]

    # Widget Summary
    # Widget: Number of PCPs
    # Value: eligiblePcp
    widget_statistics19a4362f_759a_4a7d_ba27_c421b5de97b4(
      input: MultiTransFormationArgs
    ): [MultiTransFormationResults]

    # Widget Summary
    # Widget: Doctor Summary
    # Value: primaryCareName
    widget_statistics766bfbac_d2e1_4544_b72f_939ccaa9edf3(
      input: MultiTransFormationArgs
    ): [MultiTransFormationResults]

    # Widget Summary
    # Widget: Basic Fee
    # Value: basicFee
    widget_statisticsa8343ab6_da03_4bb2_be6e_27fea7c48f5a(
      input: MultiTransFormationArgs
    ): [MultiTransFormationResults]

    # Filter Bar
    # View: findADoctor
    # Widget: Filter 1
    # Widget type: behavior
    workflow_filters_2f623334_42ad_4472_b4e5_ff46154020b6: WorkflowFiltersResult
  }
`;
