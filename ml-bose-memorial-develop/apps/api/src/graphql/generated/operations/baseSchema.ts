import { gql } from 'apollo-server-express';

export const baseSchema = gql`
  type GenericEntity {
    data: JSON
  }

  type CustomActionResults {
    data: JSON
  }

  type OnboardingPreferences {
    config: JSON
    showOnBoarding: Boolean
    success: Boolean
  }

  input PreferencesInput {
    params: JSON
  }

  input DataAggregationArgsDataPoint {
    bucket: JSON
    name: String!
    transformation: String!
  }

  input DataAggregationArgs {
    value: DataAggregationArgsDataPoint!
    groupBy: DataAggregationArgsDataPoint
    cardinality: Cardinality!
    filters: JSON
  }

  enum Cardinality {
    MULTI
    SINGLE
  }
`;
