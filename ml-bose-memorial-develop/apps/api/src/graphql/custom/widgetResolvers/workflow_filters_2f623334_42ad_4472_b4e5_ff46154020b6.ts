import { WorkflowFiltersResults, AuthContext } from '../../../types';
import { filterSectionFilters } from '../../../assets/filters/workflow_filters_2f623334_42ad_4472_b4e5_ff46154020b6';

//Find A Doctor filters
export const workflow_filters_2f623334_42ad_4472_b4e5_ff46154020b6 = async (
  input: never,
  context: AuthContext,
): Promise<WorkflowFiltersResults> => {
  const filters: any = filterSectionFilters.map(async (filter) => {
    // KAPI - Integration

    // In order for you to connect your backend, you have to use the dataSource 'formatCheckApi' instead of 'formatCheckFakeApi'

    const accessResponse = await context.dataSources.formatCheckFakeApi.accessControlCheck({
      widgetId: workflow_filters_2f623334_42ad_4472_b4e5_ff46154020b6,
      section: filter.name,
    });

    return { ...filter, ...accessResponse };
  });

  return { filters };
};
