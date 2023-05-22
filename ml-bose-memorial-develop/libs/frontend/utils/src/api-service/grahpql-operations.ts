export const getFilterQuery = (operationName: string): string => `
  query getFilters($input: GetFilterArgs) {
    ${operationName}(input: $input) {
      results
    }
  }
`;

export const getChartDataQuery = (operationName: string): string => `
  query getWidget($input: DataAggregationArgs) {
    ${operationName}(input: $input) {
      crossLinking
      format
      results
      series
    }
  }
`;

export const getMultiAggWidgetQuery = (operationName: string): string => `
  query getMultiAggWidget($input: MultiTransFormationArgs){
    ${operationName}(input: $input) {
      crossLinking
      format
      results
      transformation
    }
  }
`;

export const dispatchCustomActionQuery = (operationName: string): string => `
  query dispatchCustomAction($input: CustomActionArgs) {
    ${operationName}(input: $input) {
      data
    }
  }
`;

export const getListingDataQuery = (operationName: string): string => `
  query getListing($input: DataListingArgs) {
    ${operationName}(input: $input) {
      data
      format
      latestRequestTimestamp
      pagination
      strategy
    }
  }
`;

export const getEntityQuery = (entity: string): string => `
  query getEntity($input: String) {
    get${entity}(id: $input) {
      data
    }
  }
`;

export const deleteEntityQuery = (entity: string): string => `
  query deleteEntity($input: String) {
    delete${entity}(id: $input) {
      data
    }
  }
`;

export const updateEntityQuery = (entity: string): string => `
  query updateEntity($input: JSON) {
    update${entity}(entity: $input) {
      data
    }
  }
`;

export const createEntityQuery = (entity: string): string => `
  query createEntity($input: AddEntityInput) {
    add${entity}(input: $input) {
      data
    }
  }
`;

export const listEntityQuery = (entity: string): string => `
  query listEntity ($input: ListEntityInput) {
    list${entity}(input: $input) {
      data
    }
  }
`;

export const autoCompleteQuery = (entity: string): string => `
query autoComplete($input: AutoCompleteByEntityInput) {
  autoComplete${entity}(input: $input) {
    data {
      displayValue
      id
      value
    }
    errorMessage
  }
}`;

export const formatCheckQuery = (): string => `
  query formatCheck ($input: FormatCheckArgs) {
    formatCheck(input: $input) {
      errors {
        message
      }
      isValid
    }
  }
`;

export const getWorkflowFiltersQuery = (operationName: string): string => `
  query getWorkflowFilters {
    ${operationName} {
      filters {
        accessLevel
        name
        statisticalType
      }
    }
  }
`;

export const getOnboardingPreferencesQuery = `
  query getOnboardingPreferences {
    getOnboardingPreferences {
      config
      showOnBoarding
    }
  }
`;

export const setOnboardingPreferencesQuery = `
  query setOnboardingPreferences($input: PreferencesInput) {
    setOnboardingPreferences(input: $input) {
      success
    }
  }
`;
